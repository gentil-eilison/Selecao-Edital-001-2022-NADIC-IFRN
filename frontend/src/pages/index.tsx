import { Heading } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { FormControl, FormLabel, Input, Button, ButtonGroup } from "@chakra-ui/react"
// import { Img } from "@chakra-ui/react"
import Image  from "next/image"
import Link from "next/link"

import api from "../services/api"
import { UserContext } from "../contexts/UserContext"

import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useContext } from "react"

import styles from "../styles/Home.module.css"
import award from "../assets/icons/award.svg"
import login from "../assets/icons/login.svg"
import voteVector from "../assets/images/vote_lp.jpg"

export default function Home() {
  const [cpf, setCpf] = useState<string | false>(false)
  const [password, setPassword] = useState<string | false>(false)

  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { signIn, user } = useContext(UserContext)
  console.log("Usuário do context " + user)
  const toast = useToast()

  async function handleLoginFormSubmit(event) {
    event.preventDefault()
    console.log(cpf)
    console.log(password)
    if (cpf && password) {
      await signIn({ cpf, password })
    }
  }

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" height="100vh">
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
                <Input onChange={(event) => setCpf(event.target.value)} isRequired shadow={"#75D685"} id="cpf" name="cpf" type="text"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Senha:</FormLabel>
                <Input onChange={(event) => setPassword(event.target.value)} isRequired id="password" name="password" type="password"/>
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
