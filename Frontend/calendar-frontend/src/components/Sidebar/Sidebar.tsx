import Appointments from './Appointments/Appointments';
import MiniCalendar from './MiniCalendar/MiniCalendar';
import { useLocation } from 'react-router-dom';
export default function Sidebar() {
    const location = useLocation();

    return (
        <div className='flex flex-col p-5 bg-base-200 bg-opacity-10 backdrop-blur-2xl rounded-lg shadow-lg h-full'>
            {location.pathname !== '/year' && <MiniCalendar />}
            <Appointments />
        </div>
    )
}