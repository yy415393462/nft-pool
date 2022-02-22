import React, { useState, useEffect } from 'react'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import useBlockNumber from '../hooks/useBlockNnmber'
import { getETHBalance } from '../utils'

export default function useBalance():string{
    const [balance, setBalance] = useState('0')
    const { account, library, chainId, } = useWeb3React()               
    const blockNumber = useBlockNumber()
    useEffect(() => {
		(async () => {
			if (!!account && !!library) {
				//获取链上钱包信息
				setBalance(formatEther(await getETHBalance(account, library)))
			}
		})()
	}, [account, library, chainId, blockNumber])
    return balance
}