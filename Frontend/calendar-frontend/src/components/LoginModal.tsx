import {  googleLogout, GoogleLogin } from "@react-oauth/google";

export default function LoginModal() {
    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-opacity-10 backdrop-blur-sm shadow-lg relative overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 blur opacity-5"></div>
                    <div className="relative">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="flex flex-col justify-center items-center">
                            <GoogleLogin theme="filled_blue" width={40}  onSuccess={(code) => console.log(code)} />
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </dialog>
        </>
    )
}