import db from '@/db';
import { NextRequest , NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';
import { promises } from 'dns';
// http://localhost:3000/api/post?page=1


export const GET = async(
    req: NextRequest,
    res: NextResponse

) : Promise<NextResponse> =>{
   
    if(req.method === 'GET'){
        // console.log(req.nextUrl.searchParams.get("page")); 
        // console.log(req.nextUrl.searchParams);
        console.log(req.nextUrl.searchParams.get("page"))
        const page = Number(req.nextUrl.searchParams.get("page"));
        //페이지 네이션
        //  데이터 몇개씩 보여줄지
        const perPage = 15;
        //offset이 변수로 들어가서 아래 try문에서 실시간으로 계속 바뀌어줌.
        const offset = (page - 1) * perPage;

        try{
            // 복사한 스키마 넣어주기.  limit 10 데이터 10개만 offset 10 데이터 10개를 뛰어넘은것 그러니까 2page 20하면 3페이지 이런식임. order by payment_date
            // 쿼리를 넣을때 변수를 넣을 수 있음 문법이 있음 물음표를 넣으면 됨 mysql2에서 쓰는 문법배열 값을 넣어주면 차례대로 들어감
            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM sakila.payment order by payment_date limit ? offset ?' , [perPage, offset]);
            // count함수 있음
            const [countResult] = await db.query<RowDataPacket[]>('SELECT count(*) as cnt from sakila.payment');
            //데이터의 총 개수 
            const totalCnt = countResult[0].cnt;
            console.log(results)
            
            // json데이터에 값/토탈개수/현재페이지/현재페이지에서 몇개 데이터 출력
            return NextResponse.json({message: "성공", results, totalCnt, page, perPage})
        }catch(error){
            return NextResponse.json ({error : error})
        }
    }

    return NextResponse.json({error : "에러가 발생하였습니다."})

}

