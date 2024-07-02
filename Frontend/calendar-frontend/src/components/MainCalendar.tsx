
import NoteMainCalendar from "./NoteMainCalendar";
export default function MainCalendar() {
    const data = [
        {
            id: 1,
            title: 'Meeting with team',
            startHour: 10,
            endHour: 12,
            startMinute: 30,
            endMinute: 0
        },
        {
            id: 2,
            title: 'Meeting with team',
            startHour: 10,
            endHour: 15,
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
    return (
        <>
            <div className="flex flex-col gap-10">
                <h1 className="self-center mt-5 text-3xl font-bold text-primary">Top Priority : {data.length}</h1>
                {Array.from({ length: 24 }, (_, index) => (
                    <NoteMainCalendar key={index} hour={index} data={data}/>
                ))}
            </div>
        </>
    )
}