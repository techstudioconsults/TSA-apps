/**
 * Lecture notes are stored as plain text. Paragraphs are split on blank
 * lines and rendered as text (never as HTML), so pasted content can't inject
 * markup. Bare https:// links become clickable.
 */
const URL_PATTERN = /(https:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

function Linkified({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-action break-all underline"
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function LectureBody({ body }: { body: string }) {
  const paragraphs = body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="text-ink flex max-w-[68ch] flex-col gap-4 text-[17px] leading-[28px]">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="m-0 whitespace-pre-line">
          <Linkified text={paragraph} />
        </p>
      ))}
    </div>
  );
}
