import useViewModel from "./useViewModel"

export default function AppointmentModal() {

    const { newTitle, newStartDay, newEndDay, newStartMonth, newEndMonth, newStartYear, newEndYear, newStartHour, newEndHour, newStartMinute, newEndMinute, startDateError, startTimeError, startDay, handleTitleChange, handleStartDateChange, handleEndDateChange, handleStartTimeChange, handleEndTimeChange, handleSave, handleCloseModal } = useViewModel()

    return (
        <>
            <dialog id="appointmentModal" className="modal">
                <div className="modal-box bg-opacity-50 backdrop-blur-md shadow-lg relative overflow-hidden">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={e => handleCloseModal()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
                </form>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative">
                        <h3 className="font-bold text-lg">{newTitle}</h3>
                        <div className="flex flex-col justify-center items-start gap-2 mt-5">
                            <div className="flex flex-row gap-2">
                                <span>Title:</span>
                                <input className="input input-xs input-ghost" onChange={e => handleTitleChange(e)} value={newTitle} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-2">
                                    <span>Start Date:</span>
                                    {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleStartDateChange(e)} type="date" value={`${newStartYear}-${(newStartMonth+1).toString().padStart(2, '0')}-${newStartDay.toString().padStart(2, '0')}`}></input>}
                                </div>
                                {startDateError && <span className="text-xs text-error">Invalid Start Date</span>}
                            </div>
                            
                            <div className="flex flex-row gap-2">
                                <span>End Date:</span>
                                {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleEndDateChange(e)} type="date" value={`${newEndYear}-${(newEndMonth+1).toString().padStart(2, '0')}-${newEndDay.toString().padStart(2, '0')}`}></input>}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-2">
                                    <span>Start Time:</span>
                                    {startDay !== 0 && <input className="input input-xs input-ghost" onChange={e=>handleStartTimeChange(e)} type="time" value={`${newStartHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`}></input>}
                                </div>
                                {startTimeError && <span className="text-xs text-error">Invalid Start Time (It must lower than End Time)</span>}
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