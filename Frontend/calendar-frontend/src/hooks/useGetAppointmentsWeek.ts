import { API } from "constants/API";
import { fetchNotes } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import getAppointmentsMapper from "utils/getAppointmentsMapper";
import { getRefreshToken } from "utils/getRefreshToken";

export function useGetAppointmentsWeek(day: number, month: number, year: number) {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname !== '/week'){
            return;
        }
        const abortController = new AbortController();
        const fetchAppointments = () => {
            fetch(`${API.calendar}/appointment/week?day=${day}&month=${month}&year=${year}`, {
                signal: abortController.signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data){
                    dispatch(fetchNotes(getAppointmentsMapper(data.appointments)));
                }
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    const abortController = new AbortController();
                    getRefreshToken(abortController, fetchAppointments);
                }
            });
        };

        fetchAppointments();

        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [day, month, year, location]);

    return null;
}