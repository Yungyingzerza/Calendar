
import NoteListMainCalendar from "./NoteListMainCalendar";
import { INoteListSlice } from "interfaces/INoteList";
import { useSelector } from "react-redux"

export default function MainCalendar() {
    const noteList = useSelector((state: INoteListSlice) => state.noteList);
    
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