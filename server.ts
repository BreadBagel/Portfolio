import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);
const dataPath = path.resolve('src/data/portfolioData.json');
const distPath = path.resolve('dist');
const tokenLifetimeSeconds = 60 * 60 * 8;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

app.use(express.json({ limit: '1mb' }));

function constantTimeMatch(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function createToken(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured.');
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ sub: 'portfolio-admin', exp: Math.floor(Date.now() / 1000) + tokenLifetimeSeconds })).toString('base64url');
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${createHmac('sha256', secret).update(unsigned).digest('base64url')}`;
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET;
  const authorization = req.header('authorization');
  const match = authorization?.match(/^Bearer ([^.]+\.[^.]+\.[^.]+)$/);
  if (!secret || !match) {
    res.status(401).json({ error: 'Admin authentication required.' });
    return;
  }
  const token = match[1];
  const [header, payload, signature] = token.split('.');
  const expectedSignature = createHmac('sha256', secret).update(`${header}.${payload}`).digest();
  let actualSignature: Buffer;
  try {
    actualSignature = Buffer.from(signature, 'base64url');
  } catch {
    res.status(401).json({ error: 'Invalid admin token.' });
    return;
  }
  if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature)) {
    res.status(401).json({ error: 'Invalid admin token.' });
    return;
  }
  let claims: { sub?: string; exp?: number };
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { sub?: string; exp?: number };
  } catch {
    res.status(401).json({ error: 'Invalid admin token.' });
    return;
  }
  if (claims.sub !== 'portfolio-admin' || typeof claims.exp !== 'number' || claims.exp <= Date.now() / 1000) {
    res.status(401).json({ error: 'Admin token expired or invalid.' });
    return;
  }
  next();
}

app.get('/api/portfolio', async (_req, res, next) => {
  try {
    res.json(JSON.parse(await readFile(dataPath, 'utf8')));
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    res.status(503).json({ error: 'Admin authentication is not configured on this server.' });
    return;
  }
  const address = req.ip ?? 'unknown';
  const attempt = loginAttempts.get(address);
  if (attempt && attempt.resetAt > Date.now() && attempt.count >= 8) {
    res.status(429).json({ error: 'Too many sign-in attempts. Try again in 15 minutes.' });
    return;
  }
  if (typeof req.body?.password !== 'string' || !constantTimeMatch(req.body.password, adminPassword)) {
    const current = attempt && attempt.resetAt > Date.now() ? attempt : { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
    current.count += 1;
    loginAttempts.set(address, current);
    res.status(401).json({ error: 'Incorrect password.' });
    return;
  }
  loginAttempts.delete(address);
  res.json({ token: createToken() });
});

app.put('/api/portfolio/update', requireAdmin, async (req, res, next) => {
  const data = req.body as Record<string, unknown>;
  if (
    !data || typeof data !== 'object' || typeof data.name !== 'string' ||
    !data.contact || typeof data.contact !== 'object' ||
    typeof (data.contact as Record<string, unknown>).email !== 'string' ||
    !Array.isArray(data.projects) || !Array.isArray(data.skills) || !Array.isArray(data.experience)
  ) {
    res.status(400).json({ error: 'Portfolio data must include a name, contact object, projects, skills, and experience.' });
    return;
  }
  const temporaryPath = `${dataPath}.tmp`;
  try {
    await writeFile(temporaryPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, dataPath);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.use(express.static(distPath));
app.get('*', (_req, res, next) => {
  res.sendFile(path.join(distPath, 'index.html'), (error) => { if (error) next(error); });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Portfolio server error:', error);
  if (!res.headersSent) res.status(500).json({ error: 'The portfolio server could not complete the request.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});
