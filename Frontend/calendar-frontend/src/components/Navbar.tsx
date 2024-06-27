export default function Navbar() {
    return (
        <>
            <div className="w-full h-16 bg-base-200 bg-opacity-10 backdrop-blur-2xl flex flex-row-reverse items-center gap-4">
                <div className="avatar mr-5 cursor-pointer">
                    <div className="mask mask-hexagon w-10">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div>Hi Weerasak</div>
            </div>
        </>
    )
}