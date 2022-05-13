import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from '../contexts/UserContext'
import theme from "../styles/themes"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  ) 
  
}

export default MyApp
