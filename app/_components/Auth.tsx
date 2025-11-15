"use client"

import { useState } from "react"
import s from "../styles.module.scss"
import withClass from "@/utils/class"
import AppLogin from "./Login"
import AppRegister from "./Register"
import useStorageState from "@/hooks/useStorageState"


// import dynamic from "next/dynamic"

// const AppLogin = dynamic(() => import('./Login'), {
//   ssr: false
// })

export default function AppAuth(){

    const [tab, setTab] = useState("login")

    const [emailLogin, setEmailLogin] = useStorageState("", "email")
    const [passwordLogin, setPasswordLogin] = useState("")
    
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [nameRegister, setNameRegister] = useState("")
    const [confirmationRegister, setConfirmationRegister] = useState("")


    return(
        <>
            <div className={s.header}>
                <button onClick={() => setTab("login")} className={withClass(tab === "login" && s.active)}>Connexion</button>
                <button onClick={() => setTab("register")} className={withClass(tab === "register" && s.active)}>Inscription</button>
            </div>

            {tab === "login" && (
                <AppLogin
                    email={emailLogin}
                    setEmail={setEmailLogin}
                    password={passwordLogin}
                    setPassword={setPasswordLogin}
                />
            )}

            {tab === "register" && (
                <AppRegister
                    name={nameRegister}
                    setName={setNameRegister}
                    email={emailRegister}
                    setEmail={setEmailRegister}
                    password={passwordRegister}
                    setPassword={setPasswordRegister}
                    confirmation={confirmationRegister}
                    setConfirmation={setConfirmationRegister}
                />
            )}
        </>
    )
}