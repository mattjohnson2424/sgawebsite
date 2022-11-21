export const months = [
    'january',
    'feburary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
]

export const getTimes = () => {
    const times = []

    for (let period = 0; period < 2; period++) {
        for (let hour = 0; hour <= 11; hour++) {
            for (let min = 0; min < 60; min += 30) {
                let stringHour;
                let stringMin;
                let periodString;
                if (hour.toString() === "0") {
                    stringHour = "12"
                } else {
                    stringHour = hour.toString()
                }
                if (min === 0) {
                    stringMin = "00"
                } else {
                    stringMin = min
                }
                if (period === 0) {
                    periodString = "am"
                } else {
                    periodString = "pm"
                }
                times.push(`${stringHour}:${stringMin}${periodString}`)
            }
        }
    }
    return times
}

export const getTimeDifference = (time1, time2) => { // format 3:15pm

    // getting individual values for hr 1
    let hour1 = parseInt(time1.split(":")[0]) + (parseInt(time1.split(":")[1].substring(0, 2)) / 60)
    if (hour1 === 12 && time1.split(":")[1].substring(2, time1.split(":")[1].length) === "am") {
        hour1 = 0
    } else if (hour1 === 12.5 && time1.split(":")[1].substring(2, time1.split(":")[1].length) === "am") {
        hour1 = 0.5
    } else if (hour1 === 12 && time1.split(":")[1].substring(2, time1.split(":")[1].length) === "pm") {
        hour1 = 12
    } else if (hour1 === 12.5 && time1.split(":")[1].substring(2, time1.split(":")[1].length) === "pm") {
        hour1 = 12.5
    } else if (time1.split(":")[1].substring(2, time1.split(":")[1].length) === "pm") {
        hour1 += 12
    }    

    // getting individual values for hr 2
    let hour2 = parseInt(time2.split(":")[0]) + (parseInt(time2.split(":")[1].substring(0, 2)) / 60)
    if (hour2 === 12 && time2.split(":")[1].substring(2, time2.split(":")[1].length) === "am") {
        hour2 = 0
    } else if (hour2 === 12.5 && time2.split(":")[1].substring(2, time2.split(":")[1].length) === "am") {
        hour2 = 0.5
    } else if (hour2 === 12 && time2.split(":")[1].substring(2, time2.split(":")[1].length) === "pm") {
        hour2 = 12
    } else if (hour2 === 12.5 && time2.split(":")[1].substring(2, time2.split(":")[1].length) === "pm") {
        hour2 = 12.5
    } else if (time2.split(":")[1].substring(2, time2.split(":")[1].length) === "pm") {
        hour2 += 12
    }  

    return hour2 - hour1
}
