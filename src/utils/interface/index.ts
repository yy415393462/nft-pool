import {BigNumber} from "ethers"

export declare interface userData {

    energy:string,
    hero:number[],
    weapon:number[],
}

export declare interface confInfo {

    power:number,
    capacity:string,
    sceneLength:number
}

export declare interface SceneInfo {

    capacity:string,
    totalPower:number,
    minGrade:string
    userPower:number,
    userEarn:string,
    userDeploy:number[]
}

