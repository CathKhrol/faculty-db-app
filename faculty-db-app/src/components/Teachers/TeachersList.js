import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import  Axios from 'axios';
import {ToastContainer} from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Loading from '../Loading/Loading';

function TeachersList() {
    const [teachers, setTeachers] = useState([]);
    const [done, setDone] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const teachersPerPage = 8;
    const pagesVisited = pageNumber * teachersPerPage;


    const displayTeachers = teachers
    .slice(pagesVisited, pagesVisited + teachersPerPage)
    .map((val, index) => {
        return (
            <tr key={ val[0] }>
                <th scope="row">{index + 1}</th>
                <td> { val[0] } </td>
                <td> { val[1] } </td>
                <td> { val[2] } </td>
                <td> { val[3] } </td>
                <td> { val[4] } </td>
                <td> { val[5] } </td>
                <td>
                    <Link to={`./view/${val[0]}`}>
                        <button className='btn btn-view'>Просмотреть</button>
                    </Link>
                    <Link to={`./update/${val[0]}`}>
                        <button className='btn btn-edit'>Редактировать</button>
                    </Link>
                </td>
            </tr>
        )
    });


    const pageCount = Math.ceil(teachers.length / teachersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        const getTeachers = async () => {
            Axios.get("http://localhost:3001/teachers").then((response)=> {
                setTeachers(response.data);
                setDone(true);
                setPageNumber(0);
            });
            
        };
        getTeachers();
      }, []);

    return (
       <div style={{marginTop: "50px", display: "block"}}>
            <ToastContainer />
            { done? <table className="styled-table">
                <thead>
                    <tr>
                        <th> № </th>
                        <th> Персональный номер </th>
                        <th> Фамилия</th>
                        <th> Имя </th>
                        <th> Факультет </th>
                        <th> Кафедра </th>
                        <th> Зачисление на должность </th>
                        <th> Action Buttons</th>
                    </tr>
                </thead>

                <tbody>
                    { displayTeachers }
                </tbody>
            </table> : <Loading/>}
            { done? <ReactPaginate
                      previousLabel={"Предыдущая страница"}
                      nextLabel={"Следующая страница"}
                      breakLabel="..."
                      pageCount={pageCount}
                      pageRangeDisplayed={2}
                      marginPagesDisplayed={1}
                      forcePage={pageNumber}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                      /> : ""}
            
        </div>
    )
}

export default TeachersList
