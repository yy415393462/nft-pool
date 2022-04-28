import { Button } from "antd"
import Search from "antd/lib/input/Search"
import { parseEther } from "ethers/lib/utils"
import React, { useCallback, useState } from "react"
import useApprove from "../../hooks/useApprove"
import useDeposit from "../../hooks/useDeposit"
import usePoolInfo from "../../hooks/usePoolInfo"
import useWithdraw from "../../hooks/useWithdraw"
import { poolInfo } from '../../utils/interface'

export default function Pool({poolInfo}:{poolInfo:poolInfo}) {
    const info = usePoolInfo(poolInfo)
    const doApprove = useApprove(info.token)
    const doDeposit = useDeposit()
    const doWithDraw = useWithdraw()
    const [status,setStatus] = useState(false)

    const approve = useCallback(async ()=>{
        setStatus(true)
        await doApprove()
        setStatus(false)
    },[info])

    const depoist = useCallback(async (e)=>{
        setStatus(true)
        await doDeposit(poolInfo.id,parseEther(e))
        setStatus(true)
    },[info])
    const withDraw = useCallback(async (e)=>{
        setStatus(true)
        await doWithDraw(poolInfo.id,parseEther(e))
        setStatus(true)
    },[info])

    return (<>
        <div className="pool">
            <h2 className="title">矿池编号: {info.id}</h2>
            <p>总投入: {info.totalSupply}</p>
            <p>本金: {info.supply}</p>
            <p>未领取收益: {info.reward}</p>
            <p>解锁时间: {info.unlockAt}</p>  
            <div className="console-button">
                <Button type="primary" loading={status} onClick={approve}>超量授权</Button>
            </div>
            <div className="console-button">  
                <Search type="number" 
                        placeholder="输入数量" 
                        enterButton="投入挖矿" 
                        size="large" 
                        onSearch={depoist}
                        loading={status}
                /> 
            </div>
            <div className="console-button">  
                <Search type="number" 
                        placeholder="输入数量" 
                        enterButton="赎回本金" 
                        size="large" 
                        onSearch={withDraw}
                        loading={status}
                /> 
            </div>     
        </div>
    </>)
}