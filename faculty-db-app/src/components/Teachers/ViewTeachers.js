import React, { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import Axios from "axios";
import "./ViewTeachers.css";
import Loading from "../Loading/Loading";

function ViewTeachers() {
    const [user, setUser] = useState([]);
    const [done, setDone] = useState(false)
  
    const { id } = useParams();
  
    useEffect(() => {
      const getStudents = async () => {
        
        Axios.get(`http://localhost:3001/teachers/view/${id}`).then(
        (response) => {
            setUser(response.data);
            setDone(true);
            }
        );
      };
      getStudents();
    }, [id]);
  
    return (
        <div style={{ marginTop: "40px" }}>
      { done? <div className="card">
        <div className="card-header">
          <p>Информация о преподавателе</p>
        </div>

        { user.map((val) => (
          <div className="container-teacher" key = { val[0] }>
            <strong>ID: </strong>
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

            <strong>Кафедра: </strong>
            <span>{ val[5] }</span>
            <br />
            <br />

            <strong>Должность: </strong>
            <span>{ val[6] }</span>
            <br />
            <br />

            <strong>Дата зачисления на должность: </strong>
            <span>{ val[7] }</span>
            <br />
            <br />

            <strong>Дата ухода с должности: </strong>
            <span>{ val[8] }</span>
            <br />
            <br />

            <div className = "buttons">
              <Link to="/teachers"> <button className='btn btn-back'> Вернуться</button></Link>
              <Link to={`/teachers/update/${val[0]}`}> <button className='btn btn-edit-stud'> Редактировать</button></Link>
            </div>
            
          </div>
        ))}
      </div> : <Loading/>}
      
    </div>
    )
}

export default ViewTeachers
