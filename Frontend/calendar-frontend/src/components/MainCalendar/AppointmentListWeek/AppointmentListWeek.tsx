import useViewModel from "./useViewModel";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import { getDayName } from "utils/getDayName";

export default function AppointmentListWeek({ hour, displayTime = true, showContent=true , dayOfWeek=-1, propDate }: { hour: number, displayTime?: boolean, showContent?: boolean, dayOfWeek?: number, propDate?: Date }) {

    const { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop } = useViewModel({ hour, propDate });

    return (
        <>
            <div className="flex flex-row items-start w-full p-2 h-[240px] gap-6" 
                onDragOver={e=>handleDragOver(e)}
                onDragLeave={e=>handleDragLeave(e)}
                onDrop={e=>handleDrop(e)}
                >

                {(dayOfWeek !== -1 && hour === 0 && !displayTime && propDate) && <span className="text-center absolute top-20">{getDayName(dayOfWeek)}: {propDate.getDate()}</span>}

                {displayTime &&
                <div className="flex flex-row items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                    <div className="text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                </div>
                }

                <div className="flex flex-col relative w-full">

                    {/* note list */}
                    {showContent && noteList.map((note, index) => {
                        if (note.startHour === hour) {
                            let newHeight = (note.endHour - note.startHour) * 240 + (note.endHour - note.startHour) * 40 - (note.startMinute * 4) + (note.endMinute * 4);
                            let newTop = note.startMinute * 4;
                            return (
                                <AppointmentCard key={index} note={note} newHeight={newHeight} newTop={newTop} />
                            )

                        }
                        return null;
                    })}

                    {/* dragged item */}
                    {(showContent && tempDraggedItem && tempDraggedItem.draggedItem.id!=="-1") && (
                        <AppointmentCard opacity={0.5} note={tempDraggedItem.draggedItem} newHeight={tempDraggedItem.draggedItem.newHeight} newTop={tempDraggedItem.draggedItem.newTop} />
                    )}

                    {/* indicator current time */}
                    {
                        (currentTime.hour === hour && displayTime) &&
                        <>
                            <div ref={currentTimeRef} style={{top: `${currentTime.minute * 4}px`}} className="relative bg-error w-[99%] h-0.5 right-full ">
                                <div className="relative bg-error h-4 left-full w-4 rounded-full -top-2"></div>
                            </div>
                        </>
                    }

                    {/* <div className="h-[60px] bg-info text-info-content w-full rounded-md relative top-0 flex flex-col flex-wrap gap-1 overflow-hidden">
                        <span className="text-lg"></span>
                        <span className="text-lg"></span>
                    </div> */}

                </div>

            </div>
        </>
    )
}