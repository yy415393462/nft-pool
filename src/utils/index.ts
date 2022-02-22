import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import { TransactionResponse } from "@ethersproject/abstract-provider"
import { BigNumber, ethers } from 'ethers'
import ERC20ABI from './abi/erc20.json'

export function isAddress(value: any): string | false {
	try {
		return getAddress(value)
	} catch {
		return false
	}
}

// account is not optional
export const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
	return library.getSigner(account).connectUnchecked()
}

// account is optional
export const getProviderOrSigner = (library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner => {
	return account ? getSigner(library, account) : library
}

//
export const getContract = (address: string, ABI: any, library: Web3Provider, account?: string): Contract => {
	if (!isAddress(address) || address === AddressZero) {
		throw Error(`Invalid 'address' parameter '${address}'.`)
	}

	return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}



export const getERC20Balance = async (contractAddress: string, library: Web3Provider, account?: string) => {
	const contract = getContract(contractAddress, ERC20ABI, library)
	return contract.balanceOf(account)

}

export const getETHBalance = async (account: string, library: Web3Provider) => {
	return library.getBalance(account)
}

export const sendEth = async (account: string, to: string, value: BigNumber, library: Web3Provider): Promise<TransactionResponse> => {
	return getSigner(library,account).sendTransaction({to,value})
}

export const sendERC20Token = async (contractAddress: string,account:string, sendAddress: string, amount: BigNumber, library: Web3Provider):Promise<TransactionResponse> => {
	return getContract(contractAddress,ERC20ABI,library,account).transfer(sendAddress, amount)
}

export const doApprove = async (contractAddress: string,account:string, sendAddress: string, library: Web3Provider):Promise<TransactionResponse> => {
	return getContract(contractAddress,ERC20ABI,library,account).approve(sendAddress,ethers.constants.MaxUint256)
}

export const getAllowance = async (contractAddress: string, library: Web3Provider, targetAddress:string,account: string) => {
	return getContract(contractAddress, ERC20ABI, library).allowance(account,targetAddress)
}

export const signMessage = async (account: string, library: Web3Provider, message:string,):Promise<string> => {
	return library.getSigner(account).signMessage(message)
}