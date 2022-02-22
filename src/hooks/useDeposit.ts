import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/721Pool.json'
import { BigNumber } from 'ethers'

export default function useDeposit(): (contract:string,params:number[]) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (contract:string,params:number[])=>{
        if(!!account){
            let arr:BigNumber[] = []
            for (let index = 0; index < params.length; index++) {
                arr.push(BigNumber.from(params[index]))
                
            }
            console.log(arr)
            const response = await getContract(contract,ABI,library,account).stake(arr)
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}