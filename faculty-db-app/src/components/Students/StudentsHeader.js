import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

function StudentsHeader() {
    const [activeTab, setActiveTab] = useState("Students");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/students") {
            setActiveTab("Students");
        } 
        else if (location.pathname === "/students/addStudent") {
            setActiveTab("AddStudent");
        }
        else if (location.pathname === "/students/archievedStudent") {
            setActiveTab("ArchievedStudents");
        }
    }, [location]);

    return (
        <div className="header">
           <p className="logo">Список студентов БГУ</p> 
           <div className="header-btns">
               <Link to="/students">
                   <p className={`${activeTab ==="Students" ? "active" : " "}`}
                    onClick={()=>setActiveTab("Students")}>
                       Студенты
                   </p>
               </Link>

               <Link to="archievedStudent">
                   <p className={`${activeTab==="ArchievedStudents" ? "active" : " "}`}
                    onClick={()=>setActiveTab("ArchievedStudents")}>
                       Архив студентов
                   </p>
               </Link>

               <Link to="addStudent">
                   <p className={`${activeTab==="AddStudent" ? "active" : " "}`} 
                    onClick={()=>setActiveTab("AddStudent")}>
                       Добавить студента
                   </p>
               </Link>

           </div>
            
        </div>
    )
}

export default StudentsHeader
