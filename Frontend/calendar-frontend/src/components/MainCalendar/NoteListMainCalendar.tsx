import { useSelector } from "react-redux"
import { ICalendarSlice } from "interfaces/ICalendarSlice"
import { INoteData } from "interfaces/INoteData";
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import NoteDetail from "./NoteDetail";
import { useEffect, useState } from "react";

export default function NoteListMainCalendar({ hour, data }: { hour: number, data: INoteData[]}) {
    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar);
    const { newHeight, newTop, id, endHour, endMinute, startHour, startMinute, title } = useSelector((state: IDraggedItem) => state.draggedItem);

    const [tempDraggedItem, setTempDraggedItem] = useState<IDraggedItem>({
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
    });


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


    return (
        <>
            <div className="flex flex-row items-start w-full p-2 h-[240px] gap-6" 
                onDragOver={e=>handleDragOver(e)}
                onDragLeave={e=>handleDragLeave(e)}
                >
                <div className="flex flex-row items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                    <div className="text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                </div>

                <div className="flex flex-col relative w-full">

                    {/* note list */}
                    {data.map((note, index) => {
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
                    {(tempDraggedItem) && (
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