"use client";
import { FC, useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import figures from "../public/assets/figures.json";
import { Board } from "../public/assets/structures";
import Menu from "./menu";


export default function Page() {
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [board,setboard] = useState<Board>({matrix:[],pointer:null});
  const [onMenu,setonMenu] = useState<Boolean>(false);
  const buttonref = useRef<HTMLButtonElement>(null);

  const emptyMatrix:()=>number[][] = ()=>{
    let temp_matrix:number[][]= [];
    for (let i = 0; i < 20; i++) {
      temp_matrix.push([]);
      for (let j = 0; j < 10; j++) {
        temp_matrix[i][j]=0;
      }
    }

    return temp_matrix;
  } 

  //this one will happen only once
  useEffect(()=>{
    let temp_matrix:number[][]= emptyMatrix();

    setboard({matrix:temp_matrix,pointer:null});
    setcounter(last => last + 1);
  },[]);  
  
  const increaseSpeed = ():void => {
      if(speed>125){
        setspeed(last => last/2);
      }
      else{
        if(buttonref.current){
          buttonref.current.innerHTML="Too much speed!!";
        }
      }
  }

  const keyeventhandler = (e:React.KeyboardEvent<HTMLDivElement>)=>{
    //z and x are not included
    const keypressed:string =e.key;
      if (onMenu) {
        return
      }
      setboard(last => {
        let temp_board:Board =JSON.parse(JSON.stringify(last));
        if(last.matrix.length != 0 && last.pointer?.value){//could try deleting ".value" and it could still work
          if(keypressed == "ArrowLeft"){
            
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
          // right rotation
          if(keypressed == "x"){
            const getNextPosition = (obj:{x:number,y:number}) => {
              const middle_x:number = temp_board.pointer!.value[0].x;
              const middle_y:number = temp_board.pointer!.value[0].y;
              for (let i = 0; i < 2; i++) {
                if (obj.x < middle_x && obj.y <= middle_y) {//right
                  obj.y= obj.y+1
                  continue;
                }
                if (obj.x <= middle_x && obj.y > middle_y) {//down
                  obj.x= obj.x+1
                  continue;
                }
                if(obj.x > middle_x && obj.y >= middle_y){//left
                  obj.y= obj.y-1
                  continue;
                }
                //up
                obj.x= obj.x-1
              }
              return obj;
            };
            let out_matrix:boolean = false;
            for (let i = 1; i < 4; i++) {
              temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = 0;
            }
            //double step rotation pattern case
            if (temp_board.pointer!.index > 1 && temp_board.pointer!.index < 7) {
              for (let i = 1; i < 4; i++) {
                const x =temp_board.pointer!.value[i].x; 
                const y =temp_board.pointer!.value[i].y;
                const nextP= getNextPosition({x,y});
                //debugger
                if ((nextP.x < 0 || nextP.x > 19) || (nextP.y < 0 || nextP.y > 9) || temp_board.matrix[nextP.x][nextP.y] != 0) {
                  out_matrix = true;
                  break;
                }
              }
              if (!out_matrix) {
                for (let i = 1; i < 4; i++) {
                  const x =temp_board.pointer!.value[i].x; 
                  const y =temp_board.pointer!.value[i].y;
                  const nextP= getNextPosition({x,y});
                  temp_board.pointer!.value[i].x=nextP.x
                  temp_board.pointer!.value[i].y=nextP.y
                  temp_board.matrix[nextP.x][nextP.y]= temp_board.pointer!.index
                  
                }
                return temp_board;
              }
            }
            if(temp_board.pointer!.index == 7){

              if (temp_board.pointer!.value[0].y+1 == temp_board.pointer!.value[1].y) {//acostada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer!.value[i].x;
                  const y = temp_board.pointer!.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer!.value[0].x-2;
                  const limit = temp_board.pointer!.value[0].x + 2;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 19) || temp_board.matrix[i][temp_board.pointer!.value[1].y] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer!.value[0].x-2;
                  const limit = temp_board.pointer!.value[0].x + 2;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer!.value[counter].x= i;
                    temp_board.pointer!.value[counter].y= temp_board.pointer!.value[1].y;
                    temp_board.matrix[i][temp_board.pointer!.value[1].y] = temp_board.pointer!.index
                    counter++;
                  }
                  return temp_board;
                }
              }
              else{//levantada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer!.value[i].x;
                  const y = temp_board.pointer!.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer!.value[2].y-1;
                  const limit = temp_board.pointer!.value[2].y + 3;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 9) || temp_board.matrix[temp_board.pointer!.value[2].x][i] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer!.value[2].y-1;
                  const limit = temp_board.pointer!.value[2].y + 3;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer!.value[counter].x= temp_board.pointer!.value[2].x;
                    temp_board.pointer!.value[counter].y= i;
                    temp_board.matrix[temp_board.pointer!.value[2].x][i] = temp_board.pointer!.index
                    counter++;
                  }
                  return temp_board;
                }
              }
            }
            
          }

          if(keypressed == "z"){
            const getNextPosition = (obj:{x:number,y:number}) => {
              const middle_x:number = temp_board.pointer!.value[0].x;
              const middle_y:number = temp_board.pointer!.value[0].y;
              for (let i = 0; i < 2; i++) {
                if (obj.x > middle_x && obj.y <= middle_y) {//right
                  obj.y= obj.y+1
                  continue;
                }
                if (obj.x <= middle_x && obj.y < middle_y) {//down
                  obj.x= obj.x+1
                  continue;
                }
                if(obj.x < middle_x && obj.y >= middle_y){//left
                  obj.y= obj.y-1
                  continue;
                }
                //up
                obj.x= obj.x-1
              }
              return obj;
            };
            let out_matrix:boolean = false;
            for (let i = 1; i < 4; i++) {
              temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = 0;
            }
            //double step rotation pattern case
            if (temp_board.pointer!.index > 1 && temp_board.pointer!.index < 7) {
              for (let i = 1; i < 4; i++) {
                const x =temp_board.pointer!.value[i].x; 
                const y =temp_board.pointer!.value[i].y;
                const nextP= getNextPosition({x,y});
                if ((nextP.x < 0 || nextP.x > 19) || (nextP.y < 0 || nextP.y > 9) || temp_board.matrix[nextP.x][nextP.y] != 0) {
                  out_matrix = true;
                }
              }
              if (!out_matrix) {
                for (let i = 1; i < 4; i++) {
                  const x =temp_board.pointer!.value[i].x; 
                  const y =temp_board.pointer!.value[i].y;
                  const nextP= getNextPosition({x,y});
                  temp_board.pointer!.value[i].x=nextP.x
                  temp_board.pointer!.value[i].y=nextP.y
                  temp_board.matrix[nextP.x][nextP.y]= temp_board.pointer!.index
                  
                }
                return temp_board;
              }
            }
            if(temp_board.pointer!.index == 7){//bar piece

              if (temp_board.pointer!.value[0].y+1 == temp_board.pointer!.value[1].y) {//acostada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer!.value[i].x;
                  const y = temp_board.pointer!.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer!.value[0].x-2;
                  const limit = temp_board.pointer!.value[0].x + 2;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 19) || temp_board.matrix[i][temp_board.pointer!.value[1].y] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer!.value[0].x-2;
                  const limit = temp_board.pointer!.value[0].x + 2;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer!.value[counter].x= i;
                    temp_board.pointer!.value[counter].y= temp_board.pointer!.value[1].y;
                    temp_board.matrix[i][temp_board.pointer!.value[1].y] = temp_board.pointer!.index
                    counter++;
                  }
                  return temp_board;
                }
              }
              else{//levantada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer!.value[i].x;
                  const y = temp_board.pointer!.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer!.value[2].y-1;
                  const limit = temp_board.pointer!.value[2].y + 3;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 9) || temp_board.matrix[temp_board.pointer!.value[2].x][i] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer!.value[2].y-1;
                  const limit = temp_board.pointer!.value[2].y + 3;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer!.value[counter].x= temp_board.pointer!.value[2].x;
                    temp_board.pointer!.value[counter].y= i;
                    temp_board.matrix[temp_board.pointer!.value[2].x][i] = temp_board.pointer!.index
                    counter++;
                  }
                  return temp_board;
                }
              }
            }
            
          }

          for (let i = 0; i < 4; i++) {
            temp_board.matrix[temp_board.pointer!.value[i].x][temp_board.pointer!.value[i].y] = board.pointer!.index;
          }

        }
        // refill the original matrix in case nothing has to happen (if I return the same value as before, react does unpredictable scenarios)
        
        return temp_board;
      })
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

              setcounter(last => last + 1);
              return temp_board;
            }
            else{
              let rows_burned =0;
              for (let i = 0; i < 4; i++) {
                temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=temp_board.pointer.index;
              }
              //deleting completed rows!
              const sortedlist = temp_board.pointer.value.map(e => e.x).sort();
              const setlist = new Set(sortedlist);

              for (const row of setlist) {
                let gap:boolean = false;
                for (let j = 0; j < 10; j++) {
                  if (temp_board.matrix[row][j] == 0) {
                    gap= true;
                    break;
                  }
                }
                if (!gap) {
                  rows_burned++;
                  for (let temp_i = row; temp_i > 0; temp_i--) {
                    for (let temp_j = 0; temp_j < 10; temp_j++) {
                      temp_board.matrix[temp_i][temp_j] = temp_board.matrix[temp_i - 1][temp_j];
                    }
                  }
                  // filling first row 
                  for (let temp_i = 0; temp_i < 10; temp_i++) {
                    temp_board.matrix[0][temp_i] = 0;
                  }
                }
              }


              //restart
                setcounter(last => last + 1);
                return {matrix:temp_board.matrix,pointer:null}
              
            }
            
          }else{//In case there's the need for a new figure
              //random figure selector algorithm
              let index_figure=Math.floor(Math.random()*7+1);
              const positions = JSON.parse(JSON.stringify(figures.inf[index_figure].positions));

              for(const element of positions){
                if(temp_board.matrix[element.x][element.y] != 0){
                  //PLAYER DIED
                  setonMenu(last => true);
                  return {matrix:temp_board.matrix,pointer:{value:positions,index:index_figure}};
                }
              }
              for (let i = 0; i < 4; i++) {
                const x =figures.inf[index_figure].positions[i].x;
                const y =figures.inf[index_figure].positions[i].y;
                
                temp_board.matrix[x][y]=index_figure;
                
            }
            //NEXT: IF THE MATRIX HAS A VALUE DIFFERENT THAN 0 IN THESE POSITIONS, THE PLAYER DIES.
            
            
            setcounter(last => last + 1);
            return {matrix:temp_board.matrix,pointer:{value:positions,index:index_figure}};
          }
          
        }
        return lastBoard;

      });


     
    },speed);
  },[counter]);

  const retryGame:()=>void = ()=>{
  
    setboard({matrix:emptyMatrix(),pointer:null});
    setonMenu(false);
    setcounter(0);
    setspeed(1000);
  }



  return <div tabIndex={0} className="bg-costum-background h-screen w-screen relative flex flex-col justify-start focus:outline-none" onKeyDown={(e) => { keyeventhandler(e) }}>
    <Menu retryfunc={retryGame} visible={onMenu}/>
    <h1 className="text-red-600	">Hello, Next.js!</h1>
    <p>contador: {counter}</p>
    <p>velocidad: {speed}</p>
    <button className="border-solid border-2 border-indigo-600 " id="123" ref={buttonref} onClick={increaseSpeed}>Increase speed</button>
    <div className="flex justify-center">
      <Boardt matrix={board.matrix} pointer={board.pointer} />
    </div>

  </div>


}