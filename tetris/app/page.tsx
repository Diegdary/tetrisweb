"use client";
import { useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import figures from "../public/assets/figures.json";
import { Board } from "../public/assets/structures";

export default function Page() {
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [board,setboard] = useState<Board>({matrix:[],pointer:null});
  const buttonref = useRef<HTMLButtonElement>(null);


  const keyeventhandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
    //z and x are not included
    const keypressed:string =e.key;
      console.log(keypressed)
      setboard(last => {
        let temp_board:Board =JSON.parse(JSON.stringify(last));
        if(last.matrix.length != 0 && last.pointer?.value){//could try deleting ".value" and it could still work
         // debugger
          if(keypressed == "ArrowLeft"){
            
            console.log("jiji");
            let out_matrix:boolean = false;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = 0;
            }
            for (let i = 0; i < 4; i++) {
              const x = temp_board.pointer!.value[i].x;
              const y = temp_board.pointer!.value[i].y-1;
              if (y == -1 || temp_board.matrix[x][y] != 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              for (let i = 0; i < 4; i++) {
                temp_board.pointer!.value[i].y= temp_board.pointer!.value[i].y-1;
                const x = temp_board.pointer!.value[i].x;
                const y = temp_board.pointer!.value[i].y;
                temp_board.matrix[x][y]= temp_board.pointer!.index;
              }
              return temp_board;
            }
          }
          if(keypressed == "ArrowRight"){
            console.log("jiji");
            let out_matrix:boolean = false;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = 0;
            }
            for (let i = 0; i < 4; i++) {
              const x = temp_board.pointer!.value[i].x;
              const y = temp_board.pointer!.value[i].y+1;
              if (y == 10 || temp_board.matrix[x][y] != 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              for (let i = 0; i < 4; i++) {
                temp_board.pointer!.value[i].y= temp_board.pointer!.value[i].y+1;
                const x = temp_board.pointer!.value[i].x;
                const y = temp_board.pointer!.value[i].y;
                temp_board.matrix[x][y]= temp_board.pointer!.index;
              }
              return temp_board;
            }
          }

          for (let i = 0; i < 4; i++) {
            temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = board.pointer!.index;
          }

        }
        // refill the original matrix in case nothing has to happen (if I return the same value as before, react does unpredictable cases)
        
        return temp_board;
      })
  }

  //this one will happen only once
  useEffect(()=>{
    let temp_matrix:number[][]= [];
    for (let i = 0; i < 20; i++) {
      temp_matrix.push([]);
      for (let j = 0; j < 10; j++) {
        temp_matrix[i][j]=0;
      }
    }

    setboard({matrix:temp_matrix,pointer:null});
    setcounter(last => last + 1);
  },[]);  
  
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
      setboard(lastBoard => {
        if(board.matrix.length != 0){

          let temp_board:Board=JSON.parse(JSON.stringify(lastBoard));
  
          if(temp_board.pointer?.value){
            let out_matrix:boolean= false;
            //the figure will be empty for a while
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=0;
            }
            for (let i = 0; i < 4; i++) {
              if (temp_board.pointer.value[i].x+1 >=20 || temp_board.matrix[temp_board.pointer.value[i].x+1][temp_board.pointer.value[i].y] !== 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              //update the pointer
              for (let i = 0; i < 4; i++) {
                temp_board.pointer.value[i].x=temp_board.pointer.value[i].x+1;
                temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=temp_board.pointer.index;
              }
              //DELETE LATER
              //setpointer({value:temp_pointer,index:pointer.index});
              //setmatrix(temp_matrix);
              setcounter(last => last + 1);
              return temp_board;
            }
            else{
              //restart
                setcounter(last => last + 1);
                return {matrix:lastBoard.matrix,pointer:null}
              
            }
            
          }else{//In case there's the need for a new figure
              //random figure selector algorithm
              let index_figure=Math.floor(Math.random()*7+1);
              for (let i = 0; i < 4; i++) {
                const x =figures.inf[index_figure].positions[i].x;
                const y =figures.inf[index_figure].positions[i].y;
                
                temp_board.matrix[x][y]=index_figure;
                
            }
            const positions = JSON.parse(JSON.stringify(figures.inf[index_figure].positions));
            //DELETE LATER
            //setpointer({value:positions,index:index_figure});
            //setmatrix(temp_matrix);
            setcounter(last => last + 1);
            return {matrix:temp_board.matrix,pointer:{value:positions,index:index_figure}};
          }
          
        }
        return lastBoard;

      });


     
    },speed);
  },[counter]);



  return <div tabIndex={0} onKeyDown={(e)=>{keyeventhandler(e)}}>
              <h1 className="text-red-600	">Hello, Next.js!</h1>
              <p>contador: {counter}</p>
              <p>velocidad: {speed}</p>
              <button className="border-solid border-2 border-indigo-600 " id="123" ref={buttonref} onClick={increaseSpeed}>Increase speed</button>
              <div className="flex justify-center">
                 <Boardt matrix={board.matrix} pointer={board.pointer}/>
              </div>
              
         </div>
    
  
}