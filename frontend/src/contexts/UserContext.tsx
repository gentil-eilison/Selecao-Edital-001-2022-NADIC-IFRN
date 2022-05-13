import { createContext } from "react"
import { useState } from "react"
import { useRouter } from "next/router"

import Cookie from "universal-cookie"
import api from "../services/api"

type UserData = {
    cpf: string 
}

type SignInData = {
    cpf: string, 
    password: string
}

type UserContextData = {
    user: UserData | boolean,
    isAuthenticated: boolean,
    signIn: (data: SignInData) => Promise<void>
    logOut: () => void
}

type UserProviderData = {
    children: any
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children } : UserProviderData) {
    const [user, setUser] = useState<UserData | false>(false)
    const router = useRouter()

    const isAuthenticated = !!user
    const authCookie = new Cookie()

    async function signIn({ cpf, password } : SignInData) {
        const { token } = await api.post("signIn/", {
            cpf, 
            password
        })
            .then(response => response.data)
            .catch(error => console.log(error))
        
        console.log(token)
        
        authCookie.set("exertit.cookie", token, {
            maxAge: 60 * 60 * 1 // 1 hour
        })

        setUser({ cpf: cpf })

        router.push("/dashboard")
    }
    
    function logOut() {
        setUser(null)
        authCookie.remove("exertit.cookie")
        router.push("/")
    }

    return <UserContext.Provider value={{user, isAuthenticated, signIn, logOut}}>
            { children }
        </UserContext.Provider>
}