import { useSelector, useDispatch } from "react-redux"
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import { INoteListSlice } from "interfaces/INoteList";
import { useEffect, useState, useRef, useCallback } from "react";
import { addNote, deleteNote, updateNote } from "store/noteList/action";
import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear } from "store/draggedItemSlice";
import { setIsClick } from "store/isClickOnAppointmentSlice";
import { setIsOn, setLeft, setTop } from "store/menuContextSlice";

export default function useViewModel({ hour, propDate }: { hour: number, propDate?: Date }) {
    const { newTop, id, endHour, endMinute, startHour, startMinute, title, startDay, startMonth, startYear, endDay, endMonth, endYear, newHeight} = useSelector((state: IDraggedItem) => state.draggedItem);
    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    const {click} = useSelector((state: any) => state.isClickOnAppointment);
    const {offsetWidth, offsetHeight} = useSelector((state: any) => state.menuContext);
    const [date, setDate] = useState<Date>();

    const [tempDraggedItem, setTempDraggedItem] = useState<IDraggedItem>({
        draggedItem: {
            id: "-1",
            title: '',
            startHour: 0,
            endHour: 0,
            startMinute: 0,
            endMinute: 0,
            startDay: 0,
            endDay: 0,
            startMonth: 0,
            endMonth: 0,
            startYear: 0,
            endYear: 0,
            newHeight: 0,
            newTop: 0
        }
    });

    const [currentTime, setCurrentTime] = useState<{hour:number, minute: number}>({hour: 0, minute: 0});
    const currentTimeRef = useRef<HTMLDivElement>(null);
    const [indicatorMounted, setIndicatorMounted] = useState<boolean>(false);
    const [waitTime, setWaitTime] = useState<number>(0);

    const dispatch = useDispatch();

    const { updateAppointments } = useUpdateAppointmentsById(tempDraggedItem.draggedItem);

    useEffect(() => {

        if(propDate) setDate(propDate);

        const tempDate = new Date();
        setWaitTime(60000 - tempDate.getSeconds() * 1000 - tempDate.getMilliseconds());
        setCurrentTime({
            hour: tempDate.getHours(),
            minute: tempDate.getMinutes()
        })

    }, [propDate])

    useEffect(() => {
        const interval = setInterval(() => {
            const tempDate = new Date();
            setWaitTime(60000 - tempDate.getSeconds() * 1000 - tempDate.getMilliseconds());
            setCurrentTime({
                hour: tempDate.getHours(),
                minute: tempDate.getMinutes()
            })
        }, waitTime);

        return () => {
            clearInterval(interval);
        }
    }, [waitTime])

    useEffect(() => {
        if(currentTimeRef.current && indicatorMounted){
            currentTimeRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

        return () => {
            setIndicatorMounted(true);
        }

    }, [currentTimeRef, indicatorMounted])




    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if(click){
            const note = noteList.find((note) => note.id === "preview");

            if(note) dispatch(deleteNote({id: "preview"}));
        }

        const tempStartHour = hour;
        let tempEndHour = endHour;

        const isEndInSameDay = startDay === endDay && startMonth === endMonth && startYear === endYear;

        let tempStartDay : number = startDay;
        let tempEndDay : number = endDay;
        let tempStartMonth : number = startMonth;
        let tempEndMonth : number = endMonth;
        let tempStartYear : number = startYear;
        let tempEndYear : number = endYear;

        if(isEndInSameDay){
            tempStartDay = propDate?.getDate() || 0;
            tempEndDay = propDate?.getDate() || 0;
            tempStartMonth = propDate?.getMonth() || 0;
            tempEndMonth = propDate?.getMonth() || 0;
            tempStartYear = propDate?.getFullYear() || 0;
            tempEndYear = propDate?.getFullYear() || 0;
        }
        

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
                startDay: tempStartDay,
                endDay: tempEndDay,
                startMonth: tempStartMonth,
                endMonth: tempEndMonth,
                startYear: tempStartYear,
                endYear: tempEndYear,
                newHeight: tempNewHeight,
                newTop: newTop
        }});
    }, [hour, endHour, startHour, startMinute, endMinute, title, id, newTop, propDate, noteList, click, dispatch, endDay, endMonth, endYear, startDay, startMonth, startYear])

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTempDraggedItem({
            draggedItem: {
                id: "-1",
                title: '',
                startHour: 0,
                endHour: 0,
                startMinute: 0,
                endMinute: 0,
                startDay: 0,
                endDay: 0,
                startMonth: 0,
                endMonth: 0,
                startYear: 0,
                endYear: 0,
                newHeight: 0,
                newTop: 0
            }
        })
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        updateAppointments();
        dispatch(deleteNote({id: tempDraggedItem.draggedItem.id}));
        dispatch(addNote({...tempDraggedItem.draggedItem}));
        dispatch(setIsClick(false));
        setTempDraggedItem({
            draggedItem: {
                id: "-1",
                title: '',
                startHour: 0,
                endHour: 0,
                startMinute: 0,
                endMinute: 0,
                startDay: 0,
                endDay: 0,
                startMonth: 0,
                endMonth: 0,
                startYear: 0,
                endYear: 0,
                newHeight: 0,
                newTop: 0
            }
        })
    }, [tempDraggedItem, dispatch, updateAppointments])

    const handleOnClick = useCallback(({draggedItem} : IDraggedItem) => {
        const note = draggedItem;
        dispatch(setId(note.id));
        dispatch(setTitle(note.title));
        dispatch(setStartHour(note.startHour));
        dispatch(setEndHour(note.endHour));
        dispatch(setStartMinute(note.startMinute));
        dispatch(setEndMinute(note.endMinute));
        dispatch(setNewHeight(note.newHeight));
        dispatch(setNewTop(note.newTop));
        dispatch(setStartDay(note.startDay));
        dispatch(setEndDay(note.endDay));
        dispatch(setStartMonth(note.startMonth));
        dispatch(setEndMonth(note.endMonth));
        dispatch(setStartYear(note.startYear));
        dispatch(setEndYear(note.endYear));
        (document.getElementById('appointmentModal') as any).showModal()
    }, [dispatch])

    const handleOnMouseDown = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>, hour : number, day : number, month : number, year : number) => {
        if(click){
            const note = noteList.find((note) => note.id === "preview");
            if(!note) return;

                dispatch(deleteNote({id: "preview"}));

            return
        }

        if(e.button !== 0) return;

        let rect = e.currentTarget.getBoundingClientRect();
        let y = e.clientY - rect.top;
        const convertYToMinute = Math.ceil(y / 4);


        dispatch(addNote({
            id: "preview",
            title: "preview",
            startHour: hour,
            endHour: hour,
            startMinute: convertYToMinute,
            endMinute: convertYToMinute,
            startDay: day,
            endDay: day,
            startMonth: month,
            endMonth: month,
            startYear: year,
            endYear: year,
            newHeight: 0,
            newTop: 0,
            constHour: hour,
            constMinute: convertYToMinute
        }));
        
    }, [click, noteList, dispatch])

    const handleOnMouseMove = useCallback((e : React.MouseEvent<HTMLDivElement, MouseEvent>, hour : number) => {
        if(click){
            const note = noteList.find((note) => note.id === "preview");
            if(!note) return;

            dispatch(deleteNote({id: "preview"}));

            return
        }
        if(e.buttons !== 1) return;
        let rect = e.currentTarget.getBoundingClientRect();
        let y = e.clientY - rect.top;
        let convertYToMinute = Math.ceil(y / 4);
        let tempHour = hour;
        let tempMinuteDraggingTop = Math.ceil(y / 4);

        //dragging down
        if(convertYToMinute >= 60){
            tempHour += Math.floor(convertYToMinute / 60);
            convertYToMinute = convertYToMinute % 60;
        }


        const index = noteList.findIndex((note) => note.id === "preview");
        if(index === -1) return;
        if(convertYToMinute === noteList[index].endMinute || tempMinuteDraggingTop === noteList[index].startMinute) return;

        let isGoDown = true;

        const constDate = new Date(noteList[index].startYear, noteList[index].startMonth, noteList[index].startDay, noteList[index].constHour, noteList[index].constMinute);
        const tempDate = new Date(noteList[index].startYear, noteList[index].startMonth, noteList[index].startDay, tempHour, convertYToMinute);

        if(tempDate.getTime() > constDate.getTime()){
            isGoDown = true;
        }else{
            isGoDown = false;
        }


        if(y > 0 && isGoDown){
            const tempHeight = (hour - noteList[index].startHour) * 240 + (hour - noteList[index].startHour) * 40 - (noteList[index].startMinute * 4) + (convertYToMinute * 4);
            const tempTop = noteList[index].startMinute * 4;

            dispatch(updateNote({
                id: "preview",
                title: "preview",
                startHour: noteList[index].startHour,
                endHour: tempHour,
                startMinute: noteList[index].startMinute,
                endMinute: convertYToMinute,
                startDay: noteList[index].startDay,
                endDay: noteList[index].endDay,
                startMonth: noteList[index].startMonth,
                endMonth: noteList[index].endMonth,
                startYear: noteList[index].startYear,
                endYear: noteList[index].endYear,
                newHeight: tempHeight,
                newTop: tempTop,
            }));
        }else if(y > 0 && !isGoDown){
            const tempHeight = (hour - noteList[index].startHour) * 240 + (hour - noteList[index].startHour) * 40 - (noteList[index].startMinute * 4) + (tempMinuteDraggingTop * 4);
            const tempTop = noteList[index].startMinute * 4;

            let addHour = 0;
            if(tempMinuteDraggingTop >= 60){
                addHour = Math.floor(tempMinuteDraggingTop / 60);
                tempMinuteDraggingTop = tempMinuteDraggingTop % 60;
            }

            dispatch(updateNote({
                id: "preview",
                title: "preview",
                startHour: hour + addHour,
                endHour: noteList[index]?.constHour,
                startMinute: tempMinuteDraggingTop,
                endMinute: noteList[index]?.constMinute,
                startDay: noteList[index].startDay,
                endDay: noteList[index].endDay,
                startMonth: noteList[index].startMonth,
                endMonth: noteList[index].endMonth,
                startYear: noteList[index].startYear,
                endYear: noteList[index].endYear,
                newHeight: tempHeight,
                newTop: tempTop,
            }));

        }

    }, [click, noteList, dispatch])

    const handleOnMouseUp = useCallback((hour : number) => {
        if(click){
            const note = noteList.find((note) => note.id === "preview");
            if(!note) return;
            dispatch(deleteNote({id: "preview"}));
            return
        }
        const note = noteList.find((note) => note.id === "preview");

        if(!note) return;

        const tempHeight = (hour - note.startHour) * 240 + (hour - note.startHour) * 40 - (note.startMinute * 4) + (note.endMinute * 4);
        const tempTop = note.startMinute * 4;

        dispatch(setId(note.id));
        dispatch(setTitle(note.title));
        dispatch(setStartHour(note.startHour));
        dispatch(setEndHour(note.endHour));
        dispatch(setStartMinute(note.startMinute));
        dispatch(setEndMinute(note.endMinute));
        dispatch(setNewHeight(tempHeight));
        dispatch(setNewTop(tempTop));
        dispatch(setStartDay(note.startDay));
        dispatch(setEndDay(note.endDay));
        dispatch(setStartMonth(note.startMonth));
        dispatch(setEndMonth(note.endMonth));
        dispatch(setStartYear(note.startYear));
        dispatch(setEndYear(note.endYear));

        (document.getElementById('createAppointmentModal') as any).showModal();
    }, [click, noteList, dispatch])

    const handleOnContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>, {draggedItem} : IDraggedItem) => {
        e.preventDefault();
        const note = draggedItem;
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
    }, [dispatch, newHeight, newTop, offsetHeight, offsetWidth])

    return { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop, date, handleOnClick, handleOnMouseDown, handleOnMouseMove, handleOnMouseUp, handleOnContextMenu }
}