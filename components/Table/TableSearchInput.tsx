import { Input } from '@/components/ui/input';
import { ChangeEventHandler } from 'react';

interface TableSearchInputProps {
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TableSearchInput({
  value,
  onChange,
}: TableSearchInputProps) {
  return (
    <Input
      placeholder="Wyszukaj..."
      value={value ?? ''}
      onChange={onChange}
      className="max-w-sm"
    />
  );
}
