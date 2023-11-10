// ssr로 만듦
// 데이터베이스 가져옴
import db from '@/db'
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import {useState } from "react";
interface PostList{
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : number;
}
interface editProps{
    params : {
        id: string;
    }
}


export default async function Edit(props:editProps){
    //ssr에서는 console.log를 찍으면 터미널 콘솔에 뜨게 된다. 데이터가 바로 나옴.
    console.log(props.params.id)
    // 내 스키마의 id값을 ?(변수로 가져옴)
    const [results] = await db.query<RowDataPacket[]>('select * from new_schema.board where id = ?' , [props.params.id]);
    // const [results] = await db.query<RowDataPacket[]>('update * from new_schema.board set title = ?, content = ? where id = ?' , [title, content, id]);
  
    // .content 내용 / .author 원래있는 값을 가져와야해서 defaultValue
    console.log(results[0].content)
    // 수정 쿼리 'update 테이블명 set 필드 =변경값, 필드 = 변경값, 필드 = 변경값 where id = 변경할아이디'
    //('update new_schema.board.baord set title = ?, content = ? where id = ?', [title, content, id])



//results.length를 못쓰는 이유 : function이 지역변수라 지금 여기 안에서만 쓸 수 있음.
    return (
        <>
            {results.length > 0
            ?
            <form method="post" className="flex flex-col items-center justify-center bg-white p-5 shadow-md rounded-lg w-1/2 mx-auto">
            <input type="text"  name="name" className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-10" />
            <input type="text" name="title" className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-10" />
            <textarea name="content" className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-32" />
            <div className="flex justify-between w-full mt-4">
                <Link href="/" className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none h-10" >취소</Link>
                <button className="bg-slate-500 text-white px-4 py-2 rounded shadow-md hover:bg-slate-600 focus:outline-none h-10">등록</button>
            </div>
        </form>
              :
              <NotData/>
              }
        </>
    )
}

function NotData() {
    return(
        <>
            <p className=''>데이터가 존재하지 않습니다.</p>
            <Link href="/">목록</Link>
        </>
    )
    
}

// function Data(props) {
//     console.log(props.result)
//     return(
//         <>
//             <p className=''>데이터</p>
            
//         </>
//     )
    
// }