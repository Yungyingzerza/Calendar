import { useSelector } from 'react-redux';
import { useDeleteAppointmentById } from 'hooks/useDeleteAppointmentById';
export default function useViewModel(){
    const {title, startHour, startMinute, endHour, endMinute, startDay, startMonth, startYear, endDay, endMonth, endYear, id} = useSelector((state: any) => state.draggedItem);
    
    const {deleteAppintment} = useDeleteAppointmentById(id);

    const handleDelete = () => {
        deleteAppintment();
        (document.getElementById('deleteAppointmentModal') as any).close();
    }

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