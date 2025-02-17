interface menuProps {
    retryfunc:() => void,
    visible:Boolean
}
export default function Menu({retryfunc,visible}:menuProps): React.JSX.Element{
    const onScreen= visible? "visible": "invisible"; 
    
    return <div className={`${onScreen} flex flex-col justify-evenly items-center absolute top-[50%] translate-y-[-50%] w-96 h-56 bg-[#961d25] 
    self-center text-center rounded-[20px] outline outline-[3px] outline-[#610c12] `}>
        <h2 className="text-white font-bold text-2xl">It seems like you have lost...</h2>
        <button className="p-[8px] w-[50%] bg-[#a22931] text-white border border-[#701d23] rounded-lg font-semibold" onClick={retryfunc}>Go again?</button>
    </div>
}
//#a9232c