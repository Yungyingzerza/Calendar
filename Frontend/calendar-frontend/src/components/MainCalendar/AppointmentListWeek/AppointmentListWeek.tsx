import useViewModel from "./useViewModel";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import { getDayName } from "utils/getDayName";

export default function AppointmentListWeek({ hour, displayTime = true, showContent = true, dayOfWeek = -1, propDate }: { hour: number, displayTime?: boolean, showContent?: boolean, dayOfWeek?: number, propDate?: Date }) {

    const { noteList, tempDraggedItem, currentTime, currentTimeRef, handleDragOver, handleDragLeave, handleDrop } = useViewModel({ hour, propDate });

    return (
        <>
            <div className="flex flex-col w-full gap-2">

                {(dayOfWeek !== -1 && hour === 0 && !displayTime && propDate) &&
                    <div className="text-center text-xs md:text-sm flex flex-col">
                        <span className="font-thin">{getDayName(dayOfWeek)}</span>
                        <span className="relative">{propDate.getDate()}</span>
                    </div>
                }

                {
                    dayOfWeek === -1 && hour === 0 &&
                    <div className="text-center text-xs md:text-sm flex flex-col">
                        <span className="font-thin">Day</span>
                        <span className="relative">Date</span>
                    </div>
                }

                {/* Apoointment that longer than 1 day */}
                {(hour === 0) && 
                    <div className="flex flex-col gap-2 w-full text-center">

                        {propDate && noteList.map((note, index) => {
                            const startDay = new Date(note.startYear, note.startMonth , note.startDay);
                            const endDay = new Date(note.endYear, note.endMonth, note.endDay);
                            const thisDay = new Date(propDate.getFullYear(), propDate.getMonth(), propDate.getDate());
                            const diffTime = Math.abs(endDay.getTime() - startDay.getTime());

                            const isDateInWeek = (startDay <= thisDay && endDay >= thisDay);

                            if (diffTime > 86400000 && isDateInWeek && dayOfWeek !== -1) {
                                return (
                                    <div key={`${index}-${note.id}-${thisDay.getTime}`} className=" h-6 w-[calc(100%+1rem)] relative self-center rounded-md bg-secondary text-secondary-content">{note.title}</div>
                                )
                            }else if(diffTime > 86400000){
                                return <div key={`${index}-${note.id}-${thisDay.getTime}`} className="h-6 w-[calc(100%+1rem)] relative bg-transparent self-center rounded-md"></div>
                            }

                        })}
                    </div>
                }

                <div className="flex flex-row items-start justify-center w-full p-2 h-[240px] gap-6"
                    onDragOver={e => handleDragOver(e)}
                    onDragLeave={e => handleDragLeave(e)}
                    onDrop={e => handleDrop(e)}
                >



                    {displayTime &&
                        <div className="flex flex-row items-center">
                            <div className="w-2 h-2 rounded-full bg-secondary mr-2"> </div>
                            <div className="text-sm lg:text-lg font-bold"> {hour.toString().padStart(2, '0')}:00 </div>
                        </div>
                    }

                    {/* indicator current time */}
                    {
                        (currentTime.hour === hour && displayTime) &&
                        <>
                            <div ref={currentTimeRef} style={{ top: `${currentTime.minute * 4}px` }} className="relative bg-error w-[99%] h-0.5">
                                <div className="relative bg-error h-4 left-full w-4 rounded-full -top-2"></div>
                            </div>
                        </>
                    }

                    {showContent &&
                        <div className="flex flex-col relative w-full min-w-20 md:min-w-0 lg:min-w-0">
                            {/* note list */}
                            {noteList.map((note, index) => {
                                

                                if (note.startHour === hour && note.startDay === note.endDay && note.startMonth === note.endMonth && note.startYear === note.endYear && note.startDay === propDate?.getDate())  {
                                    let newHeight = (note.endHour - note.startHour) * 240 + (note.endHour - note.startHour) * 40 - (note.startMinute * 4) + (note.endMinute * 4);
                                    let newTop = note.startMinute * 4;
                                    return (
                                        <AppointmentCard key={note.id} note={note} newHeight={newHeight} newTop={newTop} />
                                    )

                                }
                                return null;
                            })}

                            {/* dragged item */}
                            {(tempDraggedItem && tempDraggedItem.draggedItem.id !== "-1") && (
                                <AppointmentCard opacity={0.5} note={tempDraggedItem.draggedItem} newHeight={tempDraggedItem.draggedItem.newHeight} newTop={tempDraggedItem.draggedItem.newTop} />
                            )}



                            {/* <div className="h-[60px] bg-info text-info-content w-full rounded-md relative top-0 flex flex-col flex-wrap gap-1 overflow-hidden">
                        <span className="text-lg"></span>
                        <span className="text-lg"></span>
                    </div> */}

                        </div>
                    }

                </div>
            </div>



        </>
    )
}