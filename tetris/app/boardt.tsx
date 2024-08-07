import { useEffect, useState} from "react";
import figures from "../public/assets/figures.json";
import {Matrix} from "../public/assets/structures";


export default function Boardt(matrix: Matrix) {
    //PROBABLEMENTE SE NECESITE UN USEFFECT AQUI
    const [final_values, setfinal_values]=useState<number[]>([]);
    useEffect(()=>{
      
      if(matrix.matrix.length != 0){
        let display_array:number[] = [];
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 10; j++) {
            display_array.push(matrix.matrix[i][j]);
          }
        }
        setfinal_values(display_array);
      }
      
    },[matrix]);
    
    
    //bg-[#f3ffd2] bg-[#011627]
    return <>
      <div className={`w-96 h-80vh grid grid-cols-10 grid-rows-20 divide-x-2 divide-y-2 divide-slate-500 bg-slate-400`}>
        {final_values.map((value,key) => <div className={`bg-[${figures.inf[value].color}]`} key={key}></div>)}
      </div>
    </>
  }