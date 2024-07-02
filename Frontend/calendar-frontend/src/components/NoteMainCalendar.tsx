import { useSelector } from "react-redux"
import { ICalendarSlice } from "interfaces/ICalendarSlice"
export default function NoteMainCalendar({ hour }: { hour: number }) {
    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar);

    return (
        <>
            <div className="flex flex-row items-start w-full p-2 h-[120px] gap-6">
                <div className="flex flex-row items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                    <div className="text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                </div>

                <div className="flex flex-col relative w-full">

                    {/* exmple event from 0min to 10min */}
                    <div draggable className="h-[20px] bg-info text-info-content w-1/2 rounded-md relative top-0">
                        <span>Note 1111</span>
                    </div>

                </div>

            </div>
        </>
    )
}