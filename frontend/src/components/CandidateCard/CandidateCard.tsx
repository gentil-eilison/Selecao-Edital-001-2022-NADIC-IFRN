import { Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import api from "../../services/api"

type CandidateData = {
    id: number, 
    name: string, 
    cpf: string,
    birthdate: string,
    address: string,
    votes_on_plea: number,
    current_plea: number
}

type CandidateCardData = {
    candidate: CandidateData
}

const CandidateCard = ({ candidate }: CandidateCardData) => {
    const [currentPleaTitle, setCurrentPleaTitle] = useState<string | false>(false)

    useEffect(() => {
        api.get(`plea/${candidate.current_plea}`)
            .then(response => setCurrentPleaTitle(response.data.title))
            .catch(error => console.log(error.response))
    }, [])

    return (
        <Flex
            width="100%"
            border="solid 2px #75D685"
            justifyContent="space-between" 
            mt={2} 
            px={2}
            borderRadius={5}
        >
            <Flex flexDirection="column">
                <Text fontFamily="Ubuntu" fontSize={24}><strong>{candidate.name}</strong></Text>
                <p><strong>{candidate.address}</strong></p>
                <p><strong>Data de nascimento</strong>: {candidate.birthdate.replace("-", "/")}</p>
            </Flex>

            <Flex flexDirection="column" justifyContent="space-around">
                <p>
                    <strong>Pleito atual</strong>: 
                    { currentPleaTitle && currentPleaTitle }
                </p>
            </Flex>

        </Flex>
    )
}

export default CandidateCard