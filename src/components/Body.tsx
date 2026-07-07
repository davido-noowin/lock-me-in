import CommonBlockingSites from "./CommonBlockingSites";
import Timer from "./Timer";
import '../styles/components/Body.css'

export default function Body() {
    return (
        <div className="body-container">
            <Timer />
            <CommonBlockingSites />
        </div>
    )
}