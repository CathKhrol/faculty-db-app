import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Axios from "axios";
import "./ViewStudents.css";
import Loading from "../Loading/Loading";

function ViewStudents() {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const [done, setDone] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    const getStudents = async () => {
      if (location.pathname === `/students/view/${id}`) {
        Axios.get(`http://localhost:3001/students/view/${id}`).then(
          (response) => {
              setUser(response.data);
              setDone(true);
          }
        );
      }
      else if (location.pathname === `/students/archievedStudent/view/${id}`) {
        Axios.get(`http://localhost:3001/students/view/${id}`).then(
          (response)=> {
            setUser(response.data);
            setDone(true);
        });
      }

    };
    getStudents();
  }, [id, location]);

  return (
    <div style={{ marginTop: "40px" }}>
      { done? <div className="card">
        <div className="card-header">
          <p>Информация о студенте</p>
        </div>

        { user.map((val) => (
          <div className="container" key = { val[0] }>
            <strong>Номер зачётной книжки: </strong>
            <span>{ val[0] }</span>
            <br />
            <br />

            <strong>Фамилия: </strong>
            <span>{ val[1] }</span>
            <br />
            <br />

            <strong>Имя: </strong>
            <span>{ val[2] }</span>
            <br />
            <br />

            <strong>Отчество: </strong>
            <span>{ val[3] }</span>
            <br />
            <br />

            <strong>Факультет: </strong>
            <span>{ val[4] }</span>
            <br />
            <br />

            <strong>Специальность: </strong>
            <span>{ val[5] }</span>
            <br />
            <br />

            <strong>Курс: </strong>
            <span>{ val[6] }</span>
            <br />
            <br />

            <strong>Группа: </strong>
            <span>{ val[7] }</span>
            <br />
            <br />

            <strong>Количество семестров обучения: </strong>
            <span>{ val[8] }</span>
            <br />
            <br />

            <strong>Дата поступления: </strong>
            <span>{ val[9] }</span>
            <br />
            <br />

            <strong>Дата окончания: </strong>
            <span>{ val[10] }</span>
            <br />
            <br />

            <strong>Статус студента: </strong>
            <span>{ val[11] }</span>
            <br />
            <br />
            <div className = "buttons">
              <Link to={(location.pathname === `/students/view/${id}`)? "/students" : "/students/archievedStudent"}> <button className='btn btn-back'> Вернуться</button></Link>
              <Link to={`/students/update/${val[0]}`}> <button className='btn btn-edit-stud'> Редактировать</button></Link>
            </div>
            
          </div>
        ))}
      </div> : <Loading/>}
      
    </div>
  );
}

export default ViewStudents;
