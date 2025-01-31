interface menuProps {
    retryfunc:() => void
}
export default function Menu({retryfunc}:menuProps): React.JSX.Element{
    return <div className="absolute w-96 h-56 bg-[#ff666655] self-center text-center">
        <button onClick={retryfunc}>Again</button>
    </div>
}