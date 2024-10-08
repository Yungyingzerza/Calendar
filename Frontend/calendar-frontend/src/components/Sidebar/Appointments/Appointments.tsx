import { INoteListSlice } from "interfaces/INoteList";
import { useSelector } from "react-redux"
import { useCallback } from "react";
import { INoteData } from "interfaces/INoteData";
import { useDispatch } from "react-redux";
import { setScrollY } from "store/scrollSlice";
import { useLocation } from "react-router-dom";

export default function Appointments() {

    const noteList = useSelector((state: INoteListSlice) => state.noteList);

    const location = useLocation();

    const dispatch = useDispatch();

    const handleClick = useCallback((appoinment : INoteData) => {

        if(location.pathname === '/year') {
            return;
        }

        //if duration is more than 1 day
        if(appoinment.startDay !== appoinment.endDay) {
            //scroll to top
            dispatch(setScrollY(10));
            return;
        }

        //calculate the scroll position
        // 240 px = 60 min
        // 1px = 0.25 min
        // 4px = 1 min
        let gapBetweenHours = appoinment.startHour * 50;
        let scrollY = (appoinment.startHour * 240 + appoinment.startMinute * 4) + gapBetweenHours;

        //scroll to top
        dispatch(setScrollY(scrollY));


    }, [noteList, dispatch, location]);


    return (
        <>
            <h1 className='text-center text-2xl font-semibold p-5'>Appointments</h1>
            <div className='flex flex-col  overflow-y-scroll'>
                <div className='flex flex-col gap-5 mt-5'>
                    {noteList.map(appoinment => (
                        <div key={appoinment.id} className='flex items-center gap-2'>
                            <button onClick={e=> handleClick(appoinment)} className='btn btn-ghost w-full h-full justify-start flex-col'>

                                <div>
                                    <span className="text-lg text-secondary">{appoinment.title}</span>
                                </div>
                                <div>
                                    <span className="text-xs">{appoinment.startDay}/{appoinment.startMonth+1}/{appoinment.startYear}</span>
                                    <span className="text-xs"> to </span>
                                    <span className="text-xs">{appoinment.endDay}/{appoinment.endMonth+1}/{appoinment.endYear}</span>
                                </div>

                                <div>
                                    <span className="text-xs">{appoinment.startHour.toString().padStart(2, '0')}:{appoinment.startMinute.toString().padStart(2, '0')}</span>
                                    <span className="text-xs"> to </span>
                                    <span className="text-xs">{appoinment.endHour.toString().padStart(2, '0')}:{appoinment.endMinute.toString().padStart(2, '0')}</span>
                                </div>
                            </button>
                        </div>
                    ))}

                    {noteList.length === 0 && (
                        <p className='text-center text-lg'>No appointments</p>
                    )}
                </div>
            </div>
        </>
    )
}