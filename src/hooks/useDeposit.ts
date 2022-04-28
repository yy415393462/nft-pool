import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/masterChef.json'
import { BigNumber } from 'ethers'
import confing from '../confing.json'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'

export default function useDeposit(): (id:number,amount:BigNumber) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (id:number,amount:BigNumber)=>{
        if(!!account){
            const pool = confing.pool
            const contract = getContract(pool,ABI,library,account)
            const response:TransactionResponse = await contract.deposit(
                    id,
                    amount,
                    account
                )
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)

        }
        
    },[account,library])

    
    
    return handle
}