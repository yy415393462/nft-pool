import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/erc20.json'
import confing from '../confing.json'
import { ethers } from 'ethers'

export default function useApprove(token:string): () => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async ()=>{
        if(!!account){

            const response = await getContract(token,ABI,library,account).approve(confing.pool,ethers.constants.MaxUint256)
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}