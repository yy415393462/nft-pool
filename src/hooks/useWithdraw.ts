import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/721Pool.json'
import { BigNumber } from 'ethers'

export default function useWithdraw(): (contract:string,params:number[],old:number[]) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (contract:string,params:number[],old:number[])=>{
        if(!!account){
            let arr:BigNumber[] = [],keys:BigNumber[] = []
            
            const data = old.map(item=>{
                if(params.indexOf(item) !== -1){
                    return 0
                }else{
                    return item
                }
            }) 
            //console.log(data)
            for (let index = 0; index < params.length; index++) {
                arr.push(BigNumber.from(params[index]))
                keys.push(BigNumber.from(old.indexOf(params[index])))
            }


            const response = await getContract(contract,ABI,library,account).unstake(arr,keys)
            const receipt = await library.waitForTransaction(response.hash)
            console.log(receipt.transactionHash)
        }              
    },[account,library])

    
    
    return handle
}