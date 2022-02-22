import { useState} from 'react'
import { useWeb3React } from '@web3-react/core'

import {signMessage} from '../utils'

export default function useSignMessage(message:string):[boolean,()=>void]{
    const { account, library} = useWeb3React()
    const [runging,setRunging] = useState(false)            //signMessage动作是否已在进行
    const sendMessage= async ()=>{
        try {
            if (!!account && !! library) {
                setRunging (true)
                const receipt = await signMessage(account,library,message)
                console.log(receipt)
                setRunging(false)
            } 
        } catch (error) {
            alert(error)
        }
        
    }
    return [runging,sendMessage]
}