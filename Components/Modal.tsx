import React from 'react'
import CarCard from './CarCard'
import Form from './Form'

const Modal = ({car}:any) => {
  return (
  <form  className="modal-box  gap-4 bg-white w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Rent a car now!</h3>
<div className="grid grid-cols-1 mt-3  md:grid-cols-2">
    <div>
        <CarCard car={car}/>
    </div>
    <div>
        <Form car={car}/>
    </div>
</div>
<div className="flex justify-end">
  <button className="btn  mt-3">Close</button></div>
  </form>
)
}

export default Modal