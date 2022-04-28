import React, { useCallback,useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Button } from 'antd'
import {StrBreviary} from '../../utils/tool'

import Pool from "../Pool"
import pools from '../../pool.json'
import useTotalEarn from "../../hooks/useTotalEarn"
import useTakeEarn from "../../hooks/useTakeEarn"




export default function Home() {

    const {account} = useWeb3React()
    const [status,setStatus] = useState(false)
    const totalEarn = useTotalEarn()
    const takeEarn = useTakeEarn()
    const HavestAll = useCallback(async ()=>{
        setStatus(true)
        await takeEarn()
        //console.log(123)
        setStatus(false)
    },[])




	return (
        <>  
            <div style={{ width:'50%' ,margin:'0 auto' }}>
            <div className="user-info">
                <h2 className="title">用户信息</h2>
                <div className="account">
                    <span>地址:</span>
                    <p>
                        {StrBreviary(account,9,9)}
                    </p>
                </div>

                <div>
                    <p>待领取总收益: {totalEarn} mos</p>
                    
                <div className="console-button">
                    <Button type="primary" loading={status} onClick={HavestAll}>领取收益</Button>
                </div>
                
                </div>
            </div>
            </div>

            {
                pools.map((item,key)=>(
                    <Pool poolInfo={item} key={key}/>
                ))
            }
            


        </>	
	);
}