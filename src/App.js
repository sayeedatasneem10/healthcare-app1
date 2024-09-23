import {  useState,useRef,useEffect } from "react";
import Service from "./Service";
import './style.css'

const LOCAL_STORAGE_KEY='services'

function App() {
  const [service,setService]=useState(healthServices)
  const [editService,setEditService]=useState(null)
  const nameRef=useRef()
  const descRef=useRef()
  const priceRef=useRef()

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedServices) setService(storedServices)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(service))
  }, [service])


  function onSubmit(e){
    e.preventDefault()
    const name=nameRef.current.value
    const desc=descRef.current.value
    const price=priceRef.current.value

    if(editService === null){
    setService(prevService =>{
      return [...prevService,{name:name, description:desc, price:price}]
    })
  }else{
    setService((prevService) =>
    prevService.map((service) =>
      service.name === editService.name ? {...service,name:name,description:desc,price:price} : service
    )
    )
    
    setEditService(null)
  }
  nameRef.current.value = "";
  descRef.current.value = "";
  priceRef.current.value = "";

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(service))
  }

  function deleteService(name){
    const newService=service.filter(service => service.name !== name)
    setService(newService)
  }

  function updateService(name){
    const newService=[...service]
    const selectedService=newService.find(serv => serv.name === name)

    nameRef.current.value=selectedService.name
    descRef.current.value=selectedService.description
    priceRef.current.value=selectedService.price

    // newService.name=nameRef.current.value
    // newService.description=nameRef.current.value
    // newService.price=nameRef.current.value
    setEditService(selectedService)
    console.log(editService)
    // setService(newService)
  }

  return (
    <>
    <h1> WELCOME TO JARURAT CARE</h1>
    <div className="main-container">
      <div className="form-container">

        <form onSubmit={onSubmit} className="form">
        <p className="title">Add Health Service</p>
        <div className="formgroup">
        <label>Name : </label>
        <input type="text" ref={nameRef} placeholder="Enter Name of service" />
        </div>
        <div className="formgroup desc">
        <label>Description : </label>
        <textarea ref={descRef} placeholder="Describe service" rows={5} cols={51} />
        </div>
        <div className="formgroup">
        <label>Price : </label>
        <input type="number" ref={priceRef} placeholder="Enter price" />
        </div>
        <div className="formgroup">
        <button className="submit">Submit</button>
        </div>
        </form>
      </div>

      <div className="service-list">
        <ul>
          {
            service.map((service) =>{
              return <Service name={service.name} service={service} deleteService={deleteService} updateService={updateService}></Service>
            })
          }
        </ul>
      </div>
    </div>
    </>
  );
}

const healthServices=[
  {
    name:'General Consultation',
    description:'A general consultation with a primary care doctor for diagnosis and treatment of common illnesses, preventive care, and health advice.',
    price:5000
  },
  {
    name:'Dental Checkup and Cleaning',
    description:'Routine dental care includes a comprehensive checkup, teeth cleaning, and examination for cavities, gum disease, or other oral health issues.',
    price:10000
  },
  {
    name:'Mental Health Counseling',
    description:'Therapy and counseling sessions aimed at improving mental health through talk therapy, cognitive behavioral therapy, or psychiatric evaluation for conditions like depression, anxiety, or stress.',
    price:15000
  },

]

export default App;
