
'use client';

import { useState } from "react";


interface formType{
    email : string;
    password : string;
    name: string
}

export default function Register(){
    const [formData, setFormData] = useState<formType>({
        email : '',
        password : '',
        name: ''
    })
    const [message, setMessage] = useState<string>("");
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
        console.log(formData)
    }
    const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            
            const res = await fetch('/api/auth/signup', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                if(data.message === '성공'){
                    alert("회원가입이 완료 되었습니다.")
                    window.location.href='/';
                }
                console.log(data)
                setMessage(data.message);
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
     <>
        <form onSubmit={submitEvent} method="POST" className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원 가입
        </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:rounded-lg sm:px-10">
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">
                    이메일
                </label>
                <input onChange={changeEvent} type="text" placeholder="이메일" name="email" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">
                    비밀번호
                </label>
                <input onChange={changeEvent} type="password" placeholder="비밀번호" name="password" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">
                    이름
                </label>
                <input onChange={changeEvent} type="text" placeholder="이름" name="name" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    가입
                </button>
            </div>
        </div>
    </div>
</form>
    </>
    )
}