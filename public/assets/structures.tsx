
export interface Pointer{
    value: {x:number, y:number}[],
    index: {current:number|null,next:number}
}

export interface Board  {
  matrix : number[][],
  pointer: Pointer
}

export interface Score{
  level:number,
  score:number
}

export interface Levels{
  [key: number]:string;
}