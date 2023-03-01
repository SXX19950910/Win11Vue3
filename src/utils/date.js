import { calendar } from 'js-calendar-converter'
import moment from 'moment'


const checkIsToday = (date) => {
    console.log(moment().format('YYYY-M-D'), date)
    return moment().format('YYYY-M-D') === date
}
export function initMonthCalendar(dates, line = 6) {
    const date = new Date(dates)                         // 初始时间格式
    const y = date.getFullYear()
    const m = date.getMonth()
    const days = new Date(y, m + 1, 0).getDate()          // 获取这个月共有多少天
    const firstDayWeek = new Date(y, m, 1).getDay()       // 月份第一天星期几
    const arr = []     // 存储日历格式的数组
    let n = []       // 日历格式中的一行
    let d = 1        // 日历格式中的天数

    // 先根据这个月第一天排星期几
    // 把上个月剩下几天留在这个月的'奸细'放在最前头
    for (let i = 0; i < (firstDayWeek - 1); i++) {
        const d = new Date(y, m, 0 - i).getDate()
        const isToday = checkIsToday(`${y}-${m}-${d}`)
        const nl = calendar.solar2lunar(y, m, d)
        const obj = {
            day: d,
            nDay: nl.IDayCn,
            today: isToday,
            disabled: true
        }
        n.unshift(obj)
    }

    // 一星期占一行，一行一个外循环
    // 这里我默认想要6行
    for (let j = 0; j < line; j++) {
        // 一天占一个格子，最多一星期7个格子
        // 这里我想要7个格子
        for (let i = 0; i < 7; i++) {
            if (d > days) {
                const day = new Date(y, m, d++).getDate()
                const nl = calendar.solar2lunar(y, m + 2, day)
                const obj = {
                    day,
                    today: checkIsToday(`${y}-${m + 2}-${day}`),
                    nDay: nl.IDayCn,
                    disabled: true
                }
                n.push(obj)
            } else {
                const isToday = checkIsToday(`${y}-${m + 1}-${d}`)
                const nl = calendar.solar2lunar(y, m + 1, d)
                const obj = {
                    day: d++,
                    today: isToday,
                    nDay: nl.IDayCn,
                    disabled: false
                }
                n.push(obj)
            }
            if (n.length === 7) break    // 放了7个格子该结束了
        }
        arr.push(n)
        n = []   // 这一行放完了，清空ba
    }

    return arr
}