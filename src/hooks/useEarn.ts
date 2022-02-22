import { useState,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import useBlockNumber from './useBlockNnmber'
import {getContract} from '../utils'
import poolABI from '../utils/abi/721Pool.json'
import { BigNumber } from 'ethers'


export default function useEarn(contract:string):string{
    const { account, library, chainId} = useWeb3React()                                                                     //eth 工具
	const [balance, setBalance] = useState('0')									                                            //链上token余额
    const blockNumber = useBlockNumber()                                             										//区块ID    
    //区块ID同步
    useEffect(() => {
        if (!!account && !! library) {
            (async ()=> {
               const period = await getContract(contract,poolABI,library).currentPeriod()
               //console.log(period.toNumber())
               if(BigNumber.from(0).gte(period)){
                    setBalance('0')
               }else{
                   let num = BigNumber.from(0)
                   for(let i=1;i<=period.toNumber();i++){
                       num = num.add(await getContract(contract,poolABI,library).earned(account,i))
                   }
                   setBalance(formatEther(num))
               }
            })()
        }
    }, [library, chainId,account,blockNumber,contract])
    return balance
}
