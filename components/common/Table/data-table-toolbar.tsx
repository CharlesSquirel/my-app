'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './table-faceted-filter';

const types = [
  {
    value: 'valve',
    label: 'Valve',
    //   icon: QuestionMarkCircledIcon,
  },
  {
    value: 'chiller',
    label: 'Chiller',
    //   icon: CircleIcon,
  },
];

const firma = [
  {
    value: 'firma ABC',
    label: 'Firma ABC',
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Wyszukaj..."
          value={(table.getColumn('author')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('author')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('type') && (
          <div className="flex gap-2">
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title="Rodzaj"
              options={types}
            />
            <DataTableFacetedFilter
              column={table.getColumn('firma')}
              title="Obiekt"
              options={firma}
            />
          </div>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
