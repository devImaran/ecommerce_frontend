import React from 'react'
import './Dashboard.scss'

const Dashboard = ({ sidebar, children }) => {
    return (
        <div className='dashboard'>
            <div className='sidebar'>{sidebar}</div>
            <div className='children'>{children}</div>
        </div>
    )
}

export default Dashboard