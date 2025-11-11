'use client'

import useMounted from "@/hooks/useMounted";
import s from "./styles.module.scss"

export default function Home() {

  const mounted = useMounted()
  

  

  if(!mounted) return null
  return (
    <div className={s.container}>
      <h1>
        Hello world
      </h1>
    </div>
  );
}
