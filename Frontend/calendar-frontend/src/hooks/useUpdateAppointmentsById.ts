import { API } from "constants/API";
import { updateNote } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { INoteData } from "interfaces/INoteData";
import { getRefreshToken } from "utils/getRefreshToken";

export function useUpdateAppointmentsById(dataToUpdate: INoteData) {
    const { id, title, startHour, endHour, startMinute, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear } = dataToUpdate;
    const dispatch = useDispatch();
        const abortController = new AbortController();
        const updateAppointments = () => {
            const start = new Date(startYear, startMonth , startDay, startHour, startMinute);
            const end = new Date(endYear, endMonth, endDay, endHour, endMinute);
            fetch(`${API.calendar}/appointment`, {
                signal: abortController.signal,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    title,
                    start,
                    end,
                }),
                credentials: 'include',
            })
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(updateNote({id, title, startHour, endHour, startMinute, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear}));
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    const abortController = new AbortController();
                    getRefreshToken(abortController, updateAppointments);
                }
            });
        };


        return {
            updateAppointments
        }
}