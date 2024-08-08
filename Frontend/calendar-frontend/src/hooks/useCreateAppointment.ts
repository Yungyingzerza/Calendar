import { API } from "constants/API";
import { addNote } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { INoteData } from "interfaces/INoteData";
import { getRefreshToken } from "utils/getRefreshToken";

export function useCreateAppointment(dataToUpdate: INoteData) {
    const { id, title, startHour, endHour, startMinute, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear } = dataToUpdate;
    const dispatch = useDispatch();
        const abortController = new AbortController();

        const createAppointment = () => {
            const start = new Date(startYear, startMonth , startDay, startHour, startMinute);
            const end = new Date(endYear, endMonth, endDay, endHour, endMinute);
            fetch(`${API.calendar}/appointment`, {
                signal: abortController.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    start,
                    end,
                }),
                credentials: 'include',
            })
            .then(response => {
                return response.json();
            }).then(data => {
                const title = data.appointment.title;
                const tempStart = new Date(data.appointment.start);
                const tempEnd = new Date(data.appointment.end);
                const startDay = tempStart.getDate();
                const startMonth = tempStart.getMonth();
                const startYear = tempStart.getFullYear();
                const startHour = tempStart.getHours();
                const startMinute = tempStart.getMinutes();
                const endDay = tempEnd.getDate();
                const endMonth = tempEnd.getMonth();
                const endYear = tempEnd.getFullYear();
                const endHour = tempEnd.getHours();
                const endMinute = tempEnd.getMinutes();
                const id = data.appointment.id;
                dispatch(addNote({
                    id,
                    title,
                    startDay,
                    startMonth,
                    startYear,
                    startHour,
                    startMinute,
                    endDay,
                    endMonth,
                    endYear,
                    endHour,
                    endMinute,
                }));
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    const abortController = new AbortController();
                    getRefreshToken(abortController, createAppointment);
                }

            })
        };


        return {
            createAppointment
        }
}