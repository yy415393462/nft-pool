import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Fighting.json'
import { BigNumber } from 'ethers'
import confing from '../confing.json'

export default function usePower(): (hero:number|undefined,weapon:number|undefined) => Promise<number>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (hero:number|undefined,weapon:number|undefined)=>{
        if(!!account && hero !== undefined){
            const Fighting = confing.fighting
            const contract = getContract(Fighting,ABI,library)
            const result = await contract.finalCombatEffectiveness(
                    BigNumber.from(hero),
                    weapon === undefined?BigNumber.from(0):BigNumber.from(weapon),
                    weapon === undefined?false:true
                )
            return result.toNumber()

        }
        
    },[account,library])

    
    
    return handle
}