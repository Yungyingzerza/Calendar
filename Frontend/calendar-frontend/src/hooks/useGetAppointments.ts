import { API } from "constants/API";
import { fetchNotes } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export function useGetAppointments(day: number, month: number, year: number) {
    const dispatch = useDispatch();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchAppointments = () => {
            fetch(`${API.calendar}/appointment?day=${day}&month=${month}&year=${year}`, {
                signal: abortController.signal,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch(fetchNotes(data.appointments));
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                }
            });
        };

        fetchAppointments();

        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [day, month, year]);

    return null;
}