import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useEffect } from "react"
import { useRouter } from "next/router"

const DashBoard = () => {

    const { isAuthenticated } = useContext(UserContext)
    const router = useRouter()

    // useEffect(() => {
    //     if (isAuthenticated) router.push("/")
    // }, [isAuthenticated])

    return (
        <h1>Welcome to the dashboard!</h1>
    )
}

export default DashBoard