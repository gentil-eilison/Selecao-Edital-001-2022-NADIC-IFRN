import { extendTheme } from "@chakra-ui/react"
import { Button, Input } from "./components"

const theme = extendTheme({
    fonts: {
        heading: 'Ubuntu, sans-serif'
    },
    shadows: {
        outline: '#75D685'
    },
    components: {
        Button,
        Input,
    }
})

export default theme