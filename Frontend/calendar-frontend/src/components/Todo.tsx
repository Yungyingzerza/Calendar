export default function Todo() {
    const mockData = [
        {
            id: 1,
            title: 'Create a todo app',
            isDone: false
        },
        {
            id: 2,
            title: 'Create a calendar app',
            isDone: false
        },
        {
            id: 3,
            title: 'Create a weather app',
            isDone: false
        },
        {
            id: 4,
            title: 'Create a calculator app',
            isDone: false
        }
    ]
    return (
        <>
            <div className='flex flex-col p-5 '>
                <h1 className='text-center text-2xl font-semibold'>To-Do</h1>
                <div className='flex flex-col gap-2 mt-5'>
                    {mockData.map(todo => (
                        <div key={todo.id} className='flex items-center gap-2'>
                            <input type='checkbox' />
                            <p className='text-lg'>{todo.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}