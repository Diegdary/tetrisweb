"use client";
import { useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import figures from "../public/assets/figures.json";
import { Pointer } from "../public/assets/structures";

export default function Page() {
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [matrix,setmatrix] = useState<number[][]>([]);
  const [pointer,setpointer]= useState<Pointer>({value:null});
  const buttonref = useRef<HTMLButtonElement>(null);
  
  //this one will happen only once
  useEffect(()=>{
    let temp_matrix:number[][]= [];
    for (let i = 0; i < 20; i++) {
      temp_matrix.push([]);
      for (let j = 0; j < 10; j++) {
        temp_matrix[i][j]=0;
      }
    }

    setmatrix(temp_matrix);
    increaseCounter();
  },[]);  
  
  const increaseCounter = ():void => {
    setcounter(counter+1);
  };
  const increaseSpeed = ():void => {
      if(speed>250){
        setspeed(speed-250);
      }
      else{
        if(buttonref.current){
          buttonref.current.innerHTML="Too much speed!!";
        }
      }
  }

  useEffect( ()=>{//this guy will change the matrix every 'speed' seconds
    // 'X' ARE GOING TO BE THE ROWS AND 'Y' THE COLUMNS (Ik it doesn't make sense but it was the way I saw it)
    setTimeout(()=>{
      if(matrix.length != 0){
        let temp_matrix:number[][]=matrix;
        if(pointer.value){
          //if the next move is not out of the matrix:........
          
        }else{//In case there's the need for a new figure
            //random figure selector algorithm
            let index_figure=Math.floor(Math.random()*7+1);
            for (let i = 0; i < 4; i++) {
              let x =figures.inf[index_figure].positions[i].x;
              let y =figures.inf[index_figure].positions[i].y;
              temp_matrix[x][y]=1;
              setpointer({value:figures.inf[6].positions});
          
          }
        }
      }

     
    },speed);
  },[counter]);



  return <>
    <h1 className="text-red-600	">Hello, Next.js!</h1>
    <p>contador: {counter}</p>
    <p>velocidad: {speed}</p>
    <button className="border-solid border-2 border-indigo-600 " id="123" ref={buttonref} onClick={increaseSpeed}>Increase speed</button>
    <Boardt matrix={matrix}/>
  </>
}