import type { ChangeEvent } from 'react';

interface EditableFieldProps {
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export function EditableField({ value, editing, onChange, multiline = false }: EditableFieldProps) {
  if (!editing) return <>{value}</>;
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);
  return multiline
    ? <textarea className="inline-edit inline-edit-multiline" value={value} onChange={handleChange} rows={4} aria-label="Edit portfolio text" />
    : <input className="inline-edit" value={value} onChange={handleChange} aria-label="Edit portfolio text" />;
}
