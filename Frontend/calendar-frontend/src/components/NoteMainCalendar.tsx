import { useSelector } from "react-redux"
import { ICalendarSlice } from "interfaces/ICalendarSlice"
import { INoteData } from "interfaces/INoteData";
import { useRef, useEffect, useState } from "react";
export default function NoteMainCalendar({ hour, data }: { hour: number, data: INoteData[]}) {
    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar);
    let height = 0;
    let top = 0;
    const item = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (item.current) {
            item.current.style.top = `${top}px`;
            item.current.style.height = `${height}px`;
        }
    }, [item])

    // 240 px = 60 min
    // 1px = 0.25 min
    // 4px = 1 min

    return (
        <>
            <div className="flex flex-row items-start w-full p-2 h-[240px] gap-6">
                <div className="flex flex-row items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                    <div className="text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                </div>

                <div className="flex flex-col relative w-full">

                    {/* note list */}
                    {data.map((note, index) => {
                        if (note.startHour === hour) {
                            height = (note.endHour - note.startHour) * 240 + (note.endHour - note.startHour) * 40 - (note.startMinute * 4) + (note.endMinute * 4);
                            top = note.startMinute * 4;
                            return (
                                <div ref={item} key={index} className={`bg-info text-info-content w-full rounded-md relative flex flex-col flex-wrap gap-1 overflow-hidden`}>
                                    <span className="text-lg"> {note.title} </span>
                                    <span className="text-lg"> {note.startHour.toString().padStart(2, '0')}:{note.startMinute.toString().padStart(2, '0')} - {note.endHour.toString().padStart(2, '0')}:{note.endMinute.toString().padStart(2, '0')} </span>
                                </div>
                            )

                        }
                        return null;
                    })}

                    {/* <div className="h-[60px] bg-info text-info-content w-full rounded-md relative top-0 flex flex-col flex-wrap gap-1 overflow-hidden">
                        <span className="text-lg"></span>
                        <span className="text-lg"></span>
                    </div> */}

                </div>

            </div>
        </>
    )
}