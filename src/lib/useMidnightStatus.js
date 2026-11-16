import { useEffect, useState } from "react";
import { site } from "@/data/siteConfig";

const nowPK = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));

export function getMidnightStatus(end = site.midnightEnd) {
  const now = nowPK();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const [endHour, endMinute] = end.split(":").map(Number);
  const endMinutes = endHour * 60 + endMinute;
  const startMinutes = site.midnightStart * 60;
  const live = minutes >= startMinutes || minutes < endMinutes;
  return { live, minutesToStart: live ? 0 : startMinutes - minutes };
}

export function formatRemaining(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours <= 0) return `${mins} min`;
  return `${hours}h ${String(mins).padStart(2, "0")}m`;
}

export function useMidnightStatus() {
  const [status, setStatus] = useState(() => getMidnightStatus());
  useEffect(() => {
    const timer = setInterval(() => setStatus(getMidnightStatus()), 20000);
    return () => clearInterval(timer);
  }, []);
  return status;
}