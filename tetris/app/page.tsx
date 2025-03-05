"use client";
import {useEffect, useRef, useState } from "react"
import Boardt from "./boardt";
import figures from "../public/assets/figures.json";
import { Board, Score, Levels } from "../public/assets/structures";
import Menu from "./menu";
import NextPiece from "./nextPiece";


export default function Page() {
  const [timer,settimer] = useState<number>(0);
  const [counter,setcounter]= useState<number>(0);
  const [speed,setspeed]= useState<number>(1000);
  const [board,setboard] = useState<Board>({matrix:[],pointer:{index:{current:null,next:1},value:[]}});
  const [score,setscore] = useState<Score>({level:0,score:0});
  const [onMenu,setonMenu] = useState<Boolean>(false);
  const buttonref = useRef<HTMLButtonElement>(null);

  const timeConverter = (seconds:number)=>{
    let minutes:number|string = Math.floor(seconds/60);
    let remainingSeconds:number|string = seconds - minutes*60;
    minutes = minutes<10?`0${minutes}`:minutes;
    remainingSeconds= remainingSeconds<10?`0${remainingSeconds}`:remainingSeconds;
    return `${minutes}:${remainingSeconds}`;
  }

  useEffect(()=>{
    setTimeout(()=>{
      if (!onMenu) {
        settimer(last => last+1);
      }
    },1000)
    
  },[onMenu,timer]);


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

    setboard({matrix:temp_matrix,pointer:{index:{current:null,next:Math.floor(Math.random()*7+1)},value:[]}});
    setcounter(last => last + 1);
  },[]);  
  
  const increaseSpeed = ():void => {
      if(speed>100){
        setspeed(last => last/2);
      }
      else{
          buttonref.current!.innerHTML="Too much speed!!";
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
        if(last.matrix.length != 0 && last.pointer.index.current){//could try deleting ".value" and it could still work
          if(keypressed == "ArrowLeft"){
            let out_matrix:boolean = false;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            for (let i = 0; i < 4; i++) {
              const x = temp_board.pointer.value[i].x;
              const y = temp_board.pointer.value[i].y-1;
              if (y == -1 || temp_board.matrix[x][y] != 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              for (let i = 0; i < 4; i++) {
                temp_board.pointer.value[i].y= temp_board.pointer.value[i].y-1;
                const x = temp_board.pointer.value[i].x;
                const y = temp_board.pointer.value[i].y;
                temp_board.matrix[x][y]= temp_board.pointer.index.current!;
              }
              return temp_board;
            }
          }
          if(keypressed == "ArrowRight"){
            let out_matrix:boolean = false;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            for (let i = 0; i < 4; i++) {
              const x = temp_board.pointer.value[i].x;
              const y = temp_board.pointer.value[i].y+1;
              if (y == 10 || temp_board.matrix[x][y] != 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              for (let i = 0; i < 4; i++) {
                temp_board.pointer.value[i].y= temp_board.pointer.value[i].y+1;
                const x = temp_board.pointer.value[i].x;
                const y = temp_board.pointer.value[i].y;
                temp_board.matrix[x][y]= temp_board.pointer.index.current!;
              }
              return temp_board;
            }
          }
          if(keypressed == "ArrowDown"){
            let out_matrix:boolean = false;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            for (let i = 0; i < 4; i++) {
              const x = temp_board.pointer.value[i].x+1;
              const y = temp_board.pointer.value[i].y;
              if (x == 20 || temp_board.matrix[x][y] != 0) {
                out_matrix=true;
                break;
              }
            }
            if(!out_matrix){
              for (let i = 0; i < 4; i++) {
                temp_board.pointer.value[i].x += 1;
                const x = temp_board.pointer.value[i].x;
                const y = temp_board.pointer.value[i].y;
                temp_board.matrix[x][y]= temp_board.pointer.index.current!;
              }
              return temp_board;
            }
          }
          if(keypressed == " "){
            let out_matrix:boolean = false;
            let linesLooped = 0;
            for (let i = 0; i < 4; i++) {
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            while(!out_matrix){
              for (let i = 0; i < 4; i++) {
                const x = temp_board.pointer.value[i].x+linesLooped+1;
                const y = temp_board.pointer.value[i].y;
                if (x == 20 || temp_board.matrix[x][y] != 0) {
                  out_matrix=true;
                  break;
                }
              }
              linesLooped++;
            }
            for (let i = 0; i < 4; i++) {
              temp_board.pointer.value[i].x += linesLooped - 1;
              const x = temp_board.pointer.value[i].x;
              const y = temp_board.pointer.value[i].y;
              temp_board.matrix[x][y]= temp_board.pointer.index.current!;
            }
            //deleting burnrows
            let rows_burned =0;
              for (let i = 0; i < 4; i++) {
                temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=temp_board.pointer.index.current!;
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
                  // filling first row (the row is not always going to be empty)
                  for (let temp_i = 0; temp_i < 10; temp_i++) {
                    temp_board.matrix[0][temp_i] = 0;
                  }
                }
              }

            //starting point!
            let index_figure=Math.floor(Math.random()*7+1);
              const next_piece = temp_board.pointer.index.next;
              const positions = JSON.parse(JSON.stringify(figures.inf[next_piece].positions));

              for(const element of positions){
                if(temp_board.matrix[element.x][element.y] != 0){
                  //PLAYER DIED
                  setonMenu(true);
                  return {matrix:temp_board.matrix,pointer:{value:[],index:{current:null,next:1}}};
                }
              }
              for (let i = 0; i < 4; i++) {
                const x =figures.inf[next_piece].positions[i].x;
                const y =figures.inf[next_piece].positions[i].y;
                
                temp_board.matrix[x][y]=next_piece;
                
            }
            //NEXT: IF THE MATRIX HAS A VALUE DIFFERENT THAN 0 IN THESE POSITIONS, THE PLAYER DIES.
            setscore(last => {return {level:last.level,score: last.score +Math.floor(Math.pow((4*rows_burned*(0.25*last.level+0.75)),1.5))}});
            return {matrix:temp_board.matrix,pointer:{value:positions,index:{current:next_piece,next:index_figure}}};
          }
          // right rotation
          if(keypressed == "x" || keypressed == "X"){
            const getNextPosition = (obj:{x:number,y:number}) => {
              const middle_x:number = temp_board.pointer.value[0].x;
              const middle_y:number = temp_board.pointer.value[0].y;
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
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            //double step rotation pattern case
            if (temp_board.pointer.index.current! > 1 && temp_board.pointer.index.current! < 7) {
              for (let i = 1; i < 4; i++) {
                const x =temp_board.pointer.value[i].x; 
                const y =temp_board.pointer.value[i].y;
                const nextP= getNextPosition({x,y});

                if ((nextP.x < 0 || nextP.x > 19) || (nextP.y < 0 || nextP.y > 9) || temp_board.matrix[nextP.x][nextP.y] != 0) {
                  out_matrix = true;
                  break;
                }
              }
              if (!out_matrix) {
                for (let i = 1; i < 4; i++) {
                  const x =temp_board.pointer.value[i].x; 
                  const y =temp_board.pointer.value[i].y;
                  const nextP= getNextPosition({x,y});
                  temp_board.pointer.value[i].x=nextP.x
                  temp_board.pointer.value[i].y=nextP.y
                  temp_board.matrix[nextP.x][nextP.y]= temp_board.pointer.index.current!
                  
                }
                return temp_board;
              }
            }
            if(temp_board.pointer.index.current == 7){

              if (temp_board.pointer.value[0].y+1 == temp_board.pointer.value[1].y) {//acostada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer.value[i].x;
                  const y = temp_board.pointer.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer.value[0].x;
                  const limit = temp_board.pointer.value[0].x + 4;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 19) || temp_board.matrix[i][temp_board.pointer.value[1].y] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer.value[0].x;
                  const limit = temp_board.pointer.value[0].x + 4;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer.value[counter].x= i;
                    temp_board.pointer.value[counter].y= temp_board.pointer.value[1].y;
                    temp_board.matrix[i][temp_board.pointer.value[1].y] = temp_board.pointer.index.current
                    counter++;
                  }
                  return temp_board;
                }
              }
              else{//levantada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer.value[i].x;
                  const y = temp_board.pointer.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer.value[0].y-1;
                  const limit = temp_board.pointer.value[0].y + 3;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 9) || temp_board.matrix[temp_board.pointer.value[2].x][i] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer.value[0].y-1;
                  const limit = temp_board.pointer.value[0].y + 3;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer.value[counter].x= temp_board.pointer.value[0].x;
                    temp_board.pointer.value[counter].y= i;
                    temp_board.matrix[temp_board.pointer.value[0].x][i] = temp_board.pointer.index.current
                    counter++;
                  }
                  return temp_board;
                }
              }
            }
            
          }

          if(keypressed == "z" || keypressed == "Z"){
            const getNextPosition = (obj:{x:number,y:number}) => {
              const middle_x:number = temp_board.pointer.value[0].x;
              const middle_y:number = temp_board.pointer.value[0].y;
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
              temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = 0;
            }
            //double step rotation pattern case
            if (temp_board.pointer.index.current! > 1 && temp_board.pointer.index.current! < 7) {
              for (let i = 1; i < 4; i++) {
                const x =temp_board.pointer.value[i].x; 
                const y =temp_board.pointer.value[i].y;
                const nextP= getNextPosition({x,y});
                if ((nextP.x < 0 || nextP.x > 19) || (nextP.y < 0 || nextP.y > 9) || temp_board.matrix[nextP.x][nextP.y] != 0) {
                  out_matrix = true;
                }
              }
              if (!out_matrix) {
                for (let i = 1; i < 4; i++) {
                  const x =temp_board.pointer.value[i].x; 
                  const y =temp_board.pointer.value[i].y;
                  const nextP= getNextPosition({x,y});
                  temp_board.pointer.value[i].x=nextP.x
                  temp_board.pointer.value[i].y=nextP.y
                  temp_board.matrix[nextP.x][nextP.y]= temp_board.pointer.index.current!
                  
                }
                return temp_board;
              }
            }
            if(temp_board.pointer.index.current == 7){
              if (temp_board.pointer.value[0].y+1 == temp_board.pointer.value[1].y) {//acostada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer.value[i].x;
                  const y = temp_board.pointer.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer.value[0].x;
                  const limit = temp_board.pointer.value[0].x + 4;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 19) || temp_board.matrix[i][temp_board.pointer.value[1].y] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer.value[0].x;
                  const limit = temp_board.pointer.value[0].x + 4;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer.value[counter].x= i;
                    temp_board.pointer.value[counter].y= temp_board.pointer.value[1].y;
                    temp_board.matrix[i][temp_board.pointer.value[1].y] = temp_board.pointer.index.current
                    counter++;
                  }
                  return temp_board;
                }
              }
              else{//levantada
                for (let i = 0; i < 4; i++) {
                  const x = temp_board.pointer.value[i].x;
                  const y = temp_board.pointer.value[i].y;
                  temp_board.matrix[x][y] = 0;
                }
                let out_matrix = false;
                  const startingP = temp_board.pointer.value[0].y-1;
                  const limit = temp_board.pointer.value[0].y + 3;
                  for (let i = startingP; i < limit; i++) {
                  if ((i < 0 || i > 9) || temp_board.matrix[temp_board.pointer.value[2].x][i] != 0){
                    out_matrix = true
                    break;
                  }
                  
                }
                if (!out_matrix) {
                  let counter = 0;
                  
                  const startingP = temp_board.pointer.value[0].y-1;
                  const limit = temp_board.pointer.value[0].y + 3;
                  for (let i = startingP; i < limit; i++) {
                    temp_board.pointer.value[counter].x= temp_board.pointer.value[0].x;
                    temp_board.pointer.value[counter].y= i;
                    temp_board.matrix[temp_board.pointer.value[0].x][i] = temp_board.pointer.index.current
                    counter++;
                  }
                  return temp_board;
                }
              }
            }
            
          }

          for (let i = 0; i < 4; i++) {
            temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y] = temp_board.pointer.index.current!; //PROBABLY AN ERROR BECAUSE OF temp_board instead of board (idky)
          }

        }
        // refill the original matrix in case nothing has to happen (if I return the same value as before, react does unpredictable scenarios)
        
        return temp_board;
      })
  }

  const levelup = (_counter:number):void=>{
      const map: Levels = {380:"1",620:"2",1000:"3",1600:"4",2000:"5"};
      if (_counter in map){
        let lvl = parseInt(map[_counter as keyof Levels]);
        setscore(last => {
          lvl = Math.max(lvl, last.level);
          return {
          level:lvl,score:last.score}}
        )
        increaseSpeed();
      }
  } 

  const selfLevelup = ()=>{
      setscore(last => {
        const newlvl = last.level <5 ? last.level+1 : last.level;
        return {level:newlvl,score:last.score}})
      increaseSpeed();
} 
  

  useEffect( ()=>{//this guy will change the matrix every 'speed' seconds
    // 'X' ARE GOING TO BE THE ROWS AND 'Y' THE COLUMNS (Ik it doesn't make sense but it was the way I saw it)
    setTimeout(()=>{
      levelup(counter);
      setboard(lastBoard => {
        if(board.matrix.length != 0){

          let temp_board:Board=JSON.parse(JSON.stringify(lastBoard));
  
          if(temp_board.pointer.index.current){
            
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
                temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=temp_board.pointer.index.current!;
              }

              setcounter(last => last + 1);
              return temp_board;
            }
            else{
              let rows_burned =0;
              for (let i = 0; i < 4; i++) {
                temp_board.matrix[temp_board.pointer.value[i].x][temp_board.pointer.value[i].y]=temp_board.pointer.index.current!;
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
                  // filling first row (the row is not always going to be empty)
                  for (let temp_i = 0; temp_i < 10; temp_i++) {
                    temp_board.matrix[0][temp_i] = 0;
                  }
                }
              }


              //(before) restart

                setscore(last => {return {level:last.level,score: last.score +Math.floor(Math.pow((4*rows_burned*(0.25*last.level+0.75)),1.5))}});
                setcounter(last => last + 1);
                return {matrix:temp_board.matrix,pointer:{index:{current:null,next:temp_board.pointer.index.next},value:[]}}
              
            }
            
          }else{//In case there's the need for a new figure
              //random figure selector algorithm
              let index_figure=Math.floor(Math.random()*7+1);
              const next_piece = temp_board.pointer.index.next;
              const positions = JSON.parse(JSON.stringify(figures.inf[next_piece].positions));

              for(const element of positions){
                if(temp_board.matrix[element.x][element.y] != 0){
                  //PLAYER DIED
                  setonMenu(true);
                  return {matrix:temp_board.matrix,pointer:{value:[],index:{current:null,next:1}}};
                }
              }
              for (let i = 0; i < 4; i++) {
                const x =figures.inf[next_piece].positions[i].x;
                const y =figures.inf[next_piece].positions[i].y;
                
                temp_board.matrix[x][y]=next_piece;
                
            }
            //NEXT: IF THE MATRIX HAS A VALUE DIFFERENT THAN 0 IN THESE POSITIONS, THE PLAYER DIES.
            
            
            setcounter(last => last + 1);
            
            return {matrix:temp_board.matrix,pointer:{value:positions,index:{current:next_piece,next:index_figure}}};
          }
          
        }
        return lastBoard;

      });


     
    },speed);
  },[counter]);

  const retryGame:()=>void = ()=>{
  
    setboard({matrix:emptyMatrix(),pointer:{index:{current:null,next:Math.floor(Math.random()*7+1)},value:[]}});
    setonMenu(false);
    setcounter(0);
    setspeed(1000);
    setscore({level:0,score:0});
    settimer(0);
    buttonref.current!.innerHTML="Increase speed";
  }



  return <div tabIndex={0} className="bg-costum-background h-screen w-screen relative flex flex-col justify-start focus:outline-none" onKeyDown={(e) => { keyeventhandler(e) }}>
    <button onClick={()=>{
      alert(`Use the arrows to move the pieces to the sides and down. You can press the spacebar to drop the pieces instantly. Feel free to use the 'Increase Speed' button if you get bored!`)
    }} className="m-6 h-9 w-28 text-white absolute right-0 bottom-0 bg-[#6857b6] border-solid border-2 border-[#5a49a6] rounded-lg">
      Controls ℹ
    </button>
    <div id="main content" className="flex justify-center">
      <div className="mt-16 mr-4 font-semibold">
        timer:{timeConverter(timer)}
      </div>
      <div className="mt-3">
        <button className="w-96 h-7 bg-[#6857b6] border-solid border-2 border-[#5a49a6] rounded-lg text-white  font-semibold" id="123" ref={buttonref} onClick={selfLevelup}>Increase speed</button>
        <div className="h-7 text-center  font-semibold">Current level: {score.level}</div>
        <Menu retryfunc={retryGame} visible={onMenu} score={score.score}/>
        <Boardt matrix={board.matrix} pointer={board.pointer}/>
      </div>
      <div className="mt-16">
        <NextPiece index={board.pointer.index.next} score={score.score}/>
      </div>
    </div>
  </div>


}