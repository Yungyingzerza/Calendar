export default function Todo() {
    return (
        <>
            <div className='flex flex-col p-5 '>
                <h1 className='text-center text-2xl font-semibold'>Todo</h1>
                <div className='flex flex-col gap-2 mt-5'>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' />
                        <p className='text-lg'>Create a todo app</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' />
                        <p className='text-lg'>Create a calendar app</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' />
                        <p className='text-lg'>Create a weather app</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='checkbox' />
                        <p className='text-lg'>Create a calculator app</p>
                    </div>
                </div>
            </div>
        </>
    )
}