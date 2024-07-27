
import NoteListMainCalendar from "./NoteListMainCalendar";
import { INoteListSlice } from "interfaces/INoteList";
import { useSelector, useDispatch } from "react-redux"
import { fetchNotes } from "store/noteList/action";
import { useEffect } from "react";

export default function MainCalendar() {
    
    const dispatch = useDispatch();

    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    
    

    useEffect(() => {
        const mockData = [
            {
                id: 1,
                title: 'Meeting with team',
                startHour: 10,
                endHour: 10,
                startMinute: 0,
                endMinute: 30
            },
            {
                id: 2,
                title: 'Meeting with team',
                startHour: 10,
                endHour: 13,
                startMinute: 20,
                endMinute: 0
            },
            {
                id: 3,
                title: 'Meeting with team',
                startHour: 14,
                endHour: 18,
                startMinute: 0,
                endMinute: 0
            }
        ]
        dispatch(fetchNotes(mockData));
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="flex flex-col gap-10">
                <h1 className="self-center mt-5 text-3xl font-bold text-primary">Top Priority : {noteList.length}</h1>
                {Array.from({ length: 24 }, (_, index) => (
                    <NoteListMainCalendar key={index} hour={index}/>
                ))}
            </div>
        </>
    )
}