

export interface IDraggedItem {
    draggedItem:{
        id: number;
        title: string;
        startHour: number;
        endHour: number;
        startMinute: number;
        endMinute: number;
        newTop: number
        newHeight: number
    }
}