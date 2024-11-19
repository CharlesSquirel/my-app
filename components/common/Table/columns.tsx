'use client';

import { Badge } from '@/components/ui/badge';
import { Protocol } from '@/lib/types/columnTypes';
import { ColumnDef } from '@tanstack/react-table';
import TableRowActions from './TableRowActions';
import { DataTableColumnHeader } from './data-table-column-header';

const labels = [
  {
    value: 'chiller',
    label: 'chiller',
    displayLabel: 'Protokół agregatu',
  },
  {
    value: 'valve',
    label: 'valve',
    displayLabel: 'Protokół zaworu',
  },
];

export const columns: ColumnDef<Protocol>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serwisant" />
    ),
  },
  {
    accessorKey: 'firma',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Firma" />
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Obiekt" />
    ),
  },
  {
    accessorKey: 'protocolType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rodzaj" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.protocolType,
      );

      return (
        <div className="flex space-x-2">
          {label && (
            <Badge
              variant={
                label.label === 'valve'
                  ? 'valve'
                  : label.label === 'chiller'
                    ? 'chiller'
                    : 'outline'
              }
            >
              {label.displayLabel}
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <TableRowActions protocol={row.original} />,
  },
];
