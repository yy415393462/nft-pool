import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/ITM.json'

export default function useUserWalletNft(): (contract:string) => Promise<number[]>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (contract:string)=>{
        const balance = await getContract(contract,ABI,library).balanceOf(account)
        let arr:number[] = []
        for (let index = 0; index < balance.toNumber(); index++) {
            const id = await getContract(contract,ABI,library).tokenOfOwnerByIndex(account,index)
            //console.log(id)
            arr.push(id.toNumber()) 
            
        }
        return arr
               
    },[account,library])

    
    
    return handle
}