import CommonBlockingSites from "./CommonBlockingSites";
import Timer from "./Timer";
import '../styles/components/Body.css'

export default function Body(props: { mode: string }) {
    return (
        <div className="body-container">
            <Timer mode={props.mode} />
            <CommonBlockingSites />
        </div>
    )
}