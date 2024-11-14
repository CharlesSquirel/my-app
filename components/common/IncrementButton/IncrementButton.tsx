import { PlusCircleIcon } from 'lucide-react';

interface IncrementButtonProps {
  onIncrement: () => void;
}

export default function IncrementButton({ onIncrement }: IncrementButtonProps) {
  return (
    <button
      type="button"
      className="mb-4 flex cursor-pointer justify-center hover:opacity-70"
    >
      <PlusCircleIcon onClick={onIncrement} size={26} />
    </button>
  );
}
