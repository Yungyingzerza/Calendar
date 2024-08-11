import { useSelector } from 'react-redux';
import { useDeleteAppointmentById } from 'hooks/useDeleteAppointmentById';
import { useCallback } from 'react';
export default function useViewModel(){
    const {title, startHour, startMinute, endHour, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear, id} = useSelector((state: any) => state.draggedItem);
    
    const {deleteAppintment} = useDeleteAppointmentById(id);

    const handleDelete = useCallback(() => {
        deleteAppintment();
        (document.getElementById('deleteAppointmentModal') as any).close();
    }, [deleteAppintment]);

    return {
        title,
        startHour,
        startMinute,
        endHour,
        endMinute,
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear,
        handleDelete
    }
}