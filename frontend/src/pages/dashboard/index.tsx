import { GetServerSideProps } from "next"
import nookies from "nookies"

import { Flex, Text } from "@chakra-ui/react"
import Image from "next/image"

import heartBox from "../../assets/icons/box_heart.svg"
import NavBar from "../../components/NavBar/NavBar"

const DashBoard = () => {
    return (
      <Flex flexDirection="column" height="100%">
        <NavBar />

        <Flex justifyContent="center" alignItems="center" flexGrow={1}>
          <Image src={heartBox} width={240} height={240}/> 
          <Text fontFamily="Inter" fontWeight="bold" ml={10}>Nada por aqui.</Text>
        </Flex>
      </Flex>
    )
}

export default DashBoard

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { 'exertit.token': token } =  nookies.get(context)  
 
   if (!token) {
     return {
       redirect: {
         destination: "/",
         permanent: false
       }
     }
   }
 
   return {
     props: {}
   }
 }