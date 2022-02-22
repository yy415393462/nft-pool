export const StrBreviary = (str:any, star = 6, end = 4):string => {
    if (str === undefined) {
        return ''
    } else {
        if ([...str].length <= (star + end)) {
            return str
        } else {
            return str.substring(0, star) + '....' + str.substring([...str].length - end, [...str].length)
        }
    }
}

export const countDown = (str:any) => {
    var nowtime = new Date(),  //获取当前时间
        endtime = new Date(str);  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数
    leftd = Number(leftd *24) + Number(lefth);
    return leftd  + ":" + (Number(leftm) > 9 ? leftm : "0" + leftm) + ":" + (Number(lefts) > 9 ? lefts : "0" + lefts);  //返回倒计时的字符串
}

export const isPc = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}