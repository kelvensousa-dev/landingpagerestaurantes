import { BusinessHours } from "../config/restaurante";

export function getSaoPauloParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";
  
  // To get the actual day of week (0 = Sunday) accurately in the timezone,
  // we can reconstruct a Date object from the SP year, month, day in UTC, and then call getUTCDay()
  const year = parseInt(getPart("year"), 10);
  const month = parseInt(getPart("month"), 10) - 1; // 0-indexed
  const day = parseInt(getPart("day"), 10);
  
  const hour = parseInt(getPart("hour"), 10);
  const minute = parseInt(getPart("minute"), 10);

  const spDateUTC = new Date(Date.UTC(year, month, day));
  const dayOfWeek = spDateUTC.getUTCDay(); // 0 = Sunday
  
  return { dayOfWeek, hour, minute };
}

export function isOpen(date: Date, schedule: Record<number, BusinessHours>): boolean {
  const { dayOfWeek, hour, minute } = getSaoPauloParts(date);
  const currentMinutes = hour * 60 + minute;
  
  const todaySchedule = schedule[dayOfWeek];
  
  const prevDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const prevSchedule = schedule[prevDayOfWeek];

  // Check if still open from previous day's shift
  if (prevSchedule && !prevSchedule.closedAllDay && prevSchedule.open && prevSchedule.close) {
    const [prevOpenH, prevOpenM] = prevSchedule.open.split(":").map(Number);
    const [prevCloseH, prevCloseM] = prevSchedule.close.split(":").map(Number);
    const prevCloseMinutes = prevCloseH * 60 + prevCloseM;
    const prevOpenMinutes = prevOpenH * 60 + prevOpenM;

    // Shift crosses midnight
    if (prevCloseMinutes < prevOpenMinutes) {
      if (currentMinutes < prevCloseMinutes) {
        return true;
      }
    }
  }

  if (!todaySchedule || todaySchedule.closedAllDay || !todaySchedule.open || !todaySchedule.close) {
    return false;
  }

  const [openH, openM] = todaySchedule.open.split(":").map(Number);
  const [closeH, closeM] = todaySchedule.close.split(":").map(Number);
  
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (closeMinutes < openMinutes) {
    // Shift crosses midnight
    if (currentMinutes >= openMinutes) {
      return true;
    }
  } else {
    // Normal shift
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return true;
    }
  }

  return false;
}
