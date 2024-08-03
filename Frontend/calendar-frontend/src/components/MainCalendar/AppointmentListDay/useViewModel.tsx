import { useSelector, useDispatch } from "react-redux"
import { IDraggedItem } from "interfaces/IDraggedItemSlice";
import { INoteListSlice } from "interfaces/INoteList";
import { ICalendarSlice } from "interfaces/ICalendarSlice";
import { useEffect, useState, useRef } from "react";
import { addNote, deleteNote } from "store/noteList/action";
import { useUpdateAppointmentsById } from "hooks/useUpdateAppointmentsById";

export default function useViewModel({ hour}: { hour: number}) {
    const { newTop, id, endHour, endMinute, startHour, startMinute, title, startDay, startMonth, startYear, endDay, endMonth, endYear } = useSelector((state: IDraggedItem) => state.draggedItem);
    const {selectedDay, selectedMonth, selectedYear} = useSelector((state: ICalendarSlice) => state.calendar);
    const noteList = useSelector((state: INoteListSlice) => state.noteList);


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

    return { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop }
}