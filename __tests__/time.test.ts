import { describe, it, expect } from 'vitest';
import { isOpen } from '../src/lib/time';

// Note: For testing we mock the restaurante config if needed, but since it's hardcoded for tests we can test it directly.
// schedule in restaurante:
// 0 (Sun): 18:00 - 23:00
// 1 (Mon): closed
// 2 (Tue): 18:00 - 01:00
// 3 (Wed): 18:00 - 01:00
// 4 (Thu): 18:00 - 01:00
// 5 (Fri): 18:00 - 02:00
// 6 (Sat): 18:00 - 02:00

describe('Time calculation - isOpen', () => {
  it('should be closed on Monday all day', () => {
    // 2026-09-21 is a Monday
    const date = new Date('2026-09-21T12:00:00-03:00');
    expect(isOpen(date)).toBe(false);
  });

  it('should be open on Tuesday evening', () => {
    // 2026-09-22 is a Tuesday
    const date = new Date('2026-09-22T20:00:00-03:00');
    expect(isOpen(date)).toBe(true);
  });

  it('should be open on Wednesday at 00:30 (crosses midnight from Tuesday)', () => {
    // 2026-09-23 is a Wednesday
    const date = new Date('2026-09-23T00:30:00-03:00');
    expect(isOpen(date)).toBe(true);
  });

  it('should be closed on Wednesday at 01:30 (Tuesday shift ended at 01:00)', () => {
    const date = new Date('2026-09-23T01:30:00-03:00');
    expect(isOpen(date)).toBe(false);
  });

  it('should be closed on Monday at 00:30 because Sunday closes at 23:00', () => {
    const date = new Date('2026-09-21T00:30:00-03:00');
    expect(isOpen(date)).toBe(false);
  });

  it('should be open on Saturday at 01:30 (Friday shift ends at 02:00)', () => {
    // 2026-09-26 is a Saturday
    const date = new Date('2026-09-26T01:30:00-03:00');
    expect(isOpen(date)).toBe(true);
  });

  it('should be open on Sunday at 22:59', () => {
    const date = new Date('2026-09-27T22:59:00-03:00');
    expect(isOpen(date)).toBe(true);
  });

  it('should be closed on Sunday at 23:01', () => {
    const date = new Date('2026-09-27T23:01:00-03:00');
    expect(isOpen(date)).toBe(false);
  });
});
