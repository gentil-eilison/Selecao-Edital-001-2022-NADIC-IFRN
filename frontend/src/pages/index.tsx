import { Heading } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { FormControl, FormLabel, Input, Button, ButtonGroup } from "@chakra-ui/react"
// import { Img } from "@chakra-ui/react"
import Image  from "next/image"
import Link from "next/link"
import { GetServerSideProps } from "next"

import api from "../services/api"
import Cookie from "universal-cookie"
import { UserContext } from "../contexts/UserContext"

import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { useEffect } from "react"
import { useRouter } from "next/router"

import styles from "../styles/Home.module.css"
import award from "../assets/icons/award.svg"
import login from "../assets/icons/login.svg"
import voteVector from "../assets/images/vote_lp.jpg"

export default function Home() {
  const [cpf, setCpf] = useState<string | false>(false)
  const [password, setPassword] = useState<string | false>(false)

  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { signIn, isAuthenticated } = useContext(UserContext)
  const toast = useToast()
  const router = useRouter()

  async function handleLoginFormSubmit(event) {
    event.preventDefault()
    if (cpf && password) {
      const res = await signIn({ cpf, password })
      if (res) {
        setError(true)
      } else {
        setSuccess(true)
      }
    }
  }

  useEffect(() => {
    setError(false)
    setSuccess(false)
  })

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" height="100vh">
      { error && toast({title: 'Não encontramos essa conta no sistema', status: 'error'}) }
      { success && toast({title: 'Usuário logado com sucesso!', status: 'success'}) }
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <Heading fontSize={60} as='h1' color="#75D685">
            EXERT IT!
            <Image  src={award} width={62} height={62} color="#75D685"/>
        </Heading>

        <Heading as='h2'>Um sistema eleitoral gratuito</Heading>
      </Flex>

      <Flex alignItems="center" gap={25} justifyContent="center">
          <Image src={voteVector} width={600} height={400}/>

          <form onSubmit={handleLoginFormSubmit} method="post" className={styles.loginForm}>
              <FormControl>
                <FormLabel htmlFor="cpf">CPF:</FormLabel>
                <Input 
                  onChange={(event) => setCpf(event.target.value)} 
                  isRequired 
                  shadow={"#75D685"} 
                  id="cpf" name="cpf" type="text"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Senha:</FormLabel>
                <Input onChange={(event) => setPassword(event.target.value)} 
                isRequired 
                id="password" name="password" type="password"/>
              </FormControl>

              <ButtonGroup mt={15}>
                <Button 
                  type="submit" 
                  _hover={{ bg: "#53c065" }}>
                    <Image src={login} alt="Door opening"/> Login
                </Button>
                
                <Link href="/signUp"><Button _hover={{ bg: "#53c065" }}>Criar conta</Button></Link>
              </ButtonGroup>
          </form>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = new Cookie()
  const authCookie = cookie.get("exertit.cookie")

  console.log("teste: " + authCookie)

  if (authCookie) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
