'use client';

import { FormModeType } from '@/lib/types/common';
import { MinusCircleIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface DecrementButtonProps {
  onDecrement: () => void;
  count: number;
  mode: FormModeType;
}

export default function DecrementButton({
  onDecrement,
  count,
  mode,
}: DecrementButtonProps) {
  const { setValue, getValues } = useFormContext();
  const handleOnClick = () => {
    onDecrement();
    if (mode === 'edit') {
      const currentLocations = getValues('locations');
      setValue('locations', currentLocations.slice(0, -1));
      console.log(getValues('locations'));
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
