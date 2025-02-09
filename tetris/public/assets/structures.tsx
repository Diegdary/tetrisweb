
export interface Pointer{
    value: {x:number, y:number}[],
    index: number//{current:number|null,next:number|null}
}

export interface Board  {
  matrix : number[][],
  pointer: Pointer | null
}