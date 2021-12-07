import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import  Axios from 'axios';

function FacultiesList() {
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        const getFaculties = async () => {
            Axios.get("http://localhost:3001/faculties").then((response)=> {
            setFaculties(response.data);
            });
        };
        getFaculties();
      }, []);

    return (
        <div style={{marginTop: "10px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th> № </th>
                        <th> Идентификатор факультета </th>
                        <th> Название факультета </th>
                        <th> Число семестров обучения </th>
                        <th> Action buttons </th>
                    </tr>
                </thead>

                <tbody>
                    { faculties.map((val, index) => {
                        return (
                            <tr key={ val[0] }>
                                <th scope="row">{index + 1}</th>
                                <td> { val[0] }</td>
                                <td> { val[1] } </td>
                                <td> { val[2] } </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FacultiesList