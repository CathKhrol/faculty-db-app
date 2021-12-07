import React from 'react';
import { ToastContainer } from 'react-toastify';
import TeachersHeader from './TeachersHeader';
import { Route, Routes} from "react-router-dom";
import TeachersList from './TeachersList';
import AddEditTeachers from './AddEditTeachers';
import ViewTeachers from './ViewTeachers';
import './Teachers.css';

function Teachers() {
    return (
        <div className="teachers">
          <div className="container-teach1">
            <div className="container-teach2">
              <ToastContainer />
              <TeachersHeader />
  
              <div className="container-teach3">
                <Routes>
                  <Route exact path="/" element={<TeachersList />} />
                  <Route exact path="addTeacher" element={<AddEditTeachers />} />
                  <Route exact path="update/:id" element={<AddEditTeachers />} />
                  <Route exact path="view/:id" element={<ViewTeachers />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Teachers
