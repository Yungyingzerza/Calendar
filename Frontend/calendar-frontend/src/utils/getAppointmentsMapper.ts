import { INoteData } from "interfaces/INoteData";

export default function getAppointmentsMapper(backendData : {id: string, title: string, start: Date, end: Date}[]) : INoteData[] {
    let appointments: INoteData[] = [];

    backendData.map((data) => {
        const start = new Date(data.start);
        const end = new Date(data.end);
        appointments.push({
            id: data.id,
            title: data.title,
            startHour: start.getHours(),
            endHour: end.getHours(),
            startMinute: start.getMinutes(),
            endMinute: end.getMinutes(),
            day: start.getDate(),
            month: start.getMonth(),
            year: start.getFullYear()
        })
    })

    return appointments;
}   