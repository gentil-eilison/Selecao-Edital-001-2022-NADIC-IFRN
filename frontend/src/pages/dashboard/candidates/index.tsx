import NavBar from "../../../components/NavBar/NavBar"
import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import CandidateCard from "../../../components/CandidateCard/CandidateCard"

import Link from "next/link"
import Image from "next/image"

import api from "../../../services/api"
import plusCircle from "../../../assets/icons/plus-circle.svg"

type CandidateData = {
    id: number, 
    name: string, 
    cpf: string,
    birthdate: string,
    address: string,
    votes_on_plea: number,
    current_plea: number
}

const Candidates = () => {
    const [candidates, setCandidates] = useState<CandidateData[] | false>(false)

    useEffect(() => {
        api.get("candidate/")
            .then(response => setCandidates(response.data))
            .catch(error => console.log(error.response))
    }, [])

    return(
        <Flex flexDirection="column" height="100%">
            <NavBar />

            <Flex justifyContent="center" alignItems="center" flexGrow={1} flexDirection="column">
                { candidates && candidates.map(candidate => <CandidateCard candidate={candidate}/>) }
            </Flex>

            <Flex justifyContent="center" mb={2} _hover={{ cursor: "pointer" }}>
                <Link href="/addCandidate/"><Image layout="fixed" width={54} height={54} 
                src={plusCircle}/></Link>
            </Flex>
        </Flex>
    )
}

export default Candidates