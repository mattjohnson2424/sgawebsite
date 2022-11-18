import dayjs from "dayjs";

export const Day = ({ day, weekIndex }) => {

    const getCurrentDayClass = () => {
        return dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : ''
    }

    return (
        <div className="day">
            <header className="date-header">
                {weekIndex === 0 && <p className="date-day">{dayjs(day).format("ddd").toUpperCase()}</p> }
                
                <p className={`date-num ${getCurrentDayClass()}`}>
                    {dayjs(day).format("DD")}
                </p>
            </header>
        </div>
    )
}

export default Day