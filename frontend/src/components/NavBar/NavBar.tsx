import { Flex } from "@chakra-ui/react"
import Image from "next/image"
import NavItem from "../NavItem"

import award from "../../assets/icons/award.svg"
import plea from "../../assets/icons/plea.svg"
import candidate from "../../assets/icons/candidate.svg"
import styles from "./NavBar.module.css"

const NavBar = () => {
    return (
        <header className={styles.dashBoardHeader}>
          <Flex justifyContent="center" gap={2}>
            <Image width={47} height={47} src={award} alt="Black award icon"/>
            <NavItem src={plea} text="Pleitos" to="/dashboard/pleas/"/>
            <NavItem src={candidate} text="Candidatos" to="/dashboard/candidates/"/>
          </Flex>
        </header>
    )
}

export default NavBar