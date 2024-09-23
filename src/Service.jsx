import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Service({service,deleteService,updateService}) {

  function delService(){
    deleteService(service.name)
  }

  function updtService(){
    updateService(service.name)
  }

  return (
    <>
    <div className='list-item'>
        <div className='title-btns'>
        <h2>{service.name}</h2>
        <div className='btns'>
        <button onClick={updtService}><FaRegEdit/></button>
        <button onClick={delService}><MdDelete/></button>
        </div>
        </div>
      <p className='description'>{service.description}</p>
      <p className='price'>Price :{service.price} Rs/-</p>
    </div>
    </>
  )
}
