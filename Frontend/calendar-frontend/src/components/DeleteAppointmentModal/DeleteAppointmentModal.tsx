import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useViewModel from './useViewModel';
export default function DeleteAppointmentModal() {

    const { title, startHour, startMinute, endHour, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear, handleDelete } = useViewModel();

    return (
        <>
            <dialog id="deleteAppointmentModal" className="modal">
                <div className="modal-box bg-opacity-50 backdrop-blur-md shadow-lg relative overflow-hidden">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={e => e} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">✕</button>
                </form>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative">
                        <h3 className="font-bold flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faTrash} size={"sm"} className="text-error"/>
                            Are you sure you want to delete this appointment?
                        </h3>
                        <div className="flex flex-col justify-center items-start gap-2 mt-5">
                            {/* ul as bullet */}
                            <ul className="list-disc list-inside">
                                <li><span className='font-bold'>Title: </span><span className='text-warning'>{title}</span></li>
                                <li><span className='font-bold'>Time: </span><span className='text-warning'>{startHour.toString().padStart(2, '0')}:{startMinute.toString().padStart(2, '0')} - {endHour.toString().padStart(2, '0')}:{endMinute.toString().padStart(2, '0')}</span></li>
                                <li><span className='font-bold'>Delete: </span><span className='text-warning'>{startDay.toString().padStart(2, '0')}/{startMonth.toString().padStart(2, '0')}/{startYear} - {endDay.toString().padStart(2, '0')}/{endMonth.toString().padStart(2, '0')}/{endYear}</span></li>
                            </ul>
                        </div>
                        <div className="modal-action">
                            <button onClick={e => handleDelete()} className="btn btn-error">Delete</button>
                        </div>
                    </div>
                    
                </div>
            </dialog>
        </>
    )
}