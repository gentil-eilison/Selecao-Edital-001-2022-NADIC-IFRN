import Image from "next/image"
import { Button, FormControl, Input, FormLabel, Flex, Heading } from "@chakra-ui/react"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"
import api from "../../services/api"

import addPlea from "../../assets/icons/add-plea.svg"

const AddPlea = () => {
    const [title, setTitle] = useState<string | false>(false)
    const [kind, setKind] = useState<string | false>(false)
    const [startDate, setStartDate] = useState<string | false>(false) //Year-Month-Day
    const [endDate, setEndDate] = useState<string | false>(false) //Year-Month-Day
    const [maxCandidates, setMaxCandidates] = useState<string | false>(false)

    const router = useRouter()
    const toast = useToast()

    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    function handleFormSubmit(event) {
        event.preventDefault()
        api.post("plea/", {
            title, 
            startDate,
            endDate,
            kind,
            state: false,
            max_candidates: Number(maxCandidates)
        })
            .then(response => {
                if (response.status === 201) {
                    setSuccess(true)
                    router.push("/dashboard/pleas/")
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    setError(true)
                }
            })
    }

    useEffect(() => {
        setSuccess(false)
        setError(false)
    })

    return (
        <Flex height="100%" flexDirection="column" justifyContent='center' alignItems="center" gap={10}>
            { error && toast({title: 'Já há um pleito com esse nome.', status:'error'}) }
            { success && toast({title: 'Pleito cadastrado com sucesso!.', status: 'success'}) }
            <Flex flexDirection="column" alignItems='center'>
                <Image src={addPlea} width={59} height={59} alt="A box containing an arrow ponting downwards"/>
                <Heading as="h1">Adicionar Pleito</Heading>
            </Flex>

            <form method="post" onSubmit={handleFormSubmit} id="createPleaForm">
                <Flex justifyContent="center" gap={20}>
                    <Flex direction="column">
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="title">Título</FormLabel>
                            <Input 
                                fontFamily="Ubuntu" 
                                type="text" 
                                id="title" 
                                name="title"
                                onChange={(event) => setTitle(event.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="kind">Tipo</FormLabel>
                            <Input 
                                type="text" 
                                id="kind" 
                                name="kind" 
                                fontFamily="Ubuntu"
                                onChange={(event) => setKind(event.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="max_candidates">Máximo de candidatos</FormLabel>
                            <Input 
                                type="number" 
                                id="max_candidates" 
                                name="max_candidates" 
                                fontFamily="Ubuntu"
                                onChange={(event) => setMaxCandidates(event.target.value)}/>
                        </FormControl>
                    </Flex>

                    <Flex flexDirection='column'>
                        <FormControl>
                            <FormLabel htmlFor="startDate" fontFamily="Ubuntu">Começo</FormLabel>
                            <Input 
                                width={250} 
                                type="date" 
                                id="startDate" 
                                name="startDate" 
                                fontFamily="Ubuntu"
                                onChange={(event) => setStartDate(event.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="endDate" fontFamily="Ubuntu">Fim</FormLabel>
                            <Input 
                                width={250} 
                                type="date" 
                                id="endDate" 
                                name="endDate" 
                                fontFamily="Ubuntu"
                                onChange={(event) => setEndDate(event.target.value)}/>
                        </FormControl>
                    </Flex>
                </Flex>
            </form>

            <Button form="createPleaForm" type="submit" _hover={{ bg: "#53c065" }} width={100}>Criar pleito</Button>
        </Flex>
    )
}

export default AddPlea