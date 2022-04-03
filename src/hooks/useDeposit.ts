import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Scene.json'
import { BigNumber } from 'ethers'
import confing from '../confing.json'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'

export default function useDeposit(): (id:number,hero:number|undefined,weapon:number|undefined) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (id:number,hero:number|undefined,weapon:number|undefined)=>{
        if(!!account && hero !== undefined){
            const pool = confing.scene
            const contract = getContract(pool,ABI,library,account)
            const response:TransactionResponse = await contract.deposit(
                    BigNumber.from(id),
                    BigNumber.from(hero),
                    weapon === undefined?BigNumber.from(0):BigNumber.from(weapon),
                    weapon === undefined?false:true
                )
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)

        }
        
    },[account,library])

    
    
    return handle
}