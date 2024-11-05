import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  placeholder: string;
  name: string;
  type?: string;
  label: string;
}

export default function TextInput2({
  placeholder,
  name,
  type = 'text',
  label,
}: TextInputProps) {
  const { register } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        id={name}
        autoComplete="off"
      />
    </div>
  );
}
