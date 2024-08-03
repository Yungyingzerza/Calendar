

export interface IDraggedItem {
    draggedItem:{
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
        newTop: number
        newHeight: number
    }
}