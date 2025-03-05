import './globals.css'
import { Metadata } from "next";

export const metadata:Metadata ={
  title:"Matrix Tetris",
  description:"Tetris made with react, typecript, next.js by using a two-dimensional list and playing with its values. No canvas used",
  icons: {
    icon:'/icon.png'
  }
}


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }