import React, { useCallback, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Radio,Input,Button } from 'antd'
import {StrBreviary} from '../../utils/tool'
import useGetNFT from "../../hooks/useGetNFT"
import useGetToken from "../../hooks/useGetToken"
import { BigNumber } from "ethers"
import { parseUnits } from '@ethersproject/units'
import useUserData from "../../hooks/useUserData"
import usePower from "../../hooks/usePower"
import useConfInfo from "../../hooks/useConfInfo"
import Pool from "../Pool"
import useApprove from '../../hooks/useApprove'
import useGetReward from "../../hooks/useGetReward"
import useDeposit from "../../hooks/useDeposit"
import useWithdraw from "../../hooks/useWithdraw"



export default function Home() {

    const {account} = useWeb3React()
    const [mintStatus,setMintStatus] = useState(false)
    const [getStatus,setGetStatus] = useState(false)
    const [approveStatus,setApproveStatus] = useState(false)
    const [rewardStatus,setRewardStatus] = useState(false)
    const [depositStatus,setDepositStatus] = useState(false)
    const [wthdrawStatus,setWthdrawStatus] = useState(false)
    const [hero,setHero] = useState<number>()
    const [weapon,setWeapon] = useState<number>()
    const [power,setPower] = useState<number>()
    const getNft = useGetNFT()
    const getToken = useGetToken()
    const getPower = usePower()
    const { Search } = Input
    const userData = useUserData()
    const confInfo = useConfInfo()
    const approve = useApprove()
    const getReward = useGetReward()
    const deposit = useDeposit()
    const withdraw = useWithdraw()


    useEffect(()=>{
        if(!!account){
            getPower(hero,weapon).then((data)=>{
                setPower(data)
            })
        }
    },[account,hero,weapon])

    const mintNft = async (value:any)=>{
        try{
            setMintStatus(true)
            await getNft(BigNumber.from(value))
            setMintStatus(false)
        }catch(e){
            console.log(e)
            setMintStatus(false)
        }
        
    }
    const mintToken = async (value:any)=>{
        try{
            setGetStatus(true)
            await getToken(parseUnits(value,18))
            setGetStatus(false)
        }catch(e){
            console.log(e)
            setGetStatus(false)
        }
        
    }

    const chooseHero = (e:any)=>{
        setHero(e.target.value)
    }

    const chooseWeapon = (e:any)=>{
        setWeapon(e.target.value)
    }
    const getArray = (length:number):number[] => {
        let arr:number[] = []
        for(let i = 0; i < length; i++){
            arr.push(i)
        }
        return arr 
    }
    
    const doApprove = async()=>{
        try{
            setApproveStatus(true)
            await approve()
            setApproveStatus(false)
        }catch(e){
            console.log(e)
            setApproveStatus(false)
        }
    }

    const takeReward = async()=>{
        try{
            setRewardStatus(true)
            await getReward()
            setRewardStatus(false)
        }catch(e){
            console.log(e)
            setRewardStatus(false)
        }
    }

    const doDeposit = useCallback(async(value:string)=>{
        try{
            setDepositStatus(true)
            await deposit(Number(value),hero,weapon)
            setDepositStatus(false)
        }catch(e){
            console.log(e)
            setDepositStatus(false)
        }
    },[hero,weapon])

    const doWithdraw = async(value:string)=>{
        try{
            setWthdrawStatus(true)
            await withdraw(Number(value))
            setWthdrawStatus(false)
        }catch(e){
            console.log(e)
            setWthdrawStatus(false)
        }
    }





	return (
        <>
            <div className="user-info">
                <h2 className="title">用户信息</h2>
                <div className="account">
                    <span>地址:</span>
                    <p>
                        {StrBreviary(account,9,9)}
                    </p>
                </div>
                
                <p className="help">选中英雄和武器 查看战力 并进入副本</p>
                <div>
                    <p>能量: {userData.energy}</p>
                    
                </div>
                <div>
                    <span>英雄:</span>
                    <div className="radio">
                        <Radio.Group defaultValue={hero} buttonStyle="solid" onChange={chooseHero}>
                            {userData.hero.map((item,key)=>(
                                <Radio.Button value={item} key={key}># {item}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </div>
                    
                </div>
                <div>
                    <span>武器:</span>
                    <div className="radio">
                        <Radio.Group defaultValue={weapon} buttonStyle="solid" onChange={chooseWeapon}>
                            {userData.weapon.map((item,key)=>(
                                <Radio.Button value={item} key={key}># {item}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div>
                    <p>战力: {power}</p>
                </div>
                
            </div>
            
            <div className="mint">
                <h2 className="title">获取材料</h2>
                <div>
                <Search type="number" 
                        placeholder="输入ID铸造NFT" 
                        enterButton="Mint" 
                        size="large" 
                        onSearch={mintNft}
                        loading={mintStatus}
                        />
                <span className="help">大于600为武器</span>
                    
                    
                </div>
                <div>
                <Search placeholder="输入数量获取能量" 
                        enterButton="GET" 
                        size="large"
                        onSearch={mintToken}
                        loading={getStatus}  />
                    
                </div>
            </div>
            <div className="conf">
                <h2 className="title">全网信息</h2>
                <p>全网战力: {confInfo.power}</p>
                <p>全网产能: {confInfo.capacity}</p>
            </div>

            <div className="pool">
                <h2 className="title">副本信息</h2>                
                {getArray(confInfo.sceneLength).map(
                    value=><Pool id={value} key={value}/>
                    )}
            </div>
            <div className="console">
                <h2 className="title">操作台</h2>
                <div className="console-button">
                    <Button type="primary" loading={approveStatus} onClick={doApprove}>超量授权</Button>
                </div>
                <div className="console-button">
                    <Button type="primary" loading={rewardStatus} onClick={takeReward}>提取收益</Button>
                </div>
                <div className="console-button">
                    <Search type="number" 
                            placeholder="输入副本编号" 
                            enterButton="进入副本" 
                            size="large" 
                            onSearch={doDeposit}
                            loading={depositStatus}
                    />
                </div>
                <div className="console-button">  
                    <Search type="number" 
                            placeholder="输入副本编号" 
                            enterButton="退出副本" 
                            size="large" 
                            onSearch={doWithdraw}
                            loading={wthdrawStatus}
                    /> 
                </div>
                
            </div>
        </>	
	);
}