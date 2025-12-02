declare global {
  /** Generic data item type for flexible object structures */
  type DataItem = Record<string, unknown>;

  /** Dashboard table column definition */
  interface TableColumnDefinition<T extends DataItem> {
    header: string;
    accessorKey: keyof T;
    render?: (value: T[keyof T], row: T) => import("react").ReactNode;
  }

  /** Dashboard table row action */
  interface TableRowAction<T> {
    label: string;
    icon?: import("react").ReactNode;
    onClick: (row: T) => void;
  }

  /** Dashboard table properties */
  interface DashboardTableProperties<T extends DataItem> {
    data: T[];
    columns: TableColumnDefinition<T>[];
    totalPages?: number;
    itemsPerPage?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    rowActions?: (row: T) => TableRowAction<T>[];
    onRowClick?: (row: T) => void;
    showPagination?: boolean;
  }
}

export {};
