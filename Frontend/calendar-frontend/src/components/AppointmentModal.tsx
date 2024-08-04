import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function AppointmentModal() {
    const { id, title, startDay, endDay, startMonth, endMonth, startYear, endYear, startHour, endHour, startMinute, endMinute } = useSelector((state: any) => state.draggedItem)

    return (
        <>
            <dialog id="appointmentModal" className="modal">
                <div className="modal-box bg-opacity-50 backdrop-blur-sm shadow-lg relative overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative">
                        <h3 className="font-bold text-lg">{title}</h3>
                        <div className="flex flex-col justify-center items-start gap-2 mt-5">
                            <div className="flex flex-row gap-2">
                                <span>Title:</span>
                                <input className="input input-xs input-ghost" onChange={e => console.log(e)} value={title} />
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>Start Date:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>console.log(e)} type="date" value={`${startYear}-${(startMonth+1).toString().padStart(2, '0')}-${startDay.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>End Date:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>console.log(e)} type="date" value={`${endYear}-${(endMonth+1).toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>Start Time:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>console.log(e)} type="time" value={`${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-row gap-2">
                                <span>End Time:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>console.log(e)} type="time" value={`${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`}></input>}
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </dialog>
        </>
    )
}