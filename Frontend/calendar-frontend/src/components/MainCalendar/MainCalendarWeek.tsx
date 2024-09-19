
import AppointmentListWeek from "./AppointmentListWeek/AppointmentListWeek";
import { INoteListSlice } from "interfaces/INoteList";
import { ICalendarSlice } from "interfaces/ICalendarSlice";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { getDayName } from "utils/getDayName";

export default function MainCalendar() {
    
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

               {week.length == 7 && <div className="flex flex-row gap-1 sticky z-[100] top-0  backdrop-blur-lg rounded-md ">

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">Day</span>
                            <span className="relative">Date</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(0)}</span>
                            <span className="relative">{week[0].getDate()}</span>
                        </div>                
                    </div>
                    
                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(1)}</span>
                            <span className="relative">{week[1].getDate()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(2)}</span>
                            <span className="relative">{week[2].getDate()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(3)}</span>
                            <span className="relative">{week[3].getDate()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(4)}</span>
                            <span className="relative">{week[4].getDate()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(5)}</span>
                            <span className="relative">{week[5].getDate()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <div className="text-center text-xs md:text-sm flex flex-col">
                            <span className="font-thin">{getDayName(6)}</span>
                            <span className="relative">{week[6].getDate()}</span>
                        </div>
                    </div>


                </div>}
                
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