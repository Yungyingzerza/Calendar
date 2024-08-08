import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useViewModel from "./useViewModel";
export default function ContextMenu() {
    const {menuRef, handleEdit, handleDelete} = useViewModel();
    return (
        <>
            <div ref={menuRef} className="bg-base-200 text-base-content rounded-md absolute z-30 min-w-36">
                <div className="flex flex-col">
                    <button onClick={e => handleEdit()} className="text-sm p-4 rounded-md hover:bg-base-100 flex flex-row gap-2 items-center">
                        <FontAwesomeIcon icon={faPenToSquare} className="text-warning"/>
                        <span>Edit</span>
                    </button>
                    <button onClick={e => handleDelete()} className="text-sm p-4 rounded-md hover:bg-base-100 flex flex-row gap-2 items-center">
                        <FontAwesomeIcon icon={faTrash} className="text-error"/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </>
    )
}