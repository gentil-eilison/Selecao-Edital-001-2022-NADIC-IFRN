import { Flex, Heading, FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"

import api from "../../services/api"

import addCandidate from "../../assets/icons/add-candidate.svg"

type PleaData = {
    id: number, 
    title: string, 
    startDate: string, 
    endDate: string, 
    kind: string, 
    state: boolean,
    voted_by: number[],
    max_candidates: number
}

const AddCandidate = () => {
    const [pleas, setPleas] = useState<PleaData[] | false>(false)

    const [name, setName] = useState<string | false>(false)
    const [address, setAddress] = useState<string | false>(false)
    const [birthdate, setBirthdate] = useState<string | false>(false)
    const [cpf, setCpf] = useState<string | false>(false)
    const [currentPlea, setCurrentPlea] = useState<string | false>(false)

    const [success, setSuccess] = useState<boolean>(false)
    const [warning, setWarning] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()
    const toast = useToast()

    function handleFormSubmit(event) {
        event.preventDefault()

        console.log(currentPlea)

        api.post("candidate/", {
            name, 
            cpf,
            birthdate,
            address,
            current_plea: currentPlea
        })
            .then(response => {
                if (response.status === 200) {
                    setSuccess(true)
                    router.push("/dashboard/candidates")
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setError(true)
                } else if (error.response.status === 400) {
                    setWarning(true)
                }
            } )
    }

    useEffect(() => {
        api.get("plea/").then(response => setPleas(response.data)).catch(error => error.response.status)
    }, [])

    useEffect(() => {
        setSuccess(false)
        setWarning(false)
        setError(false)
    })

    return (
        <Flex height="100%" flexDirection="column" justifyContent='center' alignItems="center" gap={10}>
            { error && toast({title: 'Já há um candidato com esse CPF.', status:'error'}) }
            { warning && toast({title: 'O número de candidatos no pleito foi excedido.', status: 'warning'}) }
            { success && toast({title: 'Candidato cadastrado com sucesso!.', status: 'success'}) }
            <Flex flexDirection="column" alignItems='center'>
                <Image src={addCandidate} width={59} height={59} alt="A box containing an arrow ponting downwards"/>
                <Heading as="h1">Adicionar Candidato</Heading>
            </Flex>

            <form method="post" onSubmit={handleFormSubmit} id="createCandidateForm">
                <Flex justifyContent="center" gap={20}>
                    <Flex direction="column">
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="name">Nome</FormLabel>
                            <Input 
                                fontFamily="Ubuntu" 
                                type="text" 
                                id="name" 
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="address">Endereço</FormLabel>
                            <Input 
                                fontFamily="Ubuntu" 
                                type="text" 
                                id="address" 
                                name="address"
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="birthdate">Data da Nascimento</FormLabel>
                            <Input 
                                fontFamily="Ubuntu" 
                                type="date" 
                                id="birthdate" 
                                name="birthdate"
                                onChange={(event) => setBirthdate(event.target.value)}
                            />
                        </FormControl>
                    </Flex>
                    <Flex direction="column">
                    <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="cpf">CPF</FormLabel>
                            <Input 
                                fontFamily="Ubuntu" 
                                type="text" 
                                id="cpf" 
                                name="cpf"
                                onChange={(event) => setCpf(event.target.value)}
                            />
                        </FormControl>
                    <FormControl>
                            <FormLabel fontFamily="Ubuntu" htmlFor="current_plea">Pleito:</FormLabel>
                            <Select placeholder="Selecione um pleito..." onChange={(event) => setCurrentPlea(event.target.value)}>
                                { pleas && pleas.map(plea => <option value={plea.id}>{plea.title}</option>) }
                            </Select>
                        </FormControl>
                    </Flex>
                </Flex>
            </form>

            <Button form="createCandidateForm" type="submit" _hover={{ bg: "#53c065" }} width={100}>Adicionar</Button>
        </Flex>
    )
}

export default AddCandidate