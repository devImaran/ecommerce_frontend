import React from 'react'
import Input from '../../components/input/Input'
import './Form.scss'
import Button from '../../components/button/Button'

const FormLayout = ({formStyle, children, buttons, buttonLayout,onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
        <div className='input-area' style={formStyle == "row" ?{flexDirection: "row", flexWrap:"wrap"}:{flexDirection:"column"}}>
            {children}
        </div>

        <div className='buttons' style={{flexDirection:buttonLayout}}>
            {buttons.map(button=><Button type={button.type} text={button.name}/>)}
        </div> 
    </form>
  )
}

export default FormLayout