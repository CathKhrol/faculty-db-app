import React from 'react';
import './Faculties.css';
import FacultiesList from './FacultiesList';

function Faculties() {
    
    return (
        <div className='faculties'>
            <div className='container1'>
                <div className='container2'>
                    <h1>Факультеты БГУ</h1>
                    <div className='container3'>
                        <FacultiesList />

                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Faculties
