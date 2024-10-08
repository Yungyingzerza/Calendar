import { API } from "constants/API";
import { ICalendarSlice } from "interfaces/ICalendarSlice";
import { INoteData } from "interfaces/INoteData";
import { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import getAppointmentsMapper from "utils/getAppointmentsMapper";
import { setIsClick } from "store/isClickOnAppointmentSlice";

export default function useViewModel() {

    const dispatch = useDispatch();

    const { selectedDay, selectedMonth, selectedYear } = useSelector((state: ICalendarSlice) => state.calendar)


    const [appointments, setAppointments] = useState<INoteData[]>([]);


    const getAppointments = useCallback( async () => {
        //fetch appointments
        const abortController = new AbortController();
        const response = await fetch(`${API.calendar}/appointment?day=${selectedDay}&month=${selectedMonth}&year=${selectedYear}`, {
            signal: abortController.signal,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const data = await response.json();

        return data;
    }, [selectedDay, selectedMonth, selectedYear])


    useEffect(() => {

        getAppointments().then((data: any) => {
            if(data.appointments.length > 0){
                const temp = getAppointmentsMapper(data.appointments);
                setAppointments(temp);
            }
        })

        return () => {
            //cleanup
            setAppointments([]);
        }

    }, [selectedDay, selectedMonth, selectedYear])


    const handleCloseModal = useCallback(() => {
        dispatch(setIsClick(false));
        (document.getElementById("listAppointmentModal") as any).close();
    }, [dispatch])



    return {
        handleCloseModal,
        appointments,
    }
}