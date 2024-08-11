import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear } from "store/draggedItemSlice";
import { setIsClick } from "store/isClickOnAppointmentSlice";
import { INoteData } from "interfaces/INoteData";
import { setIsOn, setLeft, setTop } from "store/menuContextSlice";

export default function useViewModel({note, newHeight, newTop, opacity = 1} : {note :INoteData, newHeight: number, newTop: number, opacity?: number}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const {offsetHeight, offsetWidth} = useSelector((state: any) => state.menuContext);
    
    useEffect(() => {
        if (itemRef.current) {
            itemRef.current.style.top = `${newTop}px`;
            itemRef.current.style.height = `${newHeight}px`;
        }
    }, [note, newHeight, newTop, itemRef])

    // 240 px = 60 min
    // 1px = 0.25 min
    // 4px = 1 min

    const handleDragStart = useCallback(() => {
        dispatch(setIsClick(true));

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
    }, [dispatch, note, newHeight, newTop])

    const handleOnClick = useCallback(() => {
        dispatch(setIsClick(true));

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
        dispatch(setIsClick(true));
        (document.getElementById('appointmentModal') as any).showModal()
    }, [dispatch, note, newHeight, newTop])

    const handleMouseDown = useCallback(() => {
        dispatch(setIsClick(true));
    }, [dispatch])

    const handleOnContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
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

        // Determine position for the menu
        let posX = e.pageX;
        let posY = e.pageY;

        // Check if the menu goes beyond the right edge of the window
        if (posX + offsetWidth > window.innerWidth) {
            posX = window.innerWidth - offsetWidth;
        }

        // Check if the menu goes beyond the bottom edge of the window
        if (posY + offsetHeight > window.innerHeight) {
            posY = window.innerHeight - offsetHeight;
        }

        dispatch(setLeft(posX));
        dispatch(setTop(posY));

        dispatch(setIsOn(true));
    }, [dispatch, note, newHeight, newTop, offsetHeight, offsetWidth])


    return { itemRef, handleDragStart, handleOnClick, handleMouseDown, handleOnContextMenu }
}