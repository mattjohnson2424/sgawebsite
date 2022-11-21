import Day from "./Day"

export const Month = ({ month }) => {
    return (
        <div className="month">
            {month.map((week, weekIndex) => (
                <div className="week" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                        <Day day={day} key={dayIndex} weekIndex={weekIndex}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Month