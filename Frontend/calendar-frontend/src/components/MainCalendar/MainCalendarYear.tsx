
import MiniCalendar from "components/Sidebar/MiniCalendar/MiniCalendar";
import { useGetAppointmentsYear } from 'hooks/useGetAppointmentsYear';
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedYear } from "store/calendarSlice";


export default function MainCalendar() {
    
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const dispatch = useDispatch();

    useGetAppointmentsYear(year);

    const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.value === '') return;
        
        if(e.target.value.length > 4) return;

        const isNumber = /^[0-9]*$/.test(e.target.value);

        if(isNumber){
            setYear(parseInt(e.target.value));
            dispatch(setSelectedYear(parseInt(e.target.value)));
        }
        
    }, [dispatch]);

    const handleNextYear = useCallback(() => {
        setYear(year + 1);
        dispatch(setSelectedYear(year + 1));
    }, [year, dispatch]);

    const handlePrevYear = useCallback(() => {
        setYear(year - 1);
        dispatch(setSelectedYear(year - 1));
    }, [year, dispatch]);


    return (
        <>
            <div className="flex flex-row justify-center items-center">
                <button onClick={() => handlePrevYear()} className="join-item btn btn-ghost text-xl min-[900px]:text-lg font-bold">«</button>
                <input type='number' onChange={(e) => handleYearChange(e)} value={year} className='input text-2xl min-[900px]:text-xl font-bold w-24 min-[900px]:w-22 bg-transparent' />
                <button onClick={() => handleNextYear()} className="join-item btn btn-ghost text-xl min-[900px]:text-lg font-bold">»</button>

            </div>

            <div className="grid grid-cols-3 gap-20 justify-items-center max-[800px]:min-w-[1000px]">

                {/* for loop 12months */}
                {
                    Array.from({length: 12}, (_, i) => i).map((monthIndex) => (
                        <MiniCalendar key={monthIndex} isYear={true} monthIndex={monthIndex} />
                    ))
                }

            
            </div>
        </>
    )
}