'use client';

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { UserInfo } from 'os';

interface userInfo {
    name: string;
    email: string;
    image: string;
}


interface PropsData {
    session: userInfo | null
}


export default function Login({ session }: PropsData) {
    return (
        <>
        {
                    session && session.user.level === 10? '관리자' : session && session.user !== null && '일반회원'
                }

            {
                
                session && session.user ? <button className=" mt-11 mx-6 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => { signOut() }}>로그아웃</button> :
                    <>
                    <div className="flex space-x-4 items-center mx-6 mt-11">
    <Link href="/register" className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        회원가입
    </Link>
    <button onClick={() => { signIn('kakao') }} className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
        카카오로그인
    </button>
    <button onClick={() => { signIn('naver') }} className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        네이버로그인
    </button>
    <button onClick={() => { signIn('github') }} className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
        깃허브로그인
    </button>
    <button onClick={() => { signIn('google') }} className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        구글로그인
    </button>
    <button onClick={() => { signIn('credential') }} className="w-full text-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-800 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
         로그인 메일
    </button>
</div>
                    </>
            }
      
        </>
    )
}
// <button onClick={()=>{signIn('kakao')}}>카카오로그인</button>
{/* <button onClick={()=>{signIn('naver')}}>네이버로그인</button>
<button onClick={()=>{signIn('github')}}>깃허브로그인</button>
<button onClick={()=>{signIn('google')}}>구글로그인</button> */}