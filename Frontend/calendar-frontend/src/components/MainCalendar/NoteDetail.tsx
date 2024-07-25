import { useRef, useEffect } from "react";
import { INoteData } from "interfaces/INoteData";
import { useDispatch } from "react-redux";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop } from "store/draggedItemSlice";

export default function NoteDetail({note, newHeight, newTop, opacity = 1} : {note :INoteData, newHeight: number, newTop: number, opacity?: number}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.top = `${newTop}px`;
            itemRef.current.style.height = `${newHeight}px`;
        }
    }, [note])

    // 240 px = 60 min
    // 1px = 0.25 min
    // 4px = 1 min

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setId(note.id));
        dispatch(setTitle(note.title));
        dispatch(setStartHour(note.startHour));
        dispatch(setEndHour(note.endHour));
        dispatch(setStartMinute(note.startMinute));
        dispatch(setEndMinute(note.endMinute));
        dispatch(setNewHeight(newHeight));
        dispatch(setNewTop(newTop));
    }

    return (
        <>
            <div style={{opacity}} draggable={true} onDragStart={e => handleDragStart(e)} ref={itemRef} className={`bg-info text-info-content w-full rounded-md absolute flex flex-col flex-wrap gap-1 overflow-hidden`}>
                <span className="text-lg"> {note.title} </span>
                <span className="text-lg"> {note.startHour.toString().padStart(2, '0')}:{note.startMinute.toString().padStart(2, '0')} - {note.endHour.toString().padStart(2, '0')}:{note.endMinute.toString().padStart(2, '0')} </span>
            </div>
        </>
    )
}