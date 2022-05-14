import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Flex, Heading, RadioGroup, Radio, Button } from "@chakra-ui/react"
import Image from "next/image"

import voteIcon from "../../assets/icons/vote.svg"

import api from "../../services/api"

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

type CandidateData = {
    id: number, 
    name: string, 
    cpf: string,
    birthdate: string,
    address: string,
    votes_on_plea: number,
    current_plea: number
}

const VotePlea = () => {
    const [plea, setPlea] = useState<PleaData | false>(false)
    const [candidatesOnPlea, setCandidatesOnPlea] = useState<CandidateData[] | false>(false)
    const [votedCandidate, setVotedCandidate] = useState<number>(0)
    
    const router = useRouter()

    function handleFormSubmit() {
    }

    useEffect(() => {
        async function loadCurrentPlea() {
            const plea = await api.get(`plea/${router.query.pleaid}/`).then(response => response.data)
            setPlea(plea)
        }

        loadCurrentPlea()
    }, [])

    useEffect(() => {
        async function loadPleaCandidates() {
            const candidates = await api.get("candidate/").then(response => response.data)
            setCandidatesOnPlea(candidates)
        }

        loadPleaCandidates()
    }, [])

    return (
        <Flex height="100%" flexDirection="column" justifyContent='center' alignItems="center" gap={10}>
            {/* { error && toast({title: 'Já há um candidato com esse CPF.', status:'error'}) }
            { warning && toast({title: 'O número de candidatos no pleito foi excedido.', status: 'warning'}) }
            { success && toast({title: 'Candidato cadastrado com sucesso!.', status: 'success'}) } */}
            <Flex flexDirection="column" alignItems='center'>
                <Image src={voteIcon} width={59} height={59} alt="A box containing an arrow ponting downwards"/>
                <Heading as="h1">Vote No Candidato Desejado</Heading>
                <Heading color="#75D685" as="h2">Pleito: {plea && plea.title}</Heading>
            </Flex>

            <form method="post" onSubmit={handleFormSubmit} id="voteForm">
                <Flex justifyContent="center" gap={20}>
                    <Flex direction="column">
                        <RadioGroup 
                        onChange={(event) => setVotedCandidate(Number(event))} 
                        value={votedCandidate}
                        name="candidate"
                        fontWeight="bold"
                        >
                            <Flex flexDirection="column" gap={2}>
                            { candidatesOnPlea && 
                            candidatesOnPlea.map(candidate => 
                            <Radio
                            value={candidate.id}>{candidate.name}
                            
                            </Radio>) }
                            </Flex>
                        </RadioGroup>
                    </Flex>
                </Flex>
            </form>

            <Button form="voteForm" type="submit" _hover={{ bg: "#53c065" }} width={100}>Votar</Button>
        </Flex>
    )
}

export default VotePlea