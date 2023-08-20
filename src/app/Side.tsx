
import Templates from "./components/Templates"


export default function Side() {

    return (
        <aside className="flex flex-col sm:w-[200px] w-[95%] max-h-[90vh] mt-16 relative overflow-y-scroll  sm:min-h-[500px] rounded-t-md">            
            <Templates />
        </aside>
    )
}