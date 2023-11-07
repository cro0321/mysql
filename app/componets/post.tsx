'use client';
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(1)


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
        {
            posts && posts.map((e,i)=>{
            return(
                <React.Fragment key={i}>
                <p>현재페이지 : {page}</p>
                <p>가격 : {e.amount}</p>
                <p>결제일자 : {e.payment_date}</p>
                </React.Fragment>
            )
            }) 
        }
       </>
    )
}