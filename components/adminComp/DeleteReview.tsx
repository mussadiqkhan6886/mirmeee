'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';

const DeleteReview = ({id}: {id: string}) => {

    const [result, setResult] = useState("")

    const deleteTest = async () => {
        const res = await axios.delete(`/api/testimonials/${id}`)
        if(res.data.success){
            setResult("Review Deleted Successfully")
        }else{
            setResult("Review Failed to Delete")
        }
    }
    

  return (
    <>
    <button onClick={deleteTest} className="text-red-600 cursor-pointer hover:text-red-800">
        <FaTrash />
    </button>
    <p>{result}</p>
    </>
  )
}

export default DeleteReview
