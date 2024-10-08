import { useCallback, useEffect, useMemo, useState } from 'react';
import { IMiniCalendar } from 'interfaces/IMiniCalendar';
import { ICalendarSlice } from 'interfaces/ICalendarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDay, setSelectedMonth, setSelectedYear, setCurrentDisplayMonth, setCurrentDisplayYear } from 'store/calendarSlice';
import { useGetAppointmentsDate } from 'hooks/useGetAppointmentsDate';
import { useGetAppointmentsWeek } from 'hooks/useGetAppointmentsWeek';
import { INoteListSlice } from 'interfaces/INoteList';

export default function useViewModel(props: { isYear?: boolean, monthIndex?: number }) {
    const dispatch = useDispatch();
    const { selectedDay, selectedMonth, selectedYear, currentDisplayMonth, currentDisplayYear } = useSelector((state: ICalendarSlice) => state.calendar)
    const appointments = useSelector((state: INoteListSlice) => state.noteList);
    const [today, setToday] = useState<Date>(new Date())
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const setFirstDayOfMonth = useState<Date>(new Date())[1]
    const setLastDayOfMonth = useState<Date>(new Date())[1]
    const [fullCalendar, setFullCalendar] = useState<IMiniCalendar[]>([])
    const [waitTime, setWaitTime] = useState<number>(0)
    
    //it will fetch only if the location is /day
    useGetAppointmentsDate(selectedDay, selectedMonth, selectedYear);
    //it will fetch only if the location is /week
    useGetAppointmentsWeek(selectedDay, selectedMonth, selectedYear);


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

    const getDayOfWeek = useCallback((date: Date) => {
        return date.getDay()
    }, [])

    const getNameOfMonth = useCallback((month: number) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return monthNames[month]
    }, [])

    const Days = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], [])

    const handleDayClick = useCallback((day: number) => {
        dispatch(setSelectedDay(day))
        dispatch(setSelectedMonth(currentDate.getMonth()))
        dispatch(setSelectedYear(currentDate.getFullYear()))
    }, [dispatch, currentDate])

    const handleDayClickForYear = useCallback((day: number, month : number, year: number) => {
        dispatch(setSelectedDay(day))
        dispatch(setSelectedMonth(month))
        dispatch(setSelectedYear(year));

        (document.getElementById('listAppointmentModal') as any).showModal();
    }, [dispatch])

    useEffect(() => {

        if(props.isYear && props.monthIndex !== undefined){
            const firstDay = new Date(selectedYear, props.monthIndex, 1)
            const lastDay = new Date(selectedYear, props.monthIndex + 1, 0)
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
        }else{
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
        }



        //clean up
        return () => {
            setFullCalendar([])
        }
// eslint-disable-next-line
    }, [currentDate, today, props.isYear, props.monthIndex, selectedYear, selectedMonth])

    const handleNextMonth = useCallback(() => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        setCurrentDate(nextMonth)
        dispatch(setCurrentDisplayMonth(nextMonth.getMonth()))
        dispatch(setCurrentDisplayYear(nextMonth.getFullYear()))
    }, [currentDate, dispatch])

    const handlePrevMonth = useCallback(() => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        setCurrentDate(prevMonth)
        dispatch(setCurrentDisplayMonth(prevMonth.getMonth()))
        dispatch(setCurrentDisplayYear(prevMonth.getFullYear()))
    }, [currentDate, dispatch])

    const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(e.target.value)

        //check if the year is valid
        if (year < 0 || isNaN(year) || year > 270000) return

        const newDate = new Date(year, currentDate.getMonth(), 1)
        setCurrentDate(newDate)
        dispatch(setCurrentDisplayMonth(newDate.getMonth()))
        dispatch(setCurrentDisplayYear(newDate.getFullYear()))
    }, [currentDate, dispatch])

    const hasAppointmentOnDay = useCallback((day: string) => {
        // Convert the day to a Date object (assuming `day` is in the format "YYYY-MM-DD")
        const currentDay = new Date(day);
    
        // Loop through all appointments
        for (const appointment of appointments) {
            // Convert the start and end times of the appointment to Date objects
            
            const startDate = new Date(appointment.startYear, appointment.startMonth, appointment.startDay);
            const endDate = new Date(appointment.endYear, appointment.endMonth, appointment.endDay);
    
            // Check if the current day is between the start and end dates (inclusive)
            if (currentDay >= startDate && currentDay <= endDate) {
                return true; // Appointment found on this day
            }
        }
        return false; // No appointment on this day
    }, [appointments]);
    

    return{
        Days,
        getNameOfMonth,
        fullCalendar,
        handleDayClick,
        handleNextMonth,
        handlePrevMonth,
        handleYearChange,
        selectedDay,
        selectedMonth,
        selectedYear,
        currentDisplayMonth,
        currentDisplayYear,
        hasAppointmentOnDay,
        handleDayClickForYear
    }
}