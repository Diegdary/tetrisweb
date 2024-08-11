"use client";
import { useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import figures from "../public/assets/figures.json";
import { Pointer } from "../public/assets/structures";

export default function Page() {
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [matrix,setmatrix] = useState<number[][]>([]);
  const [pointer,setpointer]= useState<Pointer | null>(null);
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

        let temp_matrix:number[][]=JSON.parse(JSON.stringify(matrix));

        if(pointer?.value){
          let out_matrix:boolean= false;
          //the figure will be empty for a while
          for (let i = 0; i < 4; i++) {
            temp_matrix[pointer.value[i].x][pointer.value[i].y]=0;
          }
          for (let i = 0; i < 4; i++) {
            if (pointer.value[i].x+1 >=20 || temp_matrix[pointer.value[i].x+1][pointer.value[i].y] !== 0) {
              out_matrix=true;
              break;
            }
          }
          if(!out_matrix){
            //update the pointer
            let temp_pointer =pointer.value;
            for (let i = 0; i < 4; i++) {
              temp_pointer[i].x=temp_pointer[i].x+1;
              temp_matrix[temp_pointer[i].x][temp_pointer[i].y]=pointer.index;
            }
            setpointer({value:temp_pointer,index:pointer.index});
            setmatrix(temp_matrix);
          }
          else{
            //restart
            setpointer(null);
          }
          
        }else{//In case there's the need for a new figure
            //random figure selector algorithm
            let index_figure=Math.floor(Math.random()*7+1);
            for (let i = 0; i < 4; i++) {
              const x =figures.inf[index_figure].positions[i].x;
              const y =figures.inf[index_figure].positions[i].y;
              const positions = JSON.parse(JSON.stringify(figures.inf[index_figure].positions));
              temp_matrix[x][y]=index_figure;
              setpointer({value:positions,index:index_figure});
          }
          setmatrix(temp_matrix);
        }

        setcounter(counter+1);
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