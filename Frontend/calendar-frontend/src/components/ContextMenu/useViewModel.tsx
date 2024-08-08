import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setIsOn, setTop, setLeft, setOffsetHeight, setOffsetWidth } from "store/menuContextSlice"
import { setIsClick } from "store/isClickOnAppointmentSlice";

export default function useViewModel() {
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const {isOn, top, left} = useSelector((state: any) => state.menuContext);

    const handleClose = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            dispatch(setIsOn(false));
            dispatch(setIsClick(false));
        }
    }

    useEffect(() => {
        if (menuRef.current) {
            dispatch(setOffsetHeight(menuRef.current.offsetHeight));
            dispatch(setOffsetWidth(menuRef.current.offsetWidth));
            if (isOn) {
                menuRef.current.style.display = 'block';
                menuRef.current.style.top = `${top}px`;
                menuRef.current.style.left = `${left}px`;
            } else {
                menuRef.current.style.display = 'none';
            }

            document.addEventListener('click', handleClose);
            
        }

    }, [menuRef.current, isOn, top, left])

    const handleEdit = () => {
        dispatch(setIsOn(false));
        (document.getElementById('appointmentModal') as any).showModal();
    }

    const handleDelete = () => {
        dispatch(setIsOn(false));
        (document.getElementById('deleteAppointmentModal') as any).showModal();
    }

    return {menuRef, handleEdit, handleDelete};
}