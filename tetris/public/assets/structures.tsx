
export interface Pointer{
    value: {x:number, y:number}[],
    index: number
}

export interface Board  {
  matrix : number[][],
  pointer: Pointer | null
}