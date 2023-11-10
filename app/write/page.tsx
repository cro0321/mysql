'use client';
import {useState } from "react";
import Link from "next/link";
interface formType {
    name: string;
    title: string;
    content: string;
}

export default function Write() {
    const [formData, setFormData] = useState<formType>({
        name: '',
        title: '',
        content: ''

    })

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData, [e.target.name] : e.target.value});
        console.log(formData) 
    }

    const submitEvent = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
           try{
            const res = await fetch('/api/write',{
                method : 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                console.log(data.message);
                // alert('정상적으로 등록 하였습니다.');
                window.location.href = '/'
            }else{
                const errorData = await res.json();
                console.log(errorData.error);
            } 
           }catch(error){
            console.log(error);
           }
     
}

    return (
       <>
        <form method="post" className="flex flex-col items-center justify-center bg-white p-5 shadow-md rounded-lg w-1/2 mx-auto "  onSubmit={submitEvent}>
                <input type="text" name="name" defaultValue={formData.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-10" />
                <input type="text" name="title" defaultValue={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-10" />
                <textarea name="content" defaultValue={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-full p-2 rounded h-32" />
                <div className="flex justify-between w-full mt-4">
                    <Link href="/" className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none h-10" >취소</Link>
                    <button className="bg-slate-500 text-white px-4 py-2 rounded shadow-md hover:bg-slate-600 focus:outline-none h-10">등록</button>
                </div>
            </form>
       </>
    )
}

