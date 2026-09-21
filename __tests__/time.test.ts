import { describe, it, expect } from 'vitest';
import { isOpen } from '../src/lib/time';

const mockSchedule = {
  0: { open: "18:00", close: "23:00" }, // Sun
  1: { closedAllDay: true }, // Mon
  2: { open: "18:00", close: "01:00" }, // Tue
  3: { open: "18:00", close: "01:00" }, // Wed
  4: { open: "18:00", close: "01:00" }, // Thu
  5: { open: "18:00", close: "02:00" }, // Fri
  6: { open: "18:00", close: "02:00" }, // Sat
};

describe('Time calculation - isOpen', () => {
  it('should be closed on Monday 20h (Monday is closedAllDay)', () => {
    // 2026-09-21 is a Monday
    const date = new Date('2026-09-21T20:00:00-03:00');
    expect(isOpen(date, mockSchedule)).toBe(false);
  });

  it('should be open at exactly 18:00 (Start of shift)', () => {
    // 2026-09-22 is a Tuesday
    const date = new Date('2026-09-22T18:00:00-03:00');
    expect(isOpen(date, mockSchedule)).toBe(true);
  });

  it('should be closed at exactly 01:00 (End of shift)', () => {
    // 2026-09-23 is a Wednesday, Shift ends at 01:00
    const date = new Date('2026-09-23T01:00:00-03:00');
    expect(isOpen(date, mockSchedule)).toBe(false);
  });

  it('should be open on Sunday at 01:00 (Saturday shift ends at 02:00)', () => {
    // 2026-09-27 is a Sunday, Saturday shift closes at 02:00
    const date = new Date('2026-09-27T01:00:00-03:00');
    expect(isOpen(date, mockSchedule)).toBe(true);
  });
});
