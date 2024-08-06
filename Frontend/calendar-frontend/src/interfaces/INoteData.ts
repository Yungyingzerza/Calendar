export interface INoteData {
    id: string;
    title: string;
    startHour: number;
    endHour: number;
    startMinute: number;
    endMinute: number;
    startDay: number;
    endDay: number;
    startMonth: number;
    endMonth: number;
    startYear: number;
    endYear: number;
    constHour?: number,
    constMinute?: number,
}