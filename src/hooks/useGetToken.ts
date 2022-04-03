import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/GameToken.json'
import { BigNumber } from 'ethers'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'
import confing from '../confing.json'

export default function useGetToken(): (amount:BigNumber) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (amount:BigNumber)=>{
        if(!!account){
            const address = confing.energy
            const contract = getContract(address,ABI,library,account)
            const response:TransactionResponse = await contract.mintRewardTo(account,amount)
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)

        }
        
    },[account,library])

    
    
    return handle
}