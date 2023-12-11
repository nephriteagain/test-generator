export default function Essay() {
    return (
        <textarea 
        className="dark:bg-black font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
        rows={5}
        value={''}
        readOnly
    />
    )
}