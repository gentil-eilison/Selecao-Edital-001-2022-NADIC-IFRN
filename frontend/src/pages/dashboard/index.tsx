import { GetServerSideProps } from "next"
import nookies from "nookies"

const DashBoard = () => {

    return (
        <h1>Welcome to the dashboard!</h1>
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