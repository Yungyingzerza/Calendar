import { useSelector, useDispatch } from "react-redux"
import { ICalendarSlice } from "interfaces/ICalendarSlice"
import { INoteData } from "interfaces/INoteData";
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import { INoteListSlice } from "interfaces/INoteList";
import { useEffect, useState } from "react";
import { addNote, deleteNote, fetchNotes } from "store/noteList/action";
import NoteDetail from "./NoteDetail";

export default function NoteListMainCalendar({ hour}: { hour: number}) {
    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar);
    const { newHeight, newTop, id, endHour, endMinute, startHour, startMinute, title } = useSelector((state: IDraggedItem) => state.draggedItem);

    const [tempDraggedItem, setTempDraggedItem] = useState<IDraggedItem>({
        draggedItem: {
            id: -1,
            title: '',
            startHour: 0,
            endHour: 0,
            startMinute: 0,
            endMinute: 0,
            newHeight: 0,
            newTop: 0
        }
    });

    const dispatch = useDispatch();
    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    const mockData = [
        {
            id: 1,
            title: 'Meeting with team',
            startHour: 10,
            endHour: 10,
            startMinute: 0,
            endMinute: 30
        },
        {
            id: 2,
            title: 'Meeting with team',
            startHour: 10,
            endHour: 13,
            startMinute: 20,
            endMinute: 0
        },
        {
            id: 3,
            title: 'Meeting with team',
            startHour: 14,
            endHour: 18,
            startMinute: 0,
            endMinute: 0
        }
    ]

    useEffect(() => {
        dispatch(fetchNotes(mockData));
    }, [])



    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const tempStartHour = hour;
        let tempEndHour = endHour;
        

        if(startHour > hour){
            tempEndHour -= startHour - hour;

        }else{
            tempEndHour += hour - startHour;
        }

        let tempNewHeight = (tempEndHour - tempStartHour) * 240 + (tempEndHour - tempStartHour) * 40 - (startMinute * 4) + (endMinute * 4);

        setTempDraggedItem({
            draggedItem: {
                id: id,
                title: title,
                startHour: tempStartHour,
                endHour: tempEndHour,
                startMinute: startMinute,
                endMinute: endMinute,
                newHeight: tempNewHeight,
                newTop: newTop
        }});
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTempDraggedItem({
            draggedItem: {
                id: 0,
                title: '',
                startHour: 0,
                endHour: 0,
                startMinute: 0,
                endMinute: 0,
                newHeight: 0,
                newTop: 0
            }
        })
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(deleteNote({id: tempDraggedItem.draggedItem.id}));
        dispatch(addNote({...tempDraggedItem.draggedItem}));
        setTempDraggedItem({
            draggedItem: {
                id: 0,
                title: '',
                startHour: 0,
                endHour: 0,
                startMinute: 0,
                endMinute: 0,
                newHeight: 0,
                newTop: 0
            }
        })
    }

    return (
        <>
            <div className="flex flex-row items-start w-full p-2 h-[240px] gap-6" 
                onDragOver={e=>handleDragOver(e)}
                onDragLeave={e=>handleDragLeave(e)}
                onDrop={e=>handleDrop(e)}
                >
                <div className="flex flex-row items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                    <div className="text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                </div>

                <div className="flex flex-col relative w-full">

                    {/* note list */}
                    {noteList.map((note, index) => {
                        if (note.startHour === hour) {
                            let newHeight = (note.endHour - note.startHour) * 240 + (note.endHour - note.startHour) * 40 - (note.startMinute * 4) + (note.endMinute * 4);
                            let newTop = note.startMinute * 4;
                            return (
                                <NoteDetail key={index} note={note} newHeight={newHeight} newTop={newTop} />
                            )

                        }
                        return null;
                    })}

                    {/* dragged item */}
                    {(tempDraggedItem && tempDraggedItem.draggedItem.id!=-1) && (
                        <NoteDetail opacity={0.5} note={tempDraggedItem.draggedItem} newHeight={tempDraggedItem.draggedItem.newHeight} newTop={tempDraggedItem.draggedItem.newTop} />
                    )}

                    {/* <div className="h-[60px] bg-info text-info-content w-full rounded-md relative top-0 flex flex-col flex-wrap gap-1 overflow-hidden">
                        <span className="text-lg"></span>
                        <span className="text-lg"></span>
                    </div> */}

                </div>

            </div>
        </>
    )
}