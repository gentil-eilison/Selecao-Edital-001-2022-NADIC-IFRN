import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import Link from "next/link"

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

type PleaCardData = {
    plea: PleaData
}

const PleaCard = ({ plea }: PleaCardData) => {
    return (
        <Flex 
        width="100%" 
        border="solid 2px #75D685" 
        justifyContent="space-between" 
        mt={2} 
        px={2}
        borderRadius={5}>
            <Flex flexDirection="column">
                <Text fontFamily="Ubuntu" fontSize={24}><strong>{plea.title}</strong></Text>
                <p><strong>{plea.kind}</strong></p>
                <p><strong>Período</strong>: {plea.startDate} até {plea.endDate}</p>
                <p><strong>Candidatos</strong>: </p>
            </Flex>
            <Flex flexDirection="column" justifyContent="space-around">
                <p><strong>Situação</strong>: { plea.state === true ? 'Encerrado' : 'Em Andamento' }</p>
                <Flex gap={3}>
                    <Button _hover={{ bg: "#53c065" }}><Link href="/votePlea/">Votar</Link></Button>
                    { plea.state === true && <Button _hover={{ bg: "#53c065" }}>
                        <Link href="/seeResults/">Resultados</Link></Button>}    
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PleaCard