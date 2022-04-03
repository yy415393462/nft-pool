import React, { useCallback, useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/Scene.json'
import {SceneInfo} from '../utils/interface'
import useBlockNumber from './useBlockNnmber'
import { BigNumber } from 'ethers'
import {getDisplayBalance} from '../utils/formatBalance'
import confing from '../confing.json'

export default function useSceneInfo(id:number):SceneInfo{
    const { account, library} = useWeb3React()
    const blockNumber = useBlockNumber()
    const [capacity,setCapacity] = useState('0')
    const [totalPower,setTotalPower] = useState(0) 
    const [minGrade,setMinGrade] = useState('') 
    const [userPower,setUserPower] = useState(0)
    const [userEarn,setUserEarn] = useState('0') 
    const [userDeploy,setUserDeploy] = useState<number[]>([])
    
    useEffect(()=>{
        if(!!account && !!library){
            
            (async ()=>{
                const grade = ['N','R','S','SR','SSR']
                const poolContract = confing.scene
                const Contract = getContract(poolContract,ABI,library)
                const blockOutput = await Contract.blockOutput()
                const totalRate = await Contract.totalAllocPoint()
                const sceneInfo = await Contract.sceneInfos(BigNumber.from(id))
                setCapacity(getDisplayBalance(
                    blockOutput.mul(sceneInfo.allocPoint).div(totalRate)
                ))
                setTotalPower(sceneInfo.totalPower.toNumber())   
                setMinGrade(grade[sceneInfo.minGrade])
                const userInfo = await Contract.userInfo(BigNumber.from(id),account)
                setUserPower(userInfo.power.toNumber()) 
                const earn = await Contract.earned(BigNumber.from(id),account)
                setUserEarn(getDisplayBalance(earn))
                const length = await Contract.userDepositsLength(BigNumber.from(id),account)
                
                //console.log(length.toNumber())
                if(length.toNumber() === 0){
                    setUserDeploy([])
                }else{
                    let arr:number[] = []
                    for(let i = 0; i< length.toNumber(); i++){
                        const tokenId = await Contract.userDeposits(BigNumber.from(id),account,BigNumber.from(i))
                        arr.push(tokenId.toNumber())
                    } 
                    setUserDeploy(arr)
                }
                      
            })()
            
            
        }
         
    },[account,library,blockNumber])

    
    
    return {capacity,totalPower,minGrade,userPower,userEarn,userDeploy}
}