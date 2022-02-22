import {BigNumber} from "ethers"

export declare interface DonateParams {

    contract:string,
    address:string,
    amount:BigNumber,
    decimals?:number,
}

