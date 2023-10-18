import React from 'react'
import './Button.scss'

const Button = ({ type, text, bg, color, borderColor }) => {
    return (
        <button type={type} style={{ background: bg, color: color, border:`1px solid ${borderColor}` }} className='button'>{text}</button>
    )
}

export default Button