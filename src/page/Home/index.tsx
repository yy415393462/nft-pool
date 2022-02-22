import React, { useCallback, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Checkbox, Row, Col } from 'antd';
import {StrBreviary} from '../../utils/tool'
import Mask from '../../components/Mask'
import useGetNFT from "../../hooks/useGetNFT"
import useEarn from "../../hooks/useEarn"
import useUserWalletNft from "../../hooks/useUserWalletNft"
import useBlockNumber from "../../hooks/useBlockNnmber";
import useUserDepositNft from "../../hooks/useUserDepositNft";
import useDeposit from "../../hooks/useDeposit";
import useWithdraw from "../../hooks/useWithdraw";
import useGetReward from "../../hooks/useGetReward";
import useApprove from "../../hooks/useApprove";

export default function Home() {

    const {account} = useWeb3React()
    const poolAddress = '0x8Fc67ECc3794E7393F6ae479F591a2DfF074704A'
    const [visible, setVisible] = useState(false)
    const cliamNft = useGetNFT()
    const earn = useEarn(poolAddress)
    const nft = '0xE3C1d0C79953Ef48d2330950872Ba5fD88A29b02'
    const userWalletNft = useUserWalletNft()
    const userDepositNft = useUserDepositNft()
    const handle = useCallback(async()=>{
        if(!!account){
            setVisible(true)
            await cliamNft()
            setVisible(false)
        }
    },[account])
    const [walletNft,setWalletNft]= useState<number[]>([])

    const [depositsNft,setDepositsNft] = useState<number[]>([]) 
    const blockNumber = useBlockNumber()
    useEffect(()=>{
        if(!!account){
            userWalletNft(nft).then((arr)=>{
                setWalletNft(arr)
            })
            userDepositNft(poolAddress).then((arr)=>{
                setDepositsNft(arr)
            })
        }
    },[account,blockNumber])

    const [depositArr,setDepositArr] = useState<number[]>([]) 
    const [withdrawArr,seWithdrawArr] = useState<number[]>([]) 

    const depositOnChange = useCallback((checkedValues)=>{
        setDepositArr(checkedValues)
    },[])
    const withdrawOnChange = useCallback((checkedValues)=>{
        seWithdrawArr(checkedValues)
    },[])
    const doDeposit = useDeposit()
    const doWithDraw = useWithdraw()
    const getReward = useGetReward()
    const doApprove = useApprove()

    const depositHandle = useCallback(async ()=>{
        if(!!account){
            setVisible(true)
            await doDeposit(poolAddress,depositArr)
            setVisible(false)
        }
    },[account,depositArr])

    const withdrawHandle = useCallback(async ()=>{
        if(!!account){
            setVisible(true)
            await doWithDraw(poolAddress,withdrawArr,depositsNft)
            setVisible(false)
        }
    },[account,withdrawArr,depositsNft])

    const harvestHandle = useCallback(async ()=>{
        if(!!account){
            setVisible(true)
            await getReward(poolAddress)
            setVisible(false)
        }
    },[account])

    const approveHandle = useCallback(async ()=>{
        if(!!account){
            setVisible(true)
            await doApprove(nft,poolAddress)
            setVisible(false)
        }
    },[account])

	return (
        <>
            <Mask visible={visible} onMaskClick={() => setVisible(false)}>
                <div className='overlayContent'>Loading...</div>
            </Mask>
            <p>{ StrBreviary(account) }</p>
            <div className="piece">
                <button className="cliam" onClick={handle}>领取nft</button>
            </div>

            <div className="piece">
                <p>收益：{earn} TOKEN</p>
                <button className="cliam" onClick={harvestHandle} >Harvest</button>
            </div>

            <div className="piece">
                <div className="nftSelect">
                    <span>拥有的nft</span>
                    <Checkbox.Group style={{ width: '100%' }} onChange={depositOnChange}>
                        <Row>
                            {walletNft.map((item,key)=>(
                                item != 0?<Col span={8} key={key} style={{display:'inline-block',marginRight:'10px'}}>
                                    <Checkbox value={item} > # {item}</Checkbox>
                                </Col>:''
                            ))}
                        </Row>
                    </Checkbox.Group>
                </div>
                <div className="nftSelect">
                    <span>投入的nft</span>
                    <Checkbox.Group style={{ width: '100%' }} onChange={withdrawOnChange}>
                        <Row>
                            {depositsNft.map((item,key)=>(
                                item != 0?<Col span={8} key={key} style={{display:'inline-block',marginRight:'10px'}}>
                                    <Checkbox value={item} > # {item}</Checkbox>
                                </Col>:''
                            ))}
                        </Row>
                    </Checkbox.Group>
                </div>
                <button className="cliam" onClick={approveHandle}>approve</button> <button className="cliam" onClick={depositHandle}>Deposits</button> <button className="cliam" onClick={withdrawHandle} >Withdraw</button>
            </div>
            
        </>	
	);
}