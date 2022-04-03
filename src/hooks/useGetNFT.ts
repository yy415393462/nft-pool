import React, { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils'
import ABI from '../utils/abi/NFT.json'
import { BigNumber } from 'ethers'
import {TransactionReceipt,TransactionResponse} from '@ethersproject/abstract-provider'
import confing from '../confing.json'

export default function useGetNFT(): (tokenId:BigNumber) => Promise<void>{
    const { account, library} = useWeb3React()
    

    const handle = useCallback(async (tokenId:BigNumber)=>{
        if(!!account){
            const ADI = confing.adi
            const contract = getContract(ADI,ABI,library,account)
            const response:TransactionResponse = await contract.mint(account,tokenId)
            const result:TransactionReceipt = await library.waitForTransaction(response.hash)
            console.log(result.transactionHash)

        }
        
    },[account,library])

    
    
    return handle
}