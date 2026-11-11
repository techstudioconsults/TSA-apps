/**
 * One Meta "Lead" per real form submission.
 *
 * The old success page fired Lead on every load, so refreshes, the back
 * button, failed submissions (the form redirects to the success page even when
 * the API errors) and direct visits were all counted as syllabus downloads.
 *
 * Flow:
 *   1. lead-form.tsx calls queuePendingLead(slug) only when the API accepted the lead.
 *   2. The success page calls firePendingLead(), which sends Lead once and
 *      deletes the token, so a refresh or revisit sends nothing.
 * The eventID lets a future Conversions API event deduplicate against this one.
 */

declare global {
  interface Window {
    fbq?: (...arguments_: unknown[]) => void;
  }
}

const PENDING_LEAD_KEY = "tsa_pending_meta_lead";
const MAX_TOKEN_AGE_MS = 10 * 60 * 1000;

type PendingLead = { eventId: string; course: string; createdAt: number };

const newEventId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function queuePendingLead(course: string) {
  try {
    const pending: PendingLead = {
      eventId: newEventId(),
      course,
      createdAt: Date.now(),
    };
    sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(pending));
  } catch {
    // Storage unavailable (private mode etc.): skip tracking, never block the user.
  }
}

export function firePendingLead() {
  let pending: PendingLead | undefined;
  try {
    const raw = sessionStorage.getItem(PENDING_LEAD_KEY);
    if (!raw) return;
    sessionStorage.removeItem(PENDING_LEAD_KEY);
    pending = JSON.parse(raw) as PendingLead;
  } catch {
    return;
  }
  if (!pending || Date.now() - pending.createdAt > MAX_TOKEN_AGE_MS) return;

  const lead = pending;
  const send = () =>
    window.fbq?.(
      "track",
      "Lead",
      { content_name: lead.course, content_category: "course_lead_form" },
      { eventID: lead.eventId },
    );

  if (window.fbq) {
    send();
    return;
  }
  // On a hard load the base pixel may not have run yet: wait up to 5 seconds.
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    if (window.fbq) {
      window.clearInterval(timer);
      send();
    } else if (tries >= 25) {
      window.clearInterval(timer);
    }
  }, 200);
}
