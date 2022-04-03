import React, { useCallback, useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ADI from '../utils/abi/NFT.json'
import GameToken from '../utils/abi/GameToken.json'
import {userData} from '../utils/interface'
import { BigNumber } from 'ethers'
import {getDisplayBalance} from '../utils/formatBalance'
import useBlockNumber from './useBlockNnmber'
import confing from '../confing.json'

export default function useUserData(): userData{
    const { account, library} = useWeb3React()
    const [energy,setEnergy] = useState('0')
    const [hero,setHero] = useState<number[]>([])
    const [weapon,setWeapon] = useState<number[]>([])
    const blockNumber = useBlockNumber()

    useEffect(()=>{
        const energyContract = confing.energy
        const ADIContract = confing.adi
        if(!!account && !!library){
            
            (async ()=>{
                const energyBalance = await getContract(energyContract,GameToken,library).balanceOf(account)
                setEnergy(getDisplayBalance(energyBalance))
                const ADIBalance = await getContract(ADIContract,ADI,library).balanceOf(account)
                let newHero:number[] = [], newWeapon:number[] = []
                for (let index = 0; index < ADIBalance.toNumber(); index++) {
                    const id = await getContract(ADIContract,ADI,library).tokenOfOwnerByIndex(account,BigNumber.from(index))
                    //console.log(id)
                    if(id.lte(BigNumber.from(600))){
                        newHero.push(id.toNumber())
                    }else{
                        newWeapon.push(id.toNumber())
                    }                   
                }
                setHero(newHero)
                setWeapon(newWeapon)
            })()

        }

    },[account,library,blockNumber])



    
    
    return {energy,hero,weapon}
}