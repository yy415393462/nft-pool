import React, { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import masterChef from '../utils/abi/masterChef.json'
import config from '../confing.json'

import { getContract } from '../utils'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'

export default function useTakeEarn():()=>Promise<void>{
    const { account, library, chainId} = useWeb3React()
    

    const handle = useCallback(async ()=>{
        if (!!account) {
            const contract = getContract(config.pool,masterChef,library,account)
            const response:TransactionResponse = await contract.takeRewardAll()
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)
        }else{
            console.log('error')
        }
    },[account,library,chainId])
    return handle
}