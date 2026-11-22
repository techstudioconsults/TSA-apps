/**
 * Decides when to send watch progress to the API. Pure, so it can be tested
 * without a player: the API credits at most (elapsed × 2 + 5) seconds per
 * report, so sending every ~15s keeps every second of real watching counted.
 */
export const HEARTBEAT_MS = 15_000;

export class ProgressReporter {
  private position = 0;
  private lastSentPosition = -1;
  private lastSentAt: number | null = null;

  constructor(
    startPosition = 0,
    private readonly interval = HEARTBEAT_MS,
  ) {
    this.position = startPosition;
    this.lastSentPosition = startPosition;
  }

  /**
   * Records the player's position; returns true when a heartbeat is due.
   * The first update of a session is always due: the API credits watch time
   * against the gap since the previous report, so an early "opening" report
   * starts that clock (without it the first ~15s of viewing earn only ~5s).
   */
  update(seconds: number, now: number): boolean {
    if (!Number.isFinite(seconds) || seconds < 0) return false;
    this.position = seconds;
    if (this.lastSentAt === null) return true;
    return now - this.lastSentAt >= this.interval && this.hasUnsent();
  }

  hasUnsent(): boolean {
    return Math.abs(this.position - this.lastSentPosition) >= 1;
  }

  markSent(now: number): number {
    this.lastSentAt = now;
    this.lastSentPosition = this.position;
    return this.position;
  }

  get current(): number {
    return this.position;
  }
}

/** Resume point: skip tiny offsets and don't drop people into the last few seconds. */
export function resumePosition(lastPosition: number, duration: number): number {
  if (!lastPosition || lastPosition < 5) return 0;
  if (duration > 0 && lastPosition > duration - 10) return 0;
  return Math.floor(lastPosition);
}
