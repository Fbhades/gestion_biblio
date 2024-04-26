export default function Loading() {
    return (
        <div className="flex justify-center  h-screen mt-10">
            <div className="relative w-32 h-32">
                <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-blue-300 absolute"></div>
                <span className="absolute inset-0 flex items-center justify-center text-lg text-blue-300 font-bold">Loading</span>
            </div>
        </div>
    );
}