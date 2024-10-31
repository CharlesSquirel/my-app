import { Button } from '@/components/ui/button';
import { MouseEventHandler } from 'react';

interface TablePaginationProps {
  onNextClick: MouseEventHandler<HTMLButtonElement>;
  onPreviousClick: MouseEventHandler<HTMLButtonElement>;
  nextDisabled: boolean;
  previousDisabled: boolean;
}

export default function TablePagination({
  onNextClick,
  onPreviousClick,
  nextDisabled,
  previousDisabled,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousClick}
        disabled={previousDisabled}
      >
        Poprzednia
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextClick}
        disabled={nextDisabled}
      >
        Następna
      </Button>
    </div>
  );
}
