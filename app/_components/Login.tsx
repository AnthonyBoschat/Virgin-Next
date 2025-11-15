"use client"

import { signIn } from "next-auth/react"
import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import s from "../styles.module.scss"

interface LoginProps{
    email:string,
    password:string,
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
}

export default function AppLogin(props:LoginProps) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      email: props.email,
      password: props.password,
      redirect:false
    }
    const result = await signIn("credentials", payload)
    
    if (result?.error) {
      toast.error("Impossible de vous connecter. Vérifiez vos identifiants et réessayez.")
    } else {
      router.push("/dashboard")
      toast.success("Connexion réussi")
    }
  }

  
  return (
    <form className={s.formAuth} onSubmit={handleSubmit}>
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
      <button type="submit">Se connecter</button>
    </form>
  )
}