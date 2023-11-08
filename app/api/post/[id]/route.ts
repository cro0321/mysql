import db from '@/db'
import React, { useEffect, useState } from "react";
import { NextRequest , NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';


export const GET = async (req:NextRequest) : 
Promise<NextResponse>=>{
    const pathname = req.nextUrl.pathname;
    const postId = pathname.split('/').pop()
    // SELECT * FROM new_schema.board where id = 3 여기서 3이 변수로 들어가 준다.
    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM new_schema.board where id = ?', [postId])
    return NextResponse.json({data: results})
}



export const POST = async (req : NextRequest) : Promise<NextResponse> =>{
  
    if(req.method === 'POST'){
        return NextResponse.json({messgae: "메세지"})
    }else{
        return NextResponse.json({error: "에러"})
    }
}
