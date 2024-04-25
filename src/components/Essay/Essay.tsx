export default function Essay() {
    return (
        <textarea 
        className="bg-transparent border-2 border-gray-300 dark:border-gray-700 font-semibold  px-2 py-1 outline-none w-[90%] resize-none"
        rows={5}
        value={''}
        readOnly
        data-testid="essay-textarea"
    />
    )
}