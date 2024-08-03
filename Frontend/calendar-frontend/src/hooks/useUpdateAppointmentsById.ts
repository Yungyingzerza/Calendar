import { API } from "constants/API";
import { fetchNotes } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getAppointmentsMapper from "utils/getAppointmentsMapper";
import { INoteData } from "interfaces/INoteData";

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
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Update error:', error);
                }
            });
        };


        return {
            updateAppointments
        }
}