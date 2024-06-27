import React, { useEffect, useState } from 'react';
import { IMiniCalendar } from 'interfaces/IMiniCalendar';
import { ICalendarSlice } from 'interfaces/ICalendarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDay, setSelectedMonth, setSelectedYear } from 'store/calendarSlice';

export default function MiniCalendar() {
    const [today, setToday] = useState<Date>(new Date())
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(new Date())
    const [lastDayOfMonth, setLastDayOfMonth] = useState<Date>(new Date())
    const [fullCalendar, setFullCalendar] = useState<IMiniCalendar[]>([])

    const {selectedDay, selectedMonth, selectedYear} = useSelector((state: ICalendarSlice) => state.calendar)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedDay(today.getDate()))
        dispatch(setSelectedMonth(today.getMonth()))
        dispatch(setSelectedYear(today.getFullYear()))

        //clean up
        return () => {
            dispatch(setSelectedDay(0))
            dispatch(setSelectedMonth(0))
            dispatch(setSelectedYear(0))
        }
    }, [])

    const getDayOfWeek = (date: Date) => {
        return date.getDay()
    }

    const getNameOfMonth = (date: Date) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return monthNames[date.getMonth()]
    }

    const getNameOfDay = (date: Date) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return dayNames[date.getDay()]
    }

    const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const handleDayClick = (day: number) => {
        dispatch(setSelectedDay(day))
        dispatch(setSelectedMonth(currentDate.getMonth()))
        dispatch(setSelectedYear(currentDate.getFullYear()))
    }

    useEffect(() => {

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        setFirstDayOfMonth(firstDay)
        setLastDayOfMonth(lastDay)

        let shift = getDayOfWeek(firstDay)

        for (let i = 0; i < shift; i++) {
            setFullCalendar(prev => [...prev, { day: 0, month: 0, year:0, isToday: false }])
        }

        //increment the firstDay by 1 until the last day of the month
        while (firstDay <= lastDay) {
            const day = firstDay.getDate()
            const month = firstDay.getMonth()
            const year = firstDay.getFullYear()

            //check if the day is today
            const isToday = firstDay.toDateString() === today.toDateString()

            setFullCalendar(prev => [...prev, { day, month, year, isToday }])
            firstDay.setDate(firstDay.getDate() + 1)
        }

        //clean up
        return () => {
            setFullCalendar([])
        }

    }, [currentDate])

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        setCurrentDate(nextMonth)
    }

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        setCurrentDate(prevMonth)
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(e.target.value)

        //check if the year is valid
        if (year < 0 || isNaN(year) || year > 270000) return

        const newDate = new Date(year, currentDate.getMonth(), 1)
        setCurrentDate(newDate)
    }
    return (
        <>
            <div className='flex flex-col p-5 bg-base-200 bg-opacity-10 backdrop-blur-2xl rounded-lg  shadow-lg h-screen'>
                {/* header  */}
                <header className='flex flex-row justify-center items-center'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <button onClick={() => handlePrevMonth()} className="join-item btn btn-ghost text-xl font-bold">«</button>
                        <h1 className='text-2xl font-bold'>{getNameOfMonth(currentDate)}</h1>
                        <input type='number' onChange={(e) => handleYearChange(e)} defaultValue={currentDate.getFullYear()} className='input text-2xl font-bold w-24 bg-transparent' />
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
                                {dateDetail.day != 0 &&
                                    // if the day is today, then render the day with a different style
                                    <button onClick={() => handleDayClick(dateDetail.day)} className={`text-sm w-full btn btn-ghost ${dateDetail.isToday && 'text-warning font-extrabold'}`}>
                                        {/* if today render with diff style */}
                                        {dateDetail.isToday ? <div className=" gap-2"> {dateDetail.day} Today</div> 
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
            </div>
        </>
    )
}