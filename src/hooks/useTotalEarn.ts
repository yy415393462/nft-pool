import React, { useState,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import useBlockNumber from './useBlockNnmber'
import masterChef from '../utils/abi/masterChef.json'
import config from '../confing.json'
import pools from '../pool.json'
import { BigNumber } from 'ethers'
import { getContract } from '../utils'

export default function useTotalEarn():string{
    const { account, library, chainId} = useWeb3React()                                                                     //eth 工具
	const [balance, setBalance] = useState('0')									                                            //链上token余额
    const blockNumber = useBlockNumber()                                             										//区块ID    
    //区块ID同步
    useEffect(() => {
        if (!!account && !! library) {
            
            (async ()=> {
                let number = BigNumber.from(0)
                const contract = getContract(config.pool,masterChef,library)
                for (const pool of pools) {
                    number = number.add(await contract.earned(pool.id,account));
                }
                setBalance(formatEther(number))
            })()
        }
    }, [library, chainId,account,blockNumber])
    return balance
}