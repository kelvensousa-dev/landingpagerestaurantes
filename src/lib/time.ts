import { restaurante } from "../config/restaurante";

export function getSaoPauloDate(date: Date): Date {
  const spTimeString = date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
  return new Date(spTimeString);
}

export function isOpen(date: Date): boolean {
  const spDate = getSaoPauloDate(date);
  
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  const dayOfWeek = spDate.getDay();
  const schedule = restaurante.schedule[dayOfWeek];
  
  // Previous day schedule to check for shifts crossing midnight
  const prevDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const prevSchedule = restaurante.schedule[prevDayOfWeek];

  const currentMinutes = spDate.getHours() * 60 + spDate.getMinutes();

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

  if (!schedule || schedule.closedAllDay || !schedule.open || !schedule.close) {
    return false;
  }

  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (closeMinutes < openMinutes) {
    // Shift crosses midnight, so if current time is after open time, it's open today
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
