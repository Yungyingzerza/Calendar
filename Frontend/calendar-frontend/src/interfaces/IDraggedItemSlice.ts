

export interface IDraggedItem {
    draggedItem:{
        id: string;
        title: string;
        startHour: number;
        endHour: number;
        startMinute: number;
        endMinute: number;
        day: number;
        month: number;
        year: number;
        newTop: number
        newHeight: number
    }
}