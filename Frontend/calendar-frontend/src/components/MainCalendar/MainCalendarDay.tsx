
import AppointmentList from "./AppointmentListDay/AppointmentList";
import { INoteListSlice } from "interfaces/INoteList";
import { useSelector } from "react-redux"

export default function MainCalendar() {
    
    const noteList = useSelector((state: INoteListSlice) => state.noteList); 

    return (
        <>
            <div className="flex flex-col gap-10">
                {Array.from({ length: 24 }, (_, index) => (
                    <AppointmentList key={index} hour={index}/>
                ))}
            </div>
        </>
    )
}