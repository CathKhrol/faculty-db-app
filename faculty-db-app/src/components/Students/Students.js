import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import StudentsList from './StudentsList';
import './Students.css';
import AddEditStudents from './AddEditStudents';
import ViewStudents from './ViewStudents';
import { Route, Routes} from "react-router-dom";
import StudentsHeader from './StudentsHeader';
import {ToastContainer} from 'react-toastify';

function Students() {
    return (
      <div className="students">
        <div className="container-stud1">
          <div className="container-stud2">
            <ToastContainer />
            <StudentsHeader />

            <div className="container-stud3">
              <Routes>
                <Route exact path="/" element={<StudentsList />} />
                <Route path="addStudent" element={<AddEditStudents />} />
                <Route path="update/:id" element={<AddEditStudents />} />
                <Route path="archievedStudent" element={<StudentsList />}/>
                <Route path="archievedStudent/view/:id" element={<ViewStudents />} />
                <Route path="archievedStudent/update/:id" element={<AddEditStudents />} />
                <Route path="view/:id" element={<ViewStudents />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Students
