import React from 'react'

const FormGroup = ({label}) => {
  return (
    <>
    <label htmlFor={label} ></label>
    <input type="text" id={label} placeholder={`Enter ${label}`} />
    </>
  )
}

export default FormGroup
