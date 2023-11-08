'use client';
import Link from "next/link";

import React, { useEffect, useState } from "react";
interface PostList{
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : number;
}


export default function Post() {
    const [posts, setPosts] = useState<PostList[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [page, setPage] = useState<number>(1)


    // const router = useRouter();
    // console.log(router.query)
    
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const res = await fetch("/api/post");
            //     const data = await res.json();
            //     setPosts(data.results);
            //     console.log(data.results)   
            // } catch (error) {
            //     console.log(error);
            // }
            // 주소창에서 post의 page 값이없으면 실행 nono되게
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();
            setPosts(data.results);
            setTotalCnt(data.totalCnt);
            console.log(data)
        }
        fetchData()
    }, [page]);
    // ceil -숫자 올림
    const lastPage = Math.ceil(totalCnt/15);
    const totalPageCnt = 5;
    // floor - 숫자 버림
    const startPage = Math.floor((page-1)/ totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
    //이전
    const prevPage = () =>{
        const prevStart = Math.floor((page -1 ) / 5) * 5 - 4;
        setPage(prevStart)
    }
    
    //다음
    const nextPage = () =>{
        const nextStart = Math.ceil((page + 1) / 5) * 5 + 1;
        setPage(nextStart)
    }
    return(
       <>

       <div className="mx-auto max-w-7xl p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">게시판</h1>
            <Link href = "/write" className="bg-slate-500 text-white px-4 py-2 rounded shadow-md hover:bg-slate-600">글쓰기</Link>
        </div>
        <div className="bg-white shadow-md rounded-lg">
        <div className="min-w-full">
            <ul className="bg-gray-100 flex justify-between">
                <li className="px-6 py-3 basis-2/12 text-center">번호</li>
                <li className="px-6 py-3 basis-6/12 text-center">제목</li>
                <li className="px-6 py-3 basis-2/12 text-center">작성자</li>
                <li className="px-6 py-3 basis-2/12 text-center">작성일</li>
            </ul>
            {
            posts && posts.map((e,i)=>{
                const date = new Date(e.date);
                const year = date.getFullYear();
                const month = (date.getMonth() +1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const formatDate = `${year}-${month}-${day}`


            return(
                <ul key={i} className="flex justify-between">
                    <li className="px-6 py-3 basis-2/12 text-center">{posts.length - i}</li>
                    <li className="px-6 py-3 basis-6/12 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                    <li className="px-6 py-3 basis-2/12 text-center">{e.author}</li>
                    <li className="px-6 py-3 basis-2/12 text-center">{formatDate}</li>
                </ul>
            )
            }) 
        }
        </div>
        </div>
       </div>
     


        {/* 다음을 누르면 5페이지씩 넘어가게 하기 */}
        <div className="flex justify-center gab-x-5 mb-5">
            {/*  onClick={()=>{setPage(page - 5)}} */}
       {page > 5 && <button className="bg-white border px-1.5 py-1 rounded text-sm" onClick={()=>{prevPage()}}>이전</button>}
        
       {/* {page > 1 && <button onClick={()=>{setPage(page - 1)}}>이전</button>} */}
        {
            Array(endPage - startPage + 1).fill(null).map((_,i)=>
            {
                const pageNumber = i +startPage
                return(        
                
                    <button  className={`${pageNumber === page ? 'bg-purple-400 text-white ' : '  bg-white '} border px-1.5 py-1 rounded text-sm basis-8 `} key={pageNumber} onClick={()=>{setPage((pageNumber));}}>{pageNumber}</button>
                )

            })
        }

        {/* 다음을 누르면 5페이지씩 넘어가게 하기 */}

{/* onClick={()=>{setPage(page + 5) */}
        {page < lastPage && <button className="bg-white border px-1.5 py-1 rounded text-sm" onClick={()=>{nextPage()}}>다음</button>}
       {/* {page < lastPage && <button onClick={()=>{setPage(page + 1)}}>다음</button>} */}
       </div>
       
       </>
    )
}