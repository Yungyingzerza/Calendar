import useViewModel from "./useViewModel";
import { INoteData } from "interfaces/INoteData";

export default function AppointmentCard({note, newHeight, newTop, opacity = 1} : {note :INoteData, newHeight: number, newTop: number, opacity?: number}) {
    const { itemRef, handleDragStart } = useViewModel({note, newHeight, newTop, opacity});
    return (
        <>
            <div style={{opacity}} draggable={true} onDragStart={e => handleDragStart(e)} ref={itemRef} className={`bg-info text-info-content w-full rounded-md absolute flex flex-col flex-wrap gap-1 overflow-hidden hover:cursor-pointer`}>
                <span className="text-sm lg:text-lg"> {note.title} </span>
                <span className="text-xs lg:text-lg"> {note.startHour.toString().padStart(2, '0')}:{note.startMinute.toString().padStart(2, '0')} - {note.endHour.toString().padStart(2, '0')}:{note.endMinute.toString().padStart(2, '0')} </span>
            </div>
        </>
    )
}