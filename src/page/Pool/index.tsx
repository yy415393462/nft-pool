import React, { useCallback, useEffect, useState } from "react"
import useSceneInfo from "../../hooks/useSceneInfo"

export default function Pool({id}:{id:number}) {
    const info = useSceneInfo(id)
    return (<>
        <div className="scene">
            <h2 className="title">副本编号: {id}</h2>
            <p>副本产能: {info.capacity}</p>
            <p>副本总战力: {info.totalPower}</p>
            <p>最低品阶: {info.minGrade}</p>
            <p>你的总战力: {info.userPower}</p>
            <p>你的未提取金币: {info.userEarn}</p>
            <p>你的未提取矿石: {info.userEarn}</p>
            <p>你的战斗部署: {
                info.userDeploy.map((value)=>(
                    <span key={value}># {value}  </span>
                ))
            }</p>         
        </div>
    </>)
}