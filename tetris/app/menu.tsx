interface menuProps {
    retryfunc:() => void,
    visible:Boolean
}
export default function Menu({retryfunc,visible}:menuProps): React.JSX.Element{
    const onScreen= visible? "visible": "invisible"; 
    return <div className={`${onScreen} flex flex-col justify-evenly items-center absolute top-[50%] translate-y-[-50%] w-96 h-56 bg-[#891d1d] 
    self-center text-center border border-[#ffff00] rounded-[20px]`}>
        <h2 className="text-white font-bold">It seems like you lost...</h2>
        <button className="w-[50%] text-white border border-[#ffff00] rounded-lg" onClick={retryfunc}>Go again?</button>
    </div>
}