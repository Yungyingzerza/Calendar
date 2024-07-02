
import NoteMainCalendar from "./NoteMainCalendar";
export default function MainCalendar() {
    return (
        <>
            <div className="flex flex-col gap-10">
                <h1 className="self-center mt-5 text-4xl font-bold text-primary">Top Priority</h1>
                {Array.from({ length: 24 }, (_, index) => (
                    <NoteMainCalendar key={index} hour={index}/>
                ))}
            </div>
        </>
    )
}