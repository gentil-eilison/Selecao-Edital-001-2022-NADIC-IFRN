import NavBar from "../../../components/NavBar/NavBar"
import { Flex } from "@chakra-ui/react"
import PleaCard from "../../../components/PleaCard/PleaCard"
import Image from "next/image"
import Link from "next/link"

import api from "../../../services/api"

import { useEffect, useState } from "react"

import plusCircle from "../../../assets/icons/plus-circle.svg"

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

const Pleas = () => {
    const [pleas, setPleas] = useState<PleaData[] | false>(false)

    useEffect(() => {
        async function getAllPleas() {
            const pleasList = await api.get("plea/").then(response => response.data).catch(error => error.response.status)

            if (pleasList) setPleas(pleasList)

        }

        getAllPleas()
    }, [])

    return (
        <Flex flexDirection="column" height="100%">
            <NavBar />

            <Flex justifyContent="center" alignItems="center" flexGrow={1} flexDirection="column">
                { pleas && pleas.map(plea => <PleaCard plea={plea}/>) }
            </Flex>

            <Flex justifyContent="center" mb={2} _hover={{ cursor: "pointer" }}>
                <Link href="/addPlea/"><Image layout="fixed" width={54} height={54} 
                src={plusCircle}/></Link>
            </Flex>
        </Flex>
    )
}

export default Pleas