import React from 'react'
import './CreateComp.css'
import { useRef } from 'react';
import { useState } from 'react';

function CreateComp() {
    async function handleSubmit(e) {
        e.preventDefault()
        const category = categoryRef.current.value;
        const message = messageRef.current.value;
        const url = 'http://localhost:5000/complaints'
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category, message })
        })
        const data = await res.json()
        console.log(data);
        messageRef.current.value = ''
        setMode({...mode,class:'shown'})
    }

    const [mode, setMode] = useState({message:'Complaint added succesfuly',class:'hiden'})

    const messageRef = useRef()
    const categoryRef = useRef()
    return (
        <form onSubmit={handleSubmit}>
            <h1>wellcom</h1>
            <select ref={categoryRef} >
                <option value="food">Food</option>
                <option value="commans">Commans</option>
                <option value="more">More</option>
            </select>
            <textarea ref={messageRef} type="text" placeholder='Plese enter message' />
            <button type="submit">Submit</button>
            <p className={mode.class}>{mode.message}</p>
        </form>
    )
}

export default CreateComp