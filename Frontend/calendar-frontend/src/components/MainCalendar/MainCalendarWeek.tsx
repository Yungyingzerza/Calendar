
import AppointmentListWeek from "./AppointmentListWeek/AppointmentListWeek";
import { INoteListSlice } from "interfaces/INoteList";
import { ICalendarSlice } from "interfaces/ICalendarSlice";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

export default function MainCalendar() {
    
    const noteList = useSelector((state: INoteListSlice) => state.noteList); 
    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar)
    const [week, setWeek] = useState<Date[]>([]);

    useEffect(() => {
        let tempDate = new Date(selectedYear, selectedMonth, selectedDay);
        let tempDay = tempDate.getDay();
        for(let i = 0; i < 7; i++) {
            let temp = new Date(selectedYear, selectedMonth, selectedDay - tempDay + i);
            setWeek(prev => [...prev, temp]);
        }

        return () => {
            setWeek([]);
        }

    }, [selectedDay, selectedMonth, selectedYear])

    return (
        <>
            <div className="flex flex-col gap-10">
                <h1 className="self-center mt-5 text-2xl sm:text-3xl font-bold text-primary">Appointment : {noteList.length}</h1>

                
                {Array.from({ length: 24 }, (_, index) => (
                    <div key={index} className="flex flex-row gap-1">
                        {/* Show only time */}
                        <AppointmentListWeek hour={index} showContent={false} propDate={week[0]}/>

                        {/* Appointment each day in week */}

                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={0} propDate={week[0]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={1} propDate={week[1]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={2} propDate={week[2]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={3} propDate={week[3]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={4} propDate={week[4]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={5} propDate={week[5]}/>
                        <AppointmentListWeek hour={index} displayTime={false} dayOfWeek={6} propDate={week[6]}/>
                    </div>     
                ))}
            </div>
        </>
    )
}