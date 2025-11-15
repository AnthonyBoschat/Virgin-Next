"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react" // Ajout
import { api } from "@/lib/axios"
import { toast } from "react-toastify"
import s from "../styles.module.scss"

interface RegisterProps{
    name:string,
    setName: Dispatch<SetStateAction<string>>;
    email:string,
    setEmail: Dispatch<SetStateAction<string>>;
    password:string,
    setPassword: Dispatch<SetStateAction<string>>;
    confirmation:string,
    setConfirmation: Dispatch<SetStateAction<string>>;
}

export default function AppRegister(props: RegisterProps) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      name:props.name,
      email:props.email,
      password:props.password,
      confirmation:props.confirmation,
    }
    await api.post("/api/register", payload)
    
    const result = await signIn("credentials", {
      email:props.email,
      password:props.password,
      redirect: false
    })
    
    if (result?.ok) {
        toast.success("Inscription réussie")
        router.push("/dashboard")
    } 
  }

  return (
    <form className={s.formAuth} onSubmit={handleSubmit}>
      <input
        type="text"
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="email"
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <input
        type="password"
        value={props.confirmation}
        onChange={(e) => props.setConfirmation(e.target.value)}
        placeholder="Confirmation du mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  )
}