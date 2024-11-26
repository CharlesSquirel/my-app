'use client';

import { FormModeType } from '@/lib/types/common';
import { MinusCircleIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface DecrementButtonProps {
  onDecrement: () => void;
  mode: FormModeType;
  arrayName: string;
}

export default function DecrementButton({
  onDecrement,
  mode,
  arrayName,
}: DecrementButtonProps) {
  const { setValue, getValues } = useFormContext();
  const handleOnClick = () => {
    onDecrement();
    if (mode === 'edit') {
      const currentLocations = getValues(arrayName);
      setValue(arrayName, currentLocations.slice(0, -1));
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="absolute right-[25px] top-[23px] cursor-pointer hover:opacity-70"
      type="button"
    >
      <MinusCircleIcon stroke="#ef4444" size={26} />
    </button>
  );
}
