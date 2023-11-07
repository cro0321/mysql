'use client';
import { useEffect, useState } from "react";
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

    return (
       <>
         <form method="post">
            <input type="text" name = "name" defaultValue={formData.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border"/>
            <input type="text" name = "title" defaultValue={formData.title} onChange={changeEvent}  className="shadow text-gray-700 text-sm mb-2 border"/>
            <textarea name="content" defaultValue={formData.content} onChange={changeEvent}  className="shadow text-gray-700 text-sm mb-2 border"></textarea>
            <Link href="/"  className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none" >취소</Link>
            <button className="bg-slate-500 text-white px-4 py-2 rounded shadow-md hover:bg-slate-600 focus:outline-none">등록</button>
         </form>
       </>
    )
}

