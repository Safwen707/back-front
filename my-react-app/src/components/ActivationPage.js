import React from 'react'
import {useParams} from "react-router-dom"
import axios from"axios"
export default function ActivationPage(){
    const{activationCode}=useParams()
    console.log(activationCode)
    axios.post(`http://localhost:3000/user/confirmation/${activationCode}"`)
    return(
        <div>Activation</div>
    )
}