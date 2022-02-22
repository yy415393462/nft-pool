import { useState,useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

export default function useBlockNumber(){
    const { library, chainId } = useWeb3React()
    const [blockNumber, setBlockNumber] = useState<any>() 
	//区块ID同步
	useEffect(() => {
		if (!!library) {
			let stale = false

			library
				.getBlockNumber()
				.then((blockNumber: any) => {
					if (!stale) {
						setBlockNumber(blockNumber)
					}
				})
				.catch(() => {
					if (!stale) {
						setBlockNumber(null)
					}
				})

			const updateBlockNumber = (blockNumber: any) => {
				setBlockNumber(blockNumber)
			}
			library.on('block', updateBlockNumber)

			return () => {
				stale = true
				library.removeListener('block', updateBlockNumber)
				setBlockNumber(undefined)
			}
		}
	}, [library, chainId])

    return blockNumber
}