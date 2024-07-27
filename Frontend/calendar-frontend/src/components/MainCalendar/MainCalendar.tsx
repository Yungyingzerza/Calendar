
import NoteListMainCalendar from "./NoteListMainCalendar";
import { INoteListSlice } from "interfaces/INoteList";
import { useSelector, useDispatch } from "react-redux"
import { fetchNotes } from "store/noteList/action";
import { useEffect } from "react";
import { API } from "constants/API";

export default function MainCalendar() {
    
    const dispatch = useDispatch();

    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    
    

    useEffect(() => {
        const today = new Date();
        fetch(`${API.calendar}/appointment`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                day: today.getDate(),
                month: today.getMonth(),
                year: today.getFullYear(),
            }),
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            dispatch(fetchNotes(data.appointments));
        })

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="flex flex-col gap-10">
                <h1 className="self-center mt-5 text-3xl font-bold text-primary">Appointment : {noteList.length}</h1>
                {Array.from({ length: 24 }, (_, index) => (
                    <NoteListMainCalendar key={index} hour={index}/>
                ))}
            </div>
        </>
    )
}