export default {
    //时间段之间相差多少天（自然日）
    differenceDay(sDate1, sDate2){
        let dateSpan,tempDate,iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = Math.abs(sDate2 - sDate1);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
    },
    //当前时间的前一天
    preDay(timestamp){
        let curDate = new Date();
        let r = new Date(curDate.getTime() - 24*60*60*1000);
        if(timestamp===true){
            return r.getTime();
        }else{
            return r;
        }
    },
    //格式化函数
    timeFormat (_time, pattern) {
        let date = new Date(Date.parse(_time));
        let time = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in time) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? time[k] : ("00" + time[k]).substr(("" + time[k]).length));
            }
        }
        return pattern;
    },
}