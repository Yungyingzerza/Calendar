import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById"
import { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setIsClick } from "store/isClickOnAppointmentSlice"

export default function useViewModel() {
    const { id, title, startDay, endDay, startMonth, endMonth, startYear, endYear, startHour, endHour, startMinute, endMinute } = useSelector((state: any) => state.draggedItem)
    const [newTitle, setNewTitle] = useState(title)
    const [newStartDay, setNewStartDay] = useState(startDay)
    const [newEndDay, setNewEndDay] = useState(endDay)
    const [newStartMonth, setNewStartMonth] = useState(startMonth)
    const [newEndMonth, setNewEndMonth] = useState(endMonth)
    const [newStartYear, setNewStartYear] = useState(startYear)
    const [newEndYear, setNewEndYear] = useState(endYear)
    const [newStartHour, setNewStartHour] = useState(startHour)
    const [newEndHour, setNewEndHour] = useState(endHour)
    const [newStartMinute, setNewStartMinute] = useState(startMinute)
    const [newEndMinute, setNewEndMinute] = useState(endMinute)
    const [startDateError, setStartDateError] = useState(false)
    const [startTimeError, setStartTimeError] = useState(false)

    const { updateAppointments } = useUpdateAppointmentsById({id, title: newTitle, startHour: newStartHour, endHour: newEndHour, startMinute: newStartMinute, endMinute: newEndMinute, startDay: newStartDay, startMonth: newStartMonth, startYear: newStartYear, endDay: newEndDay, endMonth: newEndMonth, endYear: newEndYear});

    const dispatch = useDispatch();

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }, [])

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
        setNewStartDay(date.getDate())
        setNewStartMonth(date.getMonth())
        setNewStartYear(date.getFullYear())
    }, [])

    const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
        setNewEndDay(date.getDate())
        setNewEndMonth(date.getMonth())
        setNewEndYear(date.getFullYear())
    }, [])

    const handleStartTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const tempHour = e.target.value.split(":")[0]
        const tempMinute = e.target.value.split(":")[1]
        setNewStartHour(parseInt(tempHour))
        setNewStartMinute(parseInt(tempMinute))
    }, [])

    const handleEndTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const tempHour = e.target.value.split(":")[0]
        const tempMinute = e.target.value.split(":")[1]
        setNewEndHour(parseInt(tempHour))
        setNewEndMinute(parseInt(tempMinute))
    }, [])

    const handleSave = useCallback(() => {

        if(startDateError || startTimeError) {
            return;
        }

        updateAppointments();
        dispatch(setIsClick(false));
        (document.getElementById("appointmentModal") as any).close();
    }, [startDateError, startTimeError, updateAppointments, dispatch])

    const handleCloseModal = useCallback(() => {
        dispatch(setIsClick(false));
        (document.getElementById("appointmentModal") as any).close();
    }, [dispatch])

    useEffect(() => {
        setNewTitle(title)
        setNewStartDay(startDay)
        setNewEndDay(endDay)
        setNewStartMonth(startMonth)
        setNewEndMonth(endMonth)
        setNewStartYear(startYear)
        setNewEndYear(endYear)
        setNewStartHour(startHour)
        setNewEndHour(endHour)
        setNewStartMinute(startMinute)
        setNewEndMinute(endMinute)
    }, [title, startDay, endDay, startMonth, endMonth, startYear, endYear, startHour, endHour, startMinute, endMinute])

    useEffect(() => {
        if(newStartYear > newEndYear) {
            setStartDateError(true)
        } else if(newStartYear === newEndYear && newStartMonth > newEndMonth) {
            setStartDateError(true)
        } else if(newStartYear === newEndYear && newStartMonth === newEndMonth && newStartDay > newEndDay) {
            setStartDateError(true)
        } else {
            setStartDateError(false)
        }

        if(newStartYear === newEndYear && newStartMonth === newEndMonth && newStartDay === newEndDay && newStartHour > newEndHour) {
            setStartTimeError(true)
        } else if(newStartYear === newEndYear && newStartMonth === newEndMonth && newStartDay === newEndDay && newStartHour === newEndHour && newStartMinute >= newEndMinute) {
            setStartTimeError(true)
        } else {
            setStartTimeError(false)
        }


    }, [newStartDay, newEndDay, newStartMonth, newEndMonth, newStartYear, newEndYear, newStartHour, newEndHour, newStartMinute, newEndMinute])

    return {
        handleTitleChange,
        handleStartDateChange,
        handleEndDateChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleSave,
        newTitle,
        newStartDay,
        newEndDay,
        newStartMonth,
        newEndMonth,
        newStartYear,
        newEndYear,
        newStartHour,
        newEndHour,
        newStartMinute,
        newEndMinute,
        startDateError,
        startTimeError,
        startDay,
        handleCloseModal
    }
}