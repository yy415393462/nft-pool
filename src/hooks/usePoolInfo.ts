import { useState,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import useBlockNumber from './useBlockNnmber'
import { getContract,getAllowance } from '../utils'
import { poolInfo } from '../utils/interface'
import masterChef from '../utils/abi/masterChef.json'
import config from '../confing.json'

export default function useTokenBalance(poolInfo:poolInfo):poolInfo{
    const { account, library, chainId} = useWeb3React()
    const blockNumber = useBlockNumber()
    const [data,setData] = useState(poolInfo)

    useEffect(() => {
        if (!!account && !! library) {
            (async ()=> {
                const contract = getContract(config.pool,masterChef,library)
                const pool = await contract.pools(poolInfo.id)
                const user = await contract.userPoolInfo(poolInfo.id,account)
                const data = {
                    id:poolInfo.id,
                    token:poolInfo.token,
                    totalSupply: formatEther(pool.totalSupply),
                    reward: formatEther(await contract.earned(poolInfo.id,account)),
                    supply: formatEther(user.supply),
                    unlockAt: user.unlockAt.toNumber(),
                    allowance: formatEther(await getAllowance(poolInfo.token,library,config.pool,account))
                }
                setData(data)

            })()
        }
    }, [library, chainId,account,blockNumber])

    return data
}