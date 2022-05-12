import { Heading } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { FormControl, FormLabel, Input, Button, ButtonGroup } from "@chakra-ui/react"
// import { Img } from "@chakra-ui/react"
import Image  from "next/image"

import styles from "../styles/Home.module.css"
import award from "../assets/icons/award.svg"
import login from "../assets/icons/login.svg"
import voteVector from "../assets/images/vote_lp.jpg"

export default function Home() {
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

          <form action="/signIn" method="post" className={styles.loginForm}>
              <FormControl>
                <FormLabel htmlFor="cpf">CPF:</FormLabel>
                <Input isRequired shadow={"#75D685"} id="cpf" name="cpf" type="text"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Senha:</FormLabel>
                <Input isRequired id="password" name="password" type="password"/>
              </FormControl>

              <ButtonGroup mt={15}>
                <Button 
                  type="submit" 
                  _hover={{ bg: "#53c065" }}>
                    <Image src={login} alt="Door opening"/> Login
                </Button>
                
                <Button _hover={{ bg: "#53c065" }}><a href="/signUp">Criar conta</a></Button>
              </ButtonGroup>
          </form>
      </Flex>
    </Flex>
  )
}
