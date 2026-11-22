"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Vertical drag-to-reorder list. Works with mouse, touch and keyboard
 * (focus the handle, Space to lift, arrows to move, Space to drop).
 */
export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  disabled,
  className,
}: {
  items: T[];
  onReorder: (ids: string[]) => void;
  renderItem: (item: T, handle: ReactNode) => ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((item) => item.id === active.id);
    const to = items.findIndex((item) => item.id === over.id);
    if (from < 0 || to < 0) return;
    onReorder(arrayMove(items, from, to).map((item) => item.id));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
        disabled={disabled}
      >
        <ul className={className}>
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id} disabled={disabled}>
              {(handle) => renderItem(item, handle)}
            </SortableRow>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled?: boolean;
  children: (handle: ReactNode) => ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled,
  });
  const handle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
      className="text-muted-foreground hover:bg-muted flex size-9 shrink-0 cursor-grab items-center justify-center rounded-md active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
    >
      <GripVertical className="size-4" aria-hidden />
    </button>
  );
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "relative z-10 opacity-80 shadow-lg" : undefined}
    >
      {children(handle)}
    </li>
  );
}
