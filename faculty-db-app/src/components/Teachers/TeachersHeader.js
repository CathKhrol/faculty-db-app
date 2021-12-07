import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';


function TeachersHeader() {
    const [activeTab, setActiveTab] = useState("Teachers");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/teachers") {
            setActiveTab("Teachers");
        } 
        else if (location.pathname === "/teachers/addTeacher") {
            setActiveTab("AddTeacher");
        }
    }, [location]);

    return (
        <div className="header">
           <p className="logo">Список преподавателей БГУ</p> 
           <div className="header-btns">
               <Link to="/teachers">
                   <p className={`${activeTab ==="Teachers" ? "active" : " "}`}
                    onClick={()=>setActiveTab("Teachers")}>
                       Преподаватели
                   </p>
               </Link>


               <Link to="addTeacher">
                   <p className={`${activeTab==="AddTeacher" ? "active" : " "}`} 
                    onClick={()=>setActiveTab("AddTeacher")}>
                       Добавить преподавателя
                   </p>
               </Link>
           </div>
            
        </div>
    )
}

export default TeachersHeader
