import { createContext } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { setCookie, parseCookies } from "nookies"
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
    signIn: (data: SignInData) => Promise<void | string>
    logOut: () => void
}

type UserProviderData = {
    children: any
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children } : UserProviderData) {
    const [user, setUser] = useState<UserData | false>(false)
    const router = useRouter()
    

    let isAuthenticated = !!user

    useEffect(() => {
        console.log("Vou renderizar context")
        async function getVoterByTokenAndUpdateStatus() {
            const { 'exertit.token' : token } = parseCookies()

            if (token) {
                const res = await api.get(`voter/${token}/`).then(response => response.data)
                setUser(res)
            } else {
                setUser(false)
            }
        }

        getVoterByTokenAndUpdateStatus()
        
    }, [])

    async function signIn({ cpf, password } : SignInData) {
        const response = await api.post("signIn/", {
            cpf, 
            password
        })
            .then(response => response)
            .catch(error => error.response)
        
        if (response.status === 200) {
            setCookie(undefined, 'exertit.token', response.data.token, {
                maxAge: 60 * 60 * 1 // 1 hour
            })
            setUser({ cpf: cpf })
            router.push("/dashboard")

        } else if(response.status === 404) {
            console.log("Entrei aqui no errado")
            return "Essa conta não existe!"
        }
    }
    
    function logOut() {
        setUser(false)
        // authCookie.remove("exertit.cookie")
        router.push("/")
    }

    return <UserContext.Provider value={{user, isAuthenticated, signIn, logOut}}>
            { children }
        </UserContext.Provider>
}