import {UserContext} from "../index.jsx"
import {useContext} from "react"

const PayNow = ()=>{

  const {shippingAddress} = useContext(UserContext);
  
  console.log(shippingAddress);
  return(
    <div>
      PayNow
    </div>
  )
}

export default PayNow