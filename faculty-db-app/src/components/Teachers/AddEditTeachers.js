import React, {useState, useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import  Axios from 'axios';

const initialState = {
    teacherID: "",
    surname: "",
    name: "",
    patronimyc: "",
    faculty: "",
    department: "",
    teacherPosition: "",
    dateStart: "",
    dateEnd: ""
}

function AddEditTeachers() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const {teacherID, surname, name, patronimyc, faculty, department, teacherPosition, dateStart, dateEnd} = state;
    const { id } = useParams();


    useEffect(() => {
        const getTeachers = async () => {
            Axios.get(`http://localhost:3001/teachers/update/${id}`).then((response)=> {
                console.log(response.data[0]);
                setData(response.data);
            });
        };
        getTeachers();
        return () => {
            setData({});
        };  
    }, [id]);

    useEffect(()=> {
        if(id) {
            data.map((val) => (
            setState({    
                teacherID: val[0],
                surname: val[1],
                name: val[2],
                patronimyc: val[3],
                faculty: val[4],
                department: val[5],
                teacherPosition: val[6],
                dateStart: val[7],
                dateEnd: val[8]})));
        } else {
            setState({...initialState});
        }
        return () => setState({...initialState});
    }, [id, data])



    const handleInputChange = (e) =>{
        const { name, value} = e.target;
        setState({...state, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!teacherID || !name || !surname || !faculty || !department || !teacherPosition || !dateStart) {
            toast.error("Пожалуйста введите недостающие данные");
        }
        else {
            if (!id) {
                Axios.post("http://localhost:3001/addTeacher", {
                    teacherID: teacherID,
                    surname: surname,
                    name: name,
                    patronimyc: patronimyc,
                    department: department,
                    teacherPosition: teacherPosition,
                    dateStart: dateStart,
                    dateEnd: dateEnd
                }).then((resp) => { 
                    toast.success("Преподаватель успешно добавлен");
                }).catch((err) => {
                    toast.error(err);//???Чего ты не работаешь?:(
                });
                setTimeout(()=> navigate("/teachers"), 1000);
            } else {
                Axios.put(`http://localhost:3001/teacher/update/${id}`, {
                    teacherID: teacherID,
                    surname: surname,
                    name: name,
                    patronimyc: patronimyc,
                    department: department,
                    teacherPosition: teacherPosition,
                    dateStart: dateStart,
                    dateEnd: dateEnd
                }).then(() => { 
                    toast.success("Преподаватель успешно изменён");
                }).catch((err) => {
                    console.log(err);
                    toast.error(err);//???Чего ты не работаешь?:(
                });
                setTimeout(() => navigate("/teachers"), 1000);
            }

        }
    };
    return (
        <div style={{marginTop: "100px"}}>
            <form 
            style = {{
                margin: "auto", 
                padding: "15px", 
                maxWidth:"400px", 
                alignContent: "center"
                }}
                onSubmit={handleSubmit}>

                    <label htmlFor="teacherID">Персональный номер(ID)</label>
                    <input type = "text" id="teacherID" name ="teacherID" placeholder="Введите ID преподавателя..." value={teacherID || ""} onChange={handleInputChange}></input>

                    <label htmlFor="surname">Фамилия преподавателя</label>
                    <input type = "text" id="surname" name="surname" placeholder="Введите фамилию студента..." value={surname || ""} onChange={handleInputChange}></input>

                    <label htmlFor="name">Имя преподавателя</label>
                    <input type = "text" id="name" name="name" placeholder="Введите имя студента..." value={name || ""} onChange={handleInputChange}></input>

                    <label htmlFor="patronimyc">Отчество преподавателя</label>
                    <input type = "text" id="patronimyc" name="patronimyc" placeholder="Введите отчество студента..." value={patronimyc || ""} onChange={handleInputChange}></input>

                    <label htmlFor="faculty">Факультет</label>
                    <input type = "text" id="faculty" name="faculty" placeholder="Введите факультет..." value={faculty || ""}  onChange={handleInputChange} ></input>


                    <label htmlFor="department">Кафедра</label>
                    <input type="text" id="department" name="department" placeholder="Введите кафедру..." value={department || ""} onChange={handleInputChange} ></input>

                    <label htmlFor="teacherPosition">Занимаемая должность</label>
                    <input type = "text" id="teacherPosition" name="teacherPosition" placeholder="Введите должность..."  value={teacherPosition || ""} onChange={handleInputChange}></input>


                    <label htmlFor="dateStart">Дата зачисления надолжность</label>
                    <input type = "date" id="dateStart" name="dateStart"  value={dateStart || ""} onChange={handleInputChange}></input>

                    <label htmlFor="dateEnd">Дата ухода с должности</label>
                    <input type = "date" id="dateEnd" name="dateEnd"  value={dateEnd || ""} onChange={handleInputChange}></input>

                    <input type="submit" value= {id ? "Обновить" : "Сохранить"}/>
            </form>
        </div>
    )
}


AddEditTeachers.propTypes = {
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
    teacherID: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    patronimyc: PropTypes.string,
    faculty: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    teacherPosition: PropTypes.string.isRequired,
    dateStart: PropTypes.instanceOf(Date).isRequired,
    dateEnd: PropTypes.instanceOf(Date)
}

export default AddEditTeachers
