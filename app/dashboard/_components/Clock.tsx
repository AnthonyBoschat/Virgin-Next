import { useEffect, useState } from "react";
import s from "../styles.module.scss"

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  return (
    <div style={{ position: "absolute", top: "50%", left: "2rem", fontSize: "1rem", transform:"translateY(-50%)" }}>
      {formatted}
    </div>
  );
}
