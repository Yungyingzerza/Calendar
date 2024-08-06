import { useSelector, useDispatch } from "react-redux"
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import { INoteListSlice } from "interfaces/INoteList";
import { ICalendarSlice } from "interfaces/ICalendarSlice";
import { useEffect, useState, useRef } from "react";
import { addNote, deleteNote, updateNote } from "store/noteList/action";
import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear } from "store/draggedItemSlice";
import { setIsClick } from "store/isClickOnAppointmentSlice";


export default function useViewModel({ hour}: { hour: number}) {
    const { newTop, id, endHour, endMinute, startHour, startMinute, title, startDay, startMonth, startYear, endDay, endMonth, endYear } = useSelector((state: IDraggedItem) => state.draggedItem);
    const {selectedDay, selectedMonth, selectedYear} = useSelector((state: ICalendarSlice) => state.calendar);
    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    const {click} = useSelector((state: any) => state.isClickOnAppointment);

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

        const tempDate = new Date();
        setWaitTime(60000 - tempDate.getSeconds() * 1000 - tempDate.getMilliseconds());
        setCurrentTime({
            hour: tempDate.getHours(),
            minute: tempDate.getMinutes()
        })

    }, [])

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




    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if(click){
            const note = noteList.find((note) => note.id === "preview");

            dispatch(deleteNote({id: "preview"}));
        }

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
                startDay: selectedDay,
                endDay,
                startMonth: selectedMonth,
                endMonth,
                startYear: selectedYear,
                endYear,
                newHeight: tempNewHeight,
                newTop: newTop
        }});
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
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
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
    }

    const handleOnClick = ({draggedItem} : IDraggedItem) => {
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
    }

    const handleOnMouseDown = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, hour : number, day : number, month : number, year : number) => {
        if(click) return;
        
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
        
    }

    const handleOnMouseMove = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, hour : number) => {
        if(click) return;
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

    }

    const handleOnMouseUp = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, hour : number) => {
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
    }

    return { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop, selectedDay, selectedMonth, selectedYear, handleOnClick, handleOnMouseDown, handleOnMouseMove, handleOnMouseUp }
}