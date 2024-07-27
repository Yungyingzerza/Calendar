import Todo from './Todo';
import MiniCalendar from './MiniCalendar';
export default function Sidebar() {
    return (
        <div className='flex flex-col p-5 bg-base-200 bg-opacity-10 backdrop-blur-2xl rounded-lg shadow-lg h-full'>
            <MiniCalendar />
            <Todo />
        </div>
    )
}