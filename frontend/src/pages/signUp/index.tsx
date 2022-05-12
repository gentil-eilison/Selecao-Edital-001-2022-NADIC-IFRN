import { toast, VStack } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { FormControl, FormLabel, Input, Button, ButtonGroup } from "@chakra-ui/react"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

import api from "../../services/api"

import infoCircle from "../../assets/icons/info-circle.svg"

const SignUp = () => {
    const [cpf, setCpf] = useState<string | false>(false)
    const [password, setPassword] = useState<string | false>(false)
    const [confirmPassword, setConfirmPassword] = useState<string | false>(false)

    const [error, setError] = useState<boolean>(false)

    const router = useRouter()
    const toast = useToast()

    function handleFormSubmit(event) {
        event.preventDefault()
        api.post("voter/", {
            cpf: cpf,
            password: password,
            confirm_password: confirmPassword
        }).then(response => {
            console.log(response)
            router.push("/")
        }).catch(error => setError(true))
    }

    return (
        <VStack height="100vh" alignItems="center" justifyContent="center">
            { error && toast({title: 'Houve um erro ao criar a conta.', status:'error'}) }
            <header>
                <Flex flexDir="column" justifyContent="center" alignItems="center" gap={3}>
                    <Image width={59} height={59} src={infoCircle} alt="Exclamation mark in a circle"/>
                    <Heading as="h1">Que bom que sabe da importância do voto</Heading>
                    <Heading fontSize={28} as="h2" color="#75D685">Por favor, preencha o formulário abaixo</Heading>
                </Flex>
            </header>

            <form method="post">
                <VStack justifyContent="center" width={500}>
                    <FormControl>
                        <FormLabel textAlign="center" htmlFor="cpf">CPF</FormLabel>
                        <Input 
                            textAlign="center" 
                            type="text" 
                            name="cpf" 
                            isRequired 
                            id="cpf" 
                            placeholder="123.456.789-10"
                            onChange={(event) => setCpf(event.target.value)}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password" textAlign="center">Senha</FormLabel>
                        <Input 
                            textAlign="center" 
                            type="password" 
                            name="password" 
                            isRequired 
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="confirm_password" textAlign="center">Confirmar senha</FormLabel>
                        <Input 
                            textAlign="center" 
                            type="password" 
                            name="confirm_password" 
                            isRequired 
                            id="confirm_password"
                            onChange={(event) => setConfirmPassword(event.target.value)}></Input>
                    </FormControl>

                    <Button onClick={handleFormSubmit} type="submit" _hover={{ bg: "#53c065" }} width={100}>Criar</Button>
                </VStack>
            </form>
        </VStack>
    )
}

export default SignUp