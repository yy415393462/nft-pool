import { useState,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import useBlockNumber from './useBlockNnmber'
import {getERC20Balance} from '../utils'


export default function useTokenBalance(contract:string):string{
    const { account, library, chainId} = useWeb3React()                                                                     //eth 工具
	const [balance, setBalance] = useState('0')									                                            //链上token余额
    const blockNumber = useBlockNumber()                                             										//区块ID    
    //区块ID同步
    useEffect(() => {
        if (!!account && !! library) {
            (async ()=> {
                setBalance(formatEther(await getERC20Balance(contract,library,account)))
            })()
        }
    }, [library, chainId,account,blockNumber,contract])
    return balance
}
