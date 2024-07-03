import { useRef, useEffect } from "react";
import { INoteData } from "interfaces/INoteData";

export default function NoteDetail({note, newHeight, newTop} : {note :INoteData, newHeight: number, newTop: number}) {
    const itemRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.top = `${newTop}px`;
            itemRef.current.style.height = `${newHeight}px`;
        }
    }, [note])

    return (
        <>
            <div ref={itemRef} className={`bg-info text-info-content w-full rounded-md absolute flex flex-col flex-wrap gap-1 overflow-hidden`}>
                <span className="text-lg"> {note.title} </span>
                <span className="text-lg"> {note.startHour.toString().padStart(2, '0')}:{note.startMinute.toString().padStart(2, '0')} - {note.endHour.toString().padStart(2, '0')}:{note.endMinute.toString().padStart(2, '0')} </span>
            </div>
        </>
    )
}