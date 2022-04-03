import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Scene.json'
import { BigNumber } from 'ethers'
import confing from '../confing.json'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'

export default function useWithdraw(): (id:number) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (id:number)=>{
        if(!!account){
            const pool = confing.scene
            const contract = getContract(pool,ABI,library,account)
            console.log(contract)
            const response:TransactionResponse = await contract.withdraw(BigNumber.from(id))
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)

        }
        
    },[account,library])

    
    
    return handle
}