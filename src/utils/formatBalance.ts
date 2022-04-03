import { BigNumber } from 'ethers'
import { formatUnits } from '@ethersproject/units'

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 4): string => {
	const numberStr = formatUnits(balance, decimals)
	return numberStr.substring(0, numberStr.lastIndexOf('.') + fractionDigits)
}