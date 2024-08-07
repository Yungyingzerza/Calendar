import { API } from "constants/API";
import { deleteNote } from 'store/noteList/action';
import { useDispatch } from 'react-redux';
import { getRefreshToken } from "utils/getRefreshToken";

export function useDeleteAppointmentById(id: string) {
    const dispatch = useDispatch();
        const abortController = new AbortController();
        const deleteAppintment = () => {
            fetch(`${API.calendar}/appointment?id=${id}`, {
                signal: abortController.signal,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => {
                return response.json();
            }).then(data => {
                dispatch(deleteNote({id}));
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    const abortController = new AbortController();
                    getRefreshToken(abortController, deleteAppintment);
                }
            });
        };


        return {
            deleteAppintment
        }
}