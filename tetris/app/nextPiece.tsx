import figures from "./../public/assets/figures.json"
import { useState,useEffect } from "react";

interface smallMatrix{
    index:number
}
export default function NextPiece({index}:smallMatrix):JSX.Element{
    const [final_values,setFinal_values] = useState<number[]>([]);

    useEffect(()=>{
        if (index) {
            
        }
        let matrix:number[][] =[];
        let onedi_array=[]
        const positions = figures.inf[index].positions;
        for (let i = 0; i < 4; i++) {
            matrix.push([]);
            for (let j = 0; j < 4; j++) {
                matrix[i][j]=0;
            }
        }
        for (const coordenates of positions) {
            matrix[coordenates.x+1][coordenates.y-3]=index;
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                onedi_array.push(matrix[i][j]);
            }
        }
        setFinal_values(onedi_array);
    },[index]);
    
    
    return <div className="text-center ml-4">
        <h2>Next piece:</h2>
        <div className={`rounded-[10px] overflow-hidden w-36 h-36 grid grid-cols-4 grid-rows-4 divide-x-2 divide-y-2 divide-slate-500 bg-slate-400`}>
        {final_values.map((value,key) => <div key={key} className={`bg-[${figures.inf[value].color}]`}></div>)}
        </div>
    </div>
}
//DO NOT DELETE
    //bg-[#f3ffd2] bg-[#011627] bg-[#750e49] bg-[#82BDA7] bg-[#750e49] bg-[#82BDA7] bg-[#6E837C] bg-[#b8d9c8]