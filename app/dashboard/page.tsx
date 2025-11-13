"use client"

import { useSession, signOut } from "next-auth/react"
import s from "./styles.module.scss"
import Clock from "./_components/Clock"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if(!session) return null
  
  return (
    <div className={s.dashboard}>
      <header className={s.header}>
        <Clock />
        <div className={s.headerContent}>
          <h1>Dashboard</h1>
          <div className={s.userSection}>
            <span className={s.userEmail}>{session?.user?.email}</span>
            <button className={s.logoutBtn} onClick={() => signOut()}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.welcomeCard}>
          <h2>Bienvenue, {session?.user?.name || session?.user?.email?.split('@')[0]}</h2>
          <p>Dernière connexion: {new Date().toLocaleDateString('fr-FR')} à{" "}
            {new Date().toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </p>
        </div>

        <div className={s.statsGrid}>
          <div className={s.statCard}>
            <span className={s.statValue}>22</span>
            <span className={s.statLabel}>Projets actifs</span>
          </div>
          <div className={s.statCard}>
            <span className={s.statValue}>10</span>
            <span className={s.statLabel}>Tâches</span>
          </div>
          <div className={s.statCard}>
            <span className={s.statValue}>94</span>
            <span className={s.statLabel}>Messages</span>
          </div>
        </div>
      </main>
    </div>
  )
}