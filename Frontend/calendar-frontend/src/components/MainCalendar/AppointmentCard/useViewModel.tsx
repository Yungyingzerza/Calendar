import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear } from "store/draggedItemSlice";
import { INoteData } from "interfaces/INoteData";

export default function useViewModel({note, newHeight, newTop, opacity = 1} : {note :INoteData, newHeight: number, newTop: number, opacity?: number}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.top = `${newTop}px`;
            itemRef.current.style.height = `${newHeight}px`;
        }
        // eslint-disable-next-line
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
        dispatch(setStartDay(note.startDay));
        dispatch(setEndDay(note.endDay));
        dispatch(setStartMonth(note.startMonth));
        dispatch(setEndMonth(note.endMonth));
        dispatch(setStartYear(note.startYear));
        dispatch(setEndYear(note.endYear));
    }


    return { itemRef, handleDragStart }
}