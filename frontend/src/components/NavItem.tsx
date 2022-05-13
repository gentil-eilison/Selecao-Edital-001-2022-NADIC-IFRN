import Link from "next/link"
import Image from "next/image"

import styles from "./NavItem.module.css"

type NavItemData = {
    src: any, 
    text: string
    to: string  
}

const NavItem = ({ src, text, to } : NavItemData) => {
    return (
        <div className={styles.navItem}>
            <Image className={styles.navItemImage} src={src} />
            <Link href={to}>{text}</Link>
        </div>
    )
}

export default NavItem