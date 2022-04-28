import React, { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from '@web3-react/injected-connector'

import Home from './page/Home'

export default function App() {

  const { activate, active } = useWeb3React()

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1, // Mainet
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
      1337
    ],
  })
  useEffect(() => {
    if (!active) {
      activate(injectedConnector)
    }
  }, [active,activate,injectedConnector]) 

	return (
				<Home/>	
	);
}

