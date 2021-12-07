import React, {useState, useEffect} from 'react';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import './AddEditStudent.css';
import {toast} from 'react-toastify';
import  Axios from 'axios';

const initialState = {
    studentID: "",
    surname: "",
    name: "",
    patronimyc: "",
    faculty: "",
    speciality: "",
    course: "",
    group: "",
    eduTime: 0,
    dateEnter: "",
    dateGraduate: ""
}


function AddEditStudents() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState([]);
    const location = useLocation();

    const navigate = useNavigate();
    const {studentID, surname, name, patronimyc, faculty, speciality, course, group, eduTime, dateEnter, dateGraduate} = state;
    const { id } = useParams();


    useEffect(() => {
        const getStudents = async () => {
            Axios.get(`http://localhost:3001/students/update/${id}`).then((response)=> {
                console.log(response.data[0]);
                setData(response.data);
            });
        };
        getStudents();
        return () => {
            setData({});
        };  
    }, [id]);

    useEffect(()=> {
        if(id) {
            data.map((val) => (
            setState({    
                studentID: val[0],
                surname: val[1],
                name: val[2],
                patronimyc: val[3],
                faculty: val[4],
                speciality: val[5],
                course: val[6],
                group: val[7],
                eduTime: val[8],
                dateEnter: val[9],
                dateGraduate: val[10]})));
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
        if(!studentID || !name || !surname || !faculty || !speciality || !course || !group || !dateEnter) {
            toast.error("Пожалуйста введите недостающие данные");
        }
        else {
            if (!id) {
                Axios.post("http://localhost:3001/addStudent", {
                    studentID: studentID,
                    surname: surname,
                    name: name,
                    patronimyc: patronimyc,
                    speciality: speciality,
                    course: course,
                    group: group,
                    eduTime: eduTime,
                    dateEnter: dateEnter,
                    dateGraduate: dateGraduate
                }).then((resp) => { 
                    toast.success("Студент успешно добавлен");
                }).catch((err) => {
                    toast.error(err);//???Чего ты не работаешь?:(
                });
                setTimeout(()=> navigate("/students"), 1000);
            } else {
                Axios.put(`http://localhost:3001/student/update/${id}`, {
                    studentID: studentID,
                    surname: surname,
                    name: name,
                    patronimyc: patronimyc,
                    speciality: speciality,
                    course: course,
                    group: group,
                    eduTime: eduTime,
                    dateEnter: dateEnter,
                    dateGraduate: dateGraduate
                }).then(() => { 
                    toast.success("Студент успешно изменён");
                }).catch((err) => {
                    console.log(err);
                    toast.error(err);//???Чего ты не работаешь?:(
                });
                setTimeout(() => (location.pathname === `/students/update/${id}`)? navigate("/students") : navigate("/students/archievedStudent"), 1000);
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

                    <label htmlFor="studentID">Номер зачётной книжки</label>
                    <input type = "text" id="studentID" name ="studentID" placeholder="Введите номер зачётной книжки..." value={studentID || ""} onChange={handleInputChange}></input>

                    <label htmlFor="surname">Фамилия студента</label>
                    <input type = "text" id="surname" name="surname" placeholder="Введите фамилию студента..." value={surname || ""} onChange={handleInputChange}></input>

                    <label htmlFor="name">Имя студента</label>
                    <input type = "text" id="name" name="name" placeholder="Введите имя студента..." value={name || ""} onChange={handleInputChange}></input>

                    <label htmlFor="patronimyc">Отчество студента</label>
                    <input type = "text" id="patronimyc" name="patronimyc" placeholder="Введите отчество студента..." value={patronimyc || ""} onChange={handleInputChange}></input>

                    <label htmlFor="faculty">Факультет</label>
                    <input type = "text" id="faculty" name="faculty" placeholder="Введите факультет..." value={faculty || ""}  onChange={handleInputChange} ></input>


                    <label htmlFor="speciality">Специальность</label>
                    <input type="text" id="speciality" name="speciality" placeholder="Введите специальность..." value={speciality || ""} onChange={handleInputChange} ></input>

                    <label htmlFor="course">Номер курса</label>
                    <input type = "number" id="course" name="course"  value={course || ""} onChange={handleInputChange}></input>

                    <label htmlFor="group">Номер группы</label>
                    <input type = "number" id="group" name="group" value={group || ""} onChange={handleInputChange}></input>


                    <label htmlFor="eduTime">Количество семестров обучения</label>
                    <input type="number" id="eduTime" name="eduTime"  value={ eduTime || 0} onChange={handleInputChange} ></input>

                    <label htmlFor="dateEnter">Дата поступления в университет</label>
                    <input type = "date" id="dateEnter" name="dateEnter"  value={dateEnter || ""} onChange={handleInputChange}></input>

                    <label htmlFor="dateGraduate">Дата окончания университета</label>
                    <input type = "date" id="dateGraduate" name="dateGraduate" value={dateGraduate || ""} onChange={handleInputChange}></input>

                    <input type="submit" value= {id ? "Обновить" : "Сохранить"}/>
            </form>
        </div>
    )
}

export default AddEditStudents
