import React from 'react'

const FormGroup = ({label,value,onChange}) => {
  return (
    <>
    <label htmlFor={label} >{label}: </label>
    <input onChange={onChange} type="text" id={label} value={value} placeholder={`Enter ${label}`} />
    </>
  )
}

export default FormGroup
