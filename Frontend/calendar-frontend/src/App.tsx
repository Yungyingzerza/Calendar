import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { clear } from 'console';

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(new Date())
  const [lastDayOfMonth, setLastDayOfMonth] = useState<Date>(new Date())
  const [fullCalendar, setFullCalendar] = useState<number[]>([])
  const [firstTime, setFirstTime] = useState<boolean>(true)



  const getDayOfWeek = (date: Date) => {
    return date.getDay()
  }

  const getNameOfMonth = (date: Date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return monthNames[date.getMonth()]
  }

  const getNameOfDay = (date: Date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return dayNames[date.getDay()]
  }

  const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect(() => {

    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    setFirstDayOfMonth(firstDay)
    setLastDayOfMonth(lastDay)

    let shift = getDayOfWeek(firstDay)

    for (let i = 0; i < shift; i++) {
      setFullCalendar(prev => [...prev, 0])
    }

    //increment the firstDay by 1 until the last day of the month
    while (firstDay <= lastDay) {
      const day = firstDay.getDate()
      setFullCalendar(prev => [...prev, day])
      firstDay.setDate(firstDay.getDate() + 1)
    }

    //clean up
    return () => {
      setFullCalendar([])
    }

  }, [currentDate])

  useEffect(() => {
    console.log(fullCalendar)
  }, [fullCalendar])

  return (
    <>
      <div className='flex flex-col p-5'>
        <header className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2'>
            <h1 className='text-xl font-bold'>{getNameOfMonth(currentDate)}</h1>
            <h1 className='text-xl font-bold'>{currentDate.getFullYear()}</h1>
          </div>
          <div className="join flex flex-row gap-2">
            <button className="join-item btn btn-ghost text-xl font-bold">«</button>
            <button className="join-item btn btn-ghost text-xl font-bold">»</button>
          </div>
        </header>
        <main>
          {/* Title of Day */}
          <header className='flex flex-row justify-center items-center'>
            {Days.map((day, index) => (
              <div key={index} className='w-full text-center'>
                <h1 className="text-sm font-light">{day}</h1>
              </div>
            ))}
          </header>

          {/* Calendar */}
          <div className='grid grid-cols-7 gap-1'>
            {fullCalendar.map((day, index) => (
              <div key={index} className='flex flex-col items-center justify-center'>
                {day != 0 && <button className='text-sm w-full btn btn-ghost'>{day}</button>}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
