import React, { useEffect, useState } from 'react';
import { IMiniCalendar } from 'interfaces/IMiniCalendar';
import { ICalendarSlice } from 'interfaces/ICalendarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDay, setSelectedMonth, setSelectedYear, setCurrentDisplayMonth, setCurrentDisplayYear } from 'store/calendarSlice';

export default function MiniCalendar() {
    const dispatch = useDispatch();
    
    const { selectedDay, selectedMonth, selectedYear, currentDisplayMonth, currentDisplayYear } = useSelector((state: ICalendarSlice) => state.calendar)
    const [today, setToday] = useState<Date>(new Date())
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const setFirstDayOfMonth = useState<Date>(new Date())[1]
    const setLastDayOfMonth = useState<Date>(new Date())[1]
    const [fullCalendar, setFullCalendar] = useState<IMiniCalendar[]>([])
    const [waitTime, setWaitTime] = useState<number>(0)

    useEffect(() => {
        const manualDate = new Date(currentDisplayYear, currentDisplayMonth, 1)

        setCurrentDate(manualDate)
    }, [currentDisplayMonth, currentDisplayYear])

    useEffect(() => {

        const tempDate = new Date();
        setWaitTime(60000 - tempDate.getSeconds() * 1000 - tempDate.getMilliseconds());
        setToday(tempDate)

        dispatch(setSelectedDay(today.getDate()))
        dispatch(setSelectedMonth(today.getMonth()))
        dispatch(setSelectedYear(today.getFullYear()))
        dispatch(setCurrentDisplayMonth(today.getMonth()))
        dispatch(setCurrentDisplayYear(today.getFullYear()))

        //clean up
        return () => {
            dispatch(setSelectedDay(0))
            dispatch(setSelectedMonth(0))
            dispatch(setSelectedYear(0))
            dispatch(setCurrentDisplayMonth(0))
            dispatch(setCurrentDisplayYear(0))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const tempDate = new Date();
            setWaitTime(60000 - tempDate.getSeconds() * 1000 - tempDate.getMilliseconds());
            setToday(tempDate)
        }, waitTime);

        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line
    }, [waitTime])

    useEffect(() => {
        setFullCalendar(prev => prev.map(date => {
            if(date.isToday && date.day !== today.getDate()) {
                return { ...date, isToday: false }
            }
            return date
        }))

        setFullCalendar(prev => prev.map(date => {
            if(date.day === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear()) {
                return { ...date, isToday: true }
            }
            return date
        }))
    }, [today])

    const getDayOfWeek = (date: Date) => {
        return date.getDay()
    }

    const getNameOfMonth = (month: number) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return monthNames[month]
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
            setFullCalendar(prev => [...prev, { day: 0, month: 0, year: 0, isToday: false }])
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
// eslint-disable-next-line
    }, [currentDate])

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        setCurrentDate(nextMonth)
        dispatch(setCurrentDisplayMonth(nextMonth.getMonth()))
        dispatch(setCurrentDisplayYear(nextMonth.getFullYear()))
    }

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        setCurrentDate(prevMonth)
        dispatch(setCurrentDisplayMonth(prevMonth.getMonth()))
        dispatch(setCurrentDisplayYear(prevMonth.getFullYear()))
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(e.target.value)

        //check if the year is valid
        if (year < 0 || isNaN(year) || year > 270000) return

        const newDate = new Date(year, currentDate.getMonth(), 1)
        setCurrentDate(newDate)
        dispatch(setCurrentDisplayMonth(newDate.getMonth()))
        dispatch(setCurrentDisplayYear(newDate.getFullYear()))
    }
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