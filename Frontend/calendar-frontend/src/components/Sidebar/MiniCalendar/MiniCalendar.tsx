import useViewModel from "./useViewModel"

export default function MiniCalendar() {
    const { Days, getNameOfMonth, fullCalendar, handleDayClick, handleNextMonth, handlePrevMonth, handleYearChange, selectedDay, selectedMonth, selectedYear, currentDisplayMonth, currentDisplayYear } = useViewModel();
    return (
        <>
            {/* header  */}
            <header className='flex flex-row justify-center items-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <button onClick={() => handlePrevMonth()} className="join-item btn btn-ghost text-xl font-bold">«</button>
                    <h1 className='text-2xl font-bold'>{getNameOfMonth(currentDisplayMonth)}</h1>
                    <input type='number' onChange={(e) => handleYearChange(e)} value={currentDisplayYear} className='input text-2xl font-bold w-24 bg-transparent' />
                    <button onClick={() => handleNextMonth()} className="join-item btn btn-ghost text-xl font-bold">»</button>
                </div>
            </header>

            <main>
                {/* Title of Day */}
                <header className='flex flex-row justify-center items-center'>
                    {Days.map((day, index) => (
                        <div key={index} className='w-full text-center'>
                            <h1 className="text-sm font-light">{day}</h1>
                        </div>
                    ))}
                </header>

                {/* Calendar */}
                <div className='grid grid-cols-7 gap-1'>
                    {fullCalendar.map((dateDetail, index) => (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            {/* if the day is not 0, then render the day */}
                            {dateDetail.day !== 0 &&
                                // if the day is today, then render the day with a different style
                                <button onClick={() => handleDayClick(dateDetail.day)} className={`text-sm w-full btn btn-ghost ${dateDetail.isToday && 'text-warning font-extrabold'}`}>
                                    {/* if today render with diff style */}
                                    {dateDetail.isToday ? <div className=" gap-2"> {dateDetail.day}</div>
                                        :
                                        // check if the day is the selected day
                                        dateDetail.day === selectedDay && dateDetail.month === selectedMonth && dateDetail.year === selectedYear ?
                                            <div className="badge badge-error gap-2"> {dateDetail.day} </div>
                                            :
                                            dateDetail.day
                                    }
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}