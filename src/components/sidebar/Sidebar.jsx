import React, { useRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './Sidebar.scss'
import { data } from './constant';

const Sidebar = () => {

    const activeHandler = (e) =>{
        if (!e.target.className){
            e.target.className = "active"
        }
    }

    return (
        <div className='sidebar'>
            <div className='logo'>
                shop.co
            </div>
            <div className='menu'>
                <ul>
                    {
                        data.map(({icon,name,linkTo}, index)=>{
                            return (
                                <li key={name} onClick={(e)=> activeHandler(e)}>
                                    {icon}
                                    <span>{name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar