import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateNote } from "store/noteList/action"

export default function AppointmentModal() {
    const { id, title, startDay, endDay, startMonth, endMonth, startYear, endYear, startHour, endHour, startMinute, endMinute } = useSelector((state: any) => state.draggedItem)
    const dispatch = useDispatch()

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

    const { updateAppointments } = useUpdateAppointmentsById({id, title: newTitle, startHour: newStartHour, endHour: newEndHour, startMinute: newStartMinute, endMinute: newEndMinute, startDay: newStartDay, startMonth: newStartMonth, startYear: newStartYear, endDay: newEndDay, endMonth: newEndMonth, endYear: newEndYear});

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
        setNewStartDay(date.getDate())
        setNewStartMonth(date.getMonth())
        setNewStartYear(date.getFullYear())
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value)
        setNewEndDay(date.getDate())
        setNewEndMonth(date.getMonth())
        setNewEndYear(date.getFullYear())
    }

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempHour = e.target.value.split(":")[0]
        const tempMinute = e.target.value.split(":")[1]
        setNewStartHour(parseInt(tempHour))
        setNewStartMinute(parseInt(tempMinute))
    }

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempHour = e.target.value.split(":")[0]
        const tempMinute = e.target.value.split(":")[1]
        setNewEndHour(parseInt(tempHour))
        setNewEndMinute(parseInt(tempMinute))
    }

    const handleSave = () => {
        updateAppointments();
        (document.getElementById("appointmentModal") as any).close();
    }

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

    return (
        <>
            <dialog id="appointmentModal" className="modal">
                <div className="modal-box bg-opacity-50 backdrop-blur-md shadow-lg relative overflow-hidden">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
                </form>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative">
                        <h3 className="font-bold text-lg">{newTitle}</h3>
                        <div className="flex flex-col justify-center items-start gap-2 mt-5">
                            <div className="flex flex-row gap-2">
                                <span>Title:</span>
                                <input className="input input-xs input-ghost" onChange={e => handleTitleChange(e)} value={newTitle} />
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>Start Date:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleStartDateChange(e)} type="date" value={`${newStartYear}-${(newStartMonth+1).toString().padStart(2, '0')}-${newStartDay.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>End Date:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleEndDateChange(e)} type="date" value={`${newEndYear}-${(newEndMonth+1).toString().padStart(2, '0')}-${newEndDay.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>Start Time:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleStartTimeChange(e)} type="time" value={`${newStartHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>End Time:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleEndTimeChange(e)} type="time" value={`${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`}></input>}
                            </div>
                        </div>
                        <div className="modal-action">
                            <button onClick={e => handleSave()} className="btn btn-success">Save</button>
                        </div>
                    </div>
                    
                </div>
            </dialog>
        </>
    )
}