import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/ITM.json'

export default function useGetNFT(): () => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async ()=>{
        const nft = '0xE3C1d0C79953Ef48d2330950872Ba5fD88A29b02'
        if(!!account){
            const contract = getContract(nft,ABI,library,account)
            const response = await contract.awardItem(account)
            await library.waitForTransaction(response.hash)
        }
        
    },[account,library])

    
    
    return handle
}