import { NextRequest , NextResponse } from 'next/server';
import db from '@/db'
import bcrypt from 'bcrypt';
import {  } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';
interface formType{
    email : string;
    password : string;
    name: string
}

// http://localhost:3000/api/auth/signup?email=123&password=456&name=dddd
export const POST = async (
    req: NextRequest
) : Promise<NextResponse> =>{
    if(req.method === 'POST'){
        //보낼때 json으로 보내고 다시 받을때 req.text는 text형태로 받아서 text형태로 받은걸 json형태로 parse해서 정상적인 데이터로 보이게 만드는거
        //폼으로 받을때 text로 받기 때문에 json을 
        // 1.이메일 정보를 받는다 2. 데이터베이스에서 조회 3.없으면 가입시키고 있으면 튕긴다.
        const {email, password, name} : formType = JSON.parse (await req.text());
        const hash = await bcrypt.hash(password, 10);
        const [checkMember] = await db.query<RowDataPacket[]>('select count (*) as cnt from new_schema.member where email =? ' , [email]);
        const memberCnt = checkMember[0].cnt;
        // 아이디가 있다면 팅궈내기.
        if(!email || !password || !name){
            return NextResponse.json({message:"데이터가 부족합니다"})
        }

        if(memberCnt >0){
            return NextResponse.json({message:"해당 이메일이 존재합니다."})
        }else{
            const [results] = await db.query('insert into new_schema.member (email, password, name) values(?, ?, ?)' , [email, hash, name])
            return NextResponse.json({message : "성공" , data : results})

        }

        // console.log(email, password, name)
        // console.log(hash)
        //필드는 password가 맞지만 hash된 정보가 들어가야함.
      
    }else{
        return NextResponse.json({error : "실패"})    
    }
}

/* : Promise<NextResponse> =>{
    if(req.method === 'POST')
    return NextResponse.json({message : "성공"})
}else{
    return NextResponse.json({error : "실패"})

} */