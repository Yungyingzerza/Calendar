import { useSelector, useDispatch } from "react-redux"
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import { INoteListSlice } from "interfaces/INoteList";
import { useEffect, useState, useRef } from "react";
import { addNote, deleteNote } from "store/noteList/action";
import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById";
import { setId, setStartHour, setEndHour, setStartMinute, setEndMinute, setTitle, setNewHeight, setNewTop, setStartDay, setEndDay, setStartMonth, setEndMonth, setStartYear, setEndYear } from "store/draggedItemSlice";

export default function useViewModel({ hour, propDate }: { hour: number, propDate?: Date }) {
    const { newTop, id, endHour, endMinute, startHour, startMinute, title, startDay, startMonth, startYear, endDay, endMonth, endYear,newHeight  } = useSelector((state: IDraggedItem) => state.draggedItem);
    const noteList = useSelector((state: INoteListSlice) => state.noteList);
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

    return { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop, date, handleOnClick }
}