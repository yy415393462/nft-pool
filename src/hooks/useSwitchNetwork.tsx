import {useCallback} from 'react';
import { useWeb3React } from '@web3-react/core'



export default function useSwitchNetwork() {
    const { chainId, library } = useWeb3React()

    const onSwitch = useCallback(async(id: string, name: string, rpc: string, blockExplorerUrls:string, decimals: number)=>{
        if(library){
            const { ethereum } = window as any
            try{
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: id,
                            chainName: name,
                            nativeCurrency: {
                                name: name,
                                symbol: name,
                                decimals: decimals,
                            },
                            rpcUrls: [rpc],
                            blockExplorerUrls: [blockExplorerUrls],
                        }
                    ],
                });
                return true
            }catch (e) {
                console.log(e)
                return false
            }
        }


        console.log(chainId)
    },[chainId,library]);

    return onSwitch
}