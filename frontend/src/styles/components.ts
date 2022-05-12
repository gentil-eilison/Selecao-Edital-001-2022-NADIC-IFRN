import type { ComponentStyleConfig } from "@chakra-ui/theme"

const Button: ComponentStyleConfig = {
    baseStyle: {
        bg: "#75D685",
        fontFamily: "Ubuntu",
        color: "#FFF"
    },
    variants: {
        solid: {
            bg: "#75D685"
        },
    }
}

const Input: ComponentStyleConfig = {
    baseStyle: {
        outline: "solid 2px #75D685"
    },
    variants: {
        solid: {
            outline: "solid 2px #75D685"
        }
    }
}

export { Button, Input }