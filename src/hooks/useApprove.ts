import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/ITM.json'

export default function useApprove(): (token:string,contract:string) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (token:string,contract:string)=>{
        if(!!account){
            const response = await getContract(token,ABI,library,account).setApprovalForAll(contract,true)
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}