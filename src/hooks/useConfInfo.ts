import React, { useCallback, useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Scene.json'
import {confInfo} from '../utils/interface'
import { BigNumber } from 'ethers'
import {getDisplayBalance} from '../utils/formatBalance'
import useBlockNumber from './useBlockNnmber'
import confing from '../confing.json'

export default function useConfInfo(): confInfo{
    const { account, library} = useWeb3React()
    const [power,setPower] = useState<number>(0)
    const [capacity,setCapacity] = useState<string>('0')
    const [sceneLength,setSceneLength] = useState<number>(0)
    const blockNumber = useBlockNumber()

    useEffect(()=>{
        const poolContract = confing.scene
        if(!!account && !!library){
            const Contract = getContract(poolContract,ABI,library)
            
            Contract.totalPower()
            .then((data:BigNumber)=>{
                setPower(data.toNumber())
            })
            Contract
            .blockOutput()
            .then((data:BigNumber)=>{
                setCapacity(getDisplayBalance(data))
            })
            Contract
            .sceneLength()
            .then((data:BigNumber)=>{
                setSceneLength(data.toNumber())
            })
        }

    },[account,library,blockNumber])



    
    
    return {power,capacity,sceneLength}
}