import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Scene.json'
import confing from '../confing.json'

export default function useGetReward(): () => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async ()=>{
        if(!!account){
            const contract = confing.scene
            const response = await getContract(contract,ABI,library,account).getRewardAll()
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}