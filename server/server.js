const express = require('express');
const oracledb = require('oracledb');
const app = express();
const PORT = 3001;
const PASSWORD = 'Rfnz_1823224';
const cors = require('cors');


app.use(cors());
app.use(express.json());

oracledb.initOracleClient({ libDir: 'C:\\Oracle\\instantclient_19_12' });

async function getItems(req, res, query) {
    let connection;
  
    try {
      connection = await oracledb.getConnection({ 
          user: "ADMIN", 
          password: PASSWORD, 
          connectionString: "ADWFACULTY_high" 
        });
  
      const result = await connection.execute(query);
      if (result.rows.length == 0) {
        return res.send('Список пустой')
      } else {
        //console.log(result.rows);
        return res.send(result.rows);
      }
    } catch (err) {
        console.log(err);
        return res.send(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
}



async function getItemByID(req, res, idItem, query) {
    let connection;
  
    try {
      connection = await oracledb.getConnection({ 
          user: "ADMIN", 
          password: PASSWORD, 
          connectionString: "ADWFACULTY_high" 
        });
  
      const result = await connection.execute(query, [idItem]);
      if (result.rows.length == 0) {
        return res.send('Список пустой')
      } else {
        console.log(result.rows);
        return res.send(result.rows);
      }
    } catch (err) {
        console.log(err);
        return res.send(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
}


async function postStudent(req, res, query) {
    let connection;
  
    try {
      connection = await oracledb.getConnection({ 
          user: "ADMIN", 
          password: PASSWORD, 
          connectionString: "ADWFACULTY_high" 
        });
        var body = req.body;
        
        const resp = await connection.execute(query, [body.studentID, body.surname, body.name, body.patronimyc, 
            body.speciality, body.course, body.group, body.eduTime, body.dateEnter, body.dateGraduate]);
        await connection.commit();
        return res.send(resp);
    } catch (err) {
        console.log(err);
        return res.send(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
        
      }
    }
}



async function updateStudent(req, res, query) {
  let connection;

  try {
    connection = await oracledb.getConnection({ 
        user: "ADMIN", 
        password: PASSWORD, 
        connectionString: "ADWFACULTY_high" 
      });
      var body = req.body;
      
      const resp = await connection.execute(query, [body.surname, body.name, body.patronimyc, 
          body.speciality, body.course, body.group, body.eduTime, body.dateEnter, body.dateGraduate, body.studentID]);
      await connection.commit();
      return res.send(resp);
  } catch (err) {
      console.log(err);
      return res.send(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


async function updateTeacher(req, res, query1, query2) {
  let connection;

  try {
    connection = await oracledb.getConnection({ 
        user: "ADMIN", 
        password: PASSWORD, 
        connectionString: "ADWFACULTY_high" 
      });
      var body = req.body;
      
      await connection.execute(query1, [body.surname, body.name, body.patronimyc, body.department, body.teacherID]);

      const resp = await connection.execute(query2, [body.dateStart, body.dateEnd, body.teacherID]);
      await connection.commit();
      return res.send(resp);
  } catch (err) {
      console.log(err);
      return res.send(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}



app.get('/students', (req, res) => {
    const query = `Select ID_STUD, SURN_STUD, NAME_STUD, 
    (Select NAME_FACULT 
    From INFO_SUBFACULTY 
    Where ID_FACULT = 
    (Select ID_FACULT From INFO_SPECIALITY Where SPEC_FACULT=ID_SPEC)), 
    (Select NAME_SPEC 
    From INFO_SPECIALITY 
    Where SPEC_FACULT=ID_SPEC), TO_CHAR(ENTER_DATE, 'DD/MON/YYYY')
    From INFO_STUDENT Where (STATE_STUD = PKG_INFO_STUD_CONST.GetStudLearn or STATE_STUD = PKG_INFO_STUD_CONST.GetStudBreak)`;
    getItems(req, res, query);
})

app.get('/teachers', (req, res) => {
  const query = `SELECT TEACH_INFO.ID_TEACHER,
  SURN_TEACH, NAME_TEACH,
  (Select NAME_FACULT From INFO_SUBFACULTY WHERE ID_FACULT = 
    (Select ID_FACULT From DEPART_FACULTY Where ID_DEPART = TEACH_INFO.ID_DEPART)),
  (Select DEPART_NAME From DEPART_FACULTY Where ID_DEPART = TEACH_INFO.ID_DEPART), 
  TO_CHAR(WORK_TIME_START, 'DD/MON/YYYY')
  FROM TEACH_INFO
  LEFT OUTER JOIN TEACH_POSITION
  ON TEACH_INFO.ID_TEACHER = TEACH_POSITION.ID_TEACHER`;
  getItems(req, res, query);
})


app.get('/students/archievedStudent', (req, res) => {
  const query = `Select ID_STUD, SURN_STUD, NAME_STUD, 
  (Select NAME_FACULT 
  From INFO_SUBFACULTY 
  Where ID_FACULT = 
  (Select ID_FACULT From INFO_SPECIALITY Where SPEC_FACULT=ID_SPEC)), 
  (Select NAME_SPEC 
  From INFO_SPECIALITY 
  Where SPEC_FACULT=ID_SPEC), TO_CHAR(ENTER_DATE, 'DD/MON/YYYY')
  From INFO_STUDENT Where (STATE_STUD = PKG_INFO_STUD_CONST.GetStudGone or STATE_STUD = PKG_INFO_STUD_CONST.GetStudGrad)`;
  getItems(req, res, query);
})



app.get('/students/view/:id', (req, res) => {
    let idItem = parseInt(req.params.id, 10);
    if (isNaN(idItem)) {
      res.send('Query param id is not number')
      return
    } 
    const query = `Select ID_STUD, SURN_STUD, NAME_STUD, NVL(PATRON_STUD, '-'),
    (Select NAME_FACULT 
    From INFO_SUBFACULTY 
    Where ID_FACULT = 
    (Select ID_FACULT From INFO_SPECIALITY Where SPEC_FACULT=ID_SPEC)), 
    (Select NAME_SPEC 
    From INFO_SPECIALITY 
    Where SPEC_FACULT=ID_SPEC), COURSE_NO, GROUP_NO, EDU_TIME, TO_CHAR(ENTER_DATE, 'DD/MON/YYYY'), 
    NVL(TO_CHAR(GRAD_DATE, 'DD/MON/YYYY'), '-'), 
    Case STATE_STUD
      When 'З' Then 'Закончил университет'
      When 'П' Then 'Взят перерыв'
      When 'У' Then 'Учится'
      When 'О' Then 'Отчислен'
    END
    From INFO_STUDENT Where ID_STUD = :idItem`;
    getItemByID(req, res, idItem, query);
})


app.get('/teachers/view/:id', (req, res) => {
  let idItem = parseInt(req.params.id, 10);
  if (isNaN(idItem)) {
    res.send('Query param id is not number')
    return
  } 
  const query = `SELECT TEACH_INFO.ID_TEACHER,
  SURN_TEACH, NAME_TEACH, PATR_TEACH,
  (Select NAME_FACULT From INFO_SUBFACULTY WHERE ID_FACULT = 
    (Select ID_FACULT From DEPART_FACULTY Where ID_DEPART = TEACH_INFO.ID_DEPART)),
  (Select DEPART_NAME From DEPART_FACULTY Where ID_DEPART = TEACH_INFO.ID_DEPART),
  (Select NAME_POSIT From UNIVER_POSITION Where ID_POSITION = TEACH_POSITION.ID_POSITION), 
  TO_CHAR(WORK_TIME_START, 'DD/MON/YYYY'), NVL(TO_CHAR(WORK_TIME_END, 'DD/MON/YYYY'), '-')
  FROM TEACH_INFO
  LEFT OUTER JOIN TEACH_POSITION
  ON TEACH_INFO.ID_TEACHER = TEACH_POSITION.ID_TEACHER Where TEACH_INFO.ID_TEACHER = :idItem`;
  getItemByID(req, res, idItem, query);
})



app.get('/students/update/:id', (req, res) => {
  let idItem = req.params.id;
  if (isNaN(idItem)) {
      res.send('Query param id is not number')
      return
  }
  const query = `Select TO_CHAR(ID_STUD), SURN_STUD, NAME_STUD, NVL(PATRON_STUD, '-'),
  (Select NAME_FACULT 
  From INFO_SUBFACULTY 
  Where ID_FACULT = 
  (Select ID_FACULT From INFO_SPECIALITY Where SPEC_FACULT=ID_SPEC)), 
  (Select NAME_SPEC 
  From INFO_SPECIALITY 
  Where SPEC_FACULT=ID_SPEC), COURSE_NO, GROUP_NO, EDU_TIME, TO_CHAR(ENTER_DATE, 'YYYY-MM-DD'), NVL(TO_CHAR(GRAD_DATE, 'YYYY-MM-DD'), '')
  From INFO_STUDENT Where ID_STUD = TO_NUMBER(:idStud)`;
  getItemByID(req, res, idItem, query);
})


app.get('/teachers/update/:id', (req, res) => {
  let idItem = req.params.id;
  if (isNaN(idItem)) {
      res.send('Query param id is not number')
      return
  }
  const query = `Select TO_CHAR(TEACH_INFO.ID_TEACHER), SURN_TEACH, NAME_TEACH, NVL(PATR_TEACH, '-'),
  (Select NAME_FACULT From INFO_SUBFACULTY WHERE ID_FACULT = 
    (Select ID_FACULT From DEPART_FACULTY Where DEPART_FACULTY.ID_DEPART = TEACH_INFO.ID_DEPART)),
  (Select DEPART_NAME From DEPART_FACULTY Where DEPART_FACULTY.ID_DEPART = TEACH_INFO.ID_DEPART),
  (Select NAME_POSIT From UNIVER_POSITION Where UNIVER_POSITION.ID_POSITION = TEACH_POSITION.ID_POSITION), 
  TO_CHAR(WORK_TIME_START, 'YYYY-MM-DD'), NVL(TO_CHAR(WORK_TIME_END, 'YYYY-MM-DD'), '')
  FROM TEACH_INFO
  LEFT OUTER JOIN TEACH_POSITION
  ON TEACH_INFO.ID_TEACHER = TEACH_POSITION.ID_TEACHER Where TEACH_INFO.ID_TEACHER = :idItem`;
  getItemByID(req, res, idItem, query);
})


app.put('/student/update/:id', (req, res) => {
  const query = `Update INFO_STUDENT 
  Set SURN_STUD = :surname, NAME_STUD = :nameStud, PATRON_STUD = :patronimyc, 
  ID_SPEC = (Select SPEC_FACULT From INFO_SPECIALITY Where NAME_SPEC = :speciality), COURSE_NO = :course, GROUP_NO = :groupStud, EDU_TIME = :eduTime, 
  ENTER_DATE = TO_DATE(:dateEnter, 'yyyy-mm-dd'), GRAD_DATE = TO_DATE(:dateGraduate, 'yyyy-mm-dd') Where ID_STUD = :studentID`;
  updateStudent(req, res, query);
})


app.put('/teacher/update/:id', (req, res) => {
  const query1 = `Update TEACH_INFO 
  Set SURN_TEACH = :surname, NAME_TEACH = :nameTeach, PATR_TEACH = :patronimyc, 
  ID_DEPART = (Select ID_DEPART From DEPART_FACULTY Where DEPART_FACULTY.DEPART_NAME = :department)
  Where ID_TEACHER = :teacherID`;
  const query2 = `Update TEACH_POSITION
  Set WORK_TIME_START = TO_DATE(:dateStart, 'yyyy-mm-dd'), WORK_TIME_END = TO_DATE(:dateEnd, 'yyyy-mm-dd') 
  Where ID_TEACHER = :teacherID`
  updateTeacher(req, res, query1, query2); //Подумать как обновлять должность преподавателя (добавлять новую запись в таблицу с новой должностью)
})




app.get('/faculties', (req, res) => {
    const query = `Select * From INFO_SUBFACULTY`;
    getItems(req, res, query);
    
})


app.get('/specialities', (req, res) => {
    const query = `Select * From INFO_SPECIALITY`;
    getItems(req, res, query);
})

app.post('/addStudent', (req, res) => {
    const query = `Insert Into INFO_STUDENT(ID_STUD, SURN_STUD, NAME_STUD, PATRON_STUD, ID_SPEC, COURSE_NO, GROUP_NO, EDU_TIME, ENTER_DATE, GRAD_DATE)
                    Values(TO_NUMBER(:studentID), :surname, :nameStud, :patronimyc, (Select SPEC_FACULT From INFO_SPECIALITY Where NAME_SPEC = :speciality), :course, :groupStud, :eduTime, TO_DATE(:dateEnter, 'yyyy-mm-dd'), TO_DATE(:dateGraduate, 'yyyy-mm-dd'))`;
    postStudent(req, res, query);
})

app.post('/addTeacher', (req, res) => {
  const query1 = `Insert Into TEACH_INFO(ID_TEACHER, SURN_TEACH, NAME_TEACH, PATR_TEACH, ID_DEPART)
                  Values(SQ_TEACH_INFO.nextval, :surname, :nameTeach, :patronimyc, (Select ID_DEPART From DEPART_FACULTY Where DEPART_NAME = :department)`;
  const query2 = `Insert Into TEACH_POSITION(ID_TEACHER, ID_POSITION, WORK_TIME_START, WORK_TIME_END, ID_DEPART)
                  Values(SQ_TEACH_INFO.nextval, (Select ID_POSITION From UNIVER_POSITION Where NAME_POSIT = :teacherPosition), TO_DATE(:dateStart, 'yyyy-mm-dd'), TO_DATE(:dateEnd, 'yyyy-mm-dd'))`;
  postTeacher(req, res, query1, query2);//пока что не работает. Подумать, что делать с последовательностью.
})

app.listen(PORT, ()=> {
    console.log("Listening on port ${PORT}");
});
