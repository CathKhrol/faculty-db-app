import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import  Axios from 'axios';
import {ToastContainer} from 'react-toastify';
import ReactPaginate from 'react-paginate';
import './StudentsList.css';
import Loading from '../Loading/Loading';

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [done, setDone] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const studentsPerPage = 8;
    const pagesVisited = pageNumber * studentsPerPage;

    const location = useLocation();

    const displayStudents = students
    .slice(pagesVisited, pagesVisited + studentsPerPage)
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

    const pageCount = Math.ceil(students.length / studentsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        const getStudents = async () => {
            if (location.pathname === "/students") {
                Axios.get("http://localhost:3001/students").then((response)=> {
                    setStudents(response.data);
                    setDone(true);
                    setPageNumber(0);
                });
            }
            else if (location.pathname === "/students/archievedStudent") {
                Axios.get("http://localhost:3001/students/archievedStudent").then((response)=> {
                    setStudents(response.data);
                    setDone(true);
                    setPageNumber(0);
                });
            }
        };
        getStudents();
      }, [location]);

    return (
        <div style={{marginTop: "50px", display: "block"}}>
            <ToastContainer />
            { done? <table className="styled-table">
                <thead>
                    <tr>
                        <th> № </th>
                        <th> Номер зачётной книжки </th>
                        <th> Фамилия</th>
                        <th> Имя </th>
                        <th> Факультет </th>
                        <th> Специальность </th>
                        <th> Дата поступления </th>
                        <th> Action Buttons</th>
                    </tr>
                </thead>

                <tbody>
                    { displayStudents }
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

export default StudentsList
