import { NextRequest , NextResponse } from 'next/server';
import db from '@/db'
interface PostData{
    name: string;
    title: string;
    content: string

}


export const POST = async (
    req: NextRequest,
) : Promise<NextResponse> =>{
    if(req.method === 'POST'){
        try{
            const {name, title, content}: PostData = JSON.parse(await req.text());
            console.log(name, title, content)
            // 정상적인 데이터를 먼저 체크하기도 함 
            if(!name || !title || !content){
                return NextResponse.json({message : "데이터가 부족합니다."});
            }else{
                // select - 선택 / insert - 입력 / delete - 삭제 / update - 수정 / 
                const [results] = await db.query(
                    // mysql에서 내 스키마의 테이블 입력 후 (데이터를 넣는 순서는 상관 없음) values(?,?,?)변수로 넣어주고, [데이터에대입]
                    'insert into new_schema.board (author, title, content) values(?, ?, ?)', [name, title, content]
                ) 
                return NextResponse.json({message : "성공", result: results});
            }
        }catch(error){
            return NextResponse.json({error : "에러"});
        }
    }else{
        return NextResponse.json({error : "정상적인 데이터가 아닙니다."});
    }

}