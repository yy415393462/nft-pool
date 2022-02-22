import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/721Pool.json'

export default function useGetReward(): (contract:string) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (contract:string)=>{
        if(!!account){
            const response = await getContract(contract,ABI,library,account).getReward()
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}