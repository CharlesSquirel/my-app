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
  },
  {
    value: 'valve',
    label: 'valve',
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
      <DataTableColumnHeader column={column} title="Autor" />
    ),
  },
  {
    accessorKey: 'firma',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Obiekt" />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rodzaj" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.type);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: () => {
      return <TableRowActions />;
    },
  },
];
