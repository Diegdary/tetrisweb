"use client";
import { useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import { Pointer } from "../public/assets/structures";

export default function Page() {
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [matrix,setmatrix] = useState<number[][]>([]);
  const [pointer,setpointer]= useState<Pointer>({x:null,y:null});
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
    
    setTimeout(()=>{
      if(matrix.length != 0){
        let temp_matrix:number[][]=matrix
        if(pointer.x && pointer.y){
          if(pointer.y<19){
            temp_matrix[pointer.y][pointer.x]=0;
            temp_matrix[pointer.y+1][pointer.x]=1;
            setpointer({x:pointer.x,y:pointer.y+1});
          }
          else{
            setpointer({x:null,y:null});
          }
          
        }
        else{
          //do the random algorithm
          setpointer({x:5,y:1});
          temp_matrix[1][5]=1;//static variable CAREFUL
          
        }
  
        setmatrix(temp_matrix);
        increaseCounter();
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