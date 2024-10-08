import useViewModel from "./useViewModel";
import { INoteData } from "interfaces/INoteData";

export default function AppointmentCard({note, newHeight, newTop, opacity = 1} : {note :INoteData, newHeight: number, newTop: number, opacity?: number}) {
    const { itemRef, handleDragStart, handleOnClick, handleMouseDown, handleOnContextMenu } = useViewModel({note, newHeight, newTop, opacity});
    return (
        <>
            <div style={{opacity}} 
                onMouseDown={e => handleMouseDown(e)} 
                onClick={e => handleOnClick()}  
                draggable={true} 
                onDragStart={e => handleDragStart()} 
                ref={itemRef} 
                onContextMenu={e => handleOnContextMenu(e)}
                className={`bg-info text-info-content w-full rounded-md absolute flex flex-col flex-wrap gap-1 overflow-hidden hover:cursor-grab z-50`}>

                    <span className="text-sm lg:text-lg"> {note.title} </span>
                    <span className="text-xs lg:text-lg flex-1"> {note.startHour.toString().padStart(2, '0')}:{note.startMinute.toString().padStart(2, '0')} - {note.endHour.toString().padStart(2, '0')}:{note.endMinute.toString().padStart(2, '0')} </span>
            </div>
        </>
    )
}