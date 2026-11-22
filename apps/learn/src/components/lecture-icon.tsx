import { CheckCircle2, FileText, Lock, PlayCircle } from "lucide-react";

export function LectureIcon({
  type,
  completed,
  locked,
}: {
  type: "video" | "text";
  completed: boolean;
  locked: boolean;
}) {
  if (locked)
    return (
      <Lock
        className="text-ink-muted size-5 shrink-0"
        strokeWidth={1.5}
        aria-label="Locked"
      />
    );
  if (completed)
    return (
      <CheckCircle2
        className="text-ok size-5 shrink-0"
        strokeWidth={1.5}
        aria-label="Done"
      />
    );
  return type === "video" ? (
    <PlayCircle
      className="text-action size-5 shrink-0"
      strokeWidth={1.5}
      aria-label="Video"
    />
  ) : (
    <FileText
      className="text-action size-5 shrink-0"
      strokeWidth={1.5}
      aria-label="Reading"
    />
  );
}
