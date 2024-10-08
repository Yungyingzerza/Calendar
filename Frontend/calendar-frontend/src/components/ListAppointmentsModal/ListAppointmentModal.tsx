import useViewModel from "./useViewModel"

export default function ListAppointmentModal() {

    const { handleCloseModal, appointments } = useViewModel()

    return (
        <>
            <dialog id="listAppointmentModal" className="modal">
                <div className="modal-box bg-opacity-50 backdrop-blur-md shadow-lg relative overflow-hidden">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={e => handleCloseModal()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
                    </form>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative flex flex-col overflow-y-scroll max-h-[500px]">
                        {appointments.length > 0 ?
                            <>
                                <h3 className="font-bold text-lg">Appointments</h3>
                                <div className="flex flex-col justify-center items-center gap-2 mt-5 ">
                                    {appointments.map((appoinment, index) => {

                                            let newHeight = (appoinment.endHour - appoinment.startHour) * 240 + (appoinment.endHour - appoinment.startHour) * 40 - (appoinment.startMinute * 4) + (appoinment.endMinute * 4);
                                            let newTop = appoinment.startMinute * 4;

                                            const dataOnClick = {
                                                draggedItem: {
                                                    id: appoinment.id,
                                                    title: appoinment.title,
                                                    startHour: appoinment.startHour,
                                                    endHour: appoinment.endHour,
                                                    startMinute: appoinment.startMinute,
                                                    endMinute: appoinment.endMinute,
                                                    startDay: appoinment.startDay,
                                                    endDay: appoinment.endDay,
                                                    startMonth: appoinment.startMonth,
                                                    endMonth: appoinment.endMonth,
                                                    startYear: appoinment.startYear,
                                                    endYear: appoinment.endYear,
                                                    newTop: newTop,
                                                    newHeight: newHeight
                                                }
                                            }
                                        return (
                                        <div key={appoinment.id}  className='flex items-center gap-2 w-full'>
                                            <button  className='btn btn-ghost w-full h-full justify-start flex-col'>

                                                <div>
                                                    <span className="text-lg text-secondary">{appoinment.title}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs">{appoinment.startDay}/{appoinment.startMonth + 1}/{appoinment.startYear}</span>
                                                    <span className="text-xs"> to </span>
                                                    <span className="text-xs">{appoinment.endDay}/{appoinment.endMonth + 1}/{appoinment.endYear}</span>
                                                </div>

                                                <div>
                                                    <span className="text-xs">{appoinment.startHour.toString().padStart(2, '0')}:{appoinment.startMinute.toString().padStart(2, '0')}</span>
                                                    <span className="text-xs"> to </span>
                                                    <span className="text-xs">{appoinment.endHour.toString().padStart(2, '0')}:{appoinment.endMinute.toString().padStart(2, '0')}</span>
                                                </div>
                                            </button>
                                        </div>
                                    )})}
                                </div>
                            </>
                            :
                            <h3 className="font-bold text-lg">No Appointments</h3>
                        }
                    </div>

                </div>
            </dialog>
        </>
    )
}