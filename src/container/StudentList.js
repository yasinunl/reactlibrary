import React, { useState, useEffect, useContext } from 'react';
import Student from '../component/Student';
import '../style/StudentList.css';
import CreateStudent from '../component/CreateStudent';
import { addStudent, deleteStudent, getAllStudent, updateStudent } from '../service/StudentService';
import { AuthContext } from '../auth/auth';
import UpdateStudent from '../component/UpdateStudent';


const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const { user, isLoggedIn, role } = useContext(AuthContext)
  const [student, setStudent] = useState({});
  const [updateModal, setUpdateModal] = useState(false);

  const handleUpdateStudent = (index) => {
    setStudent(students[index])
    setUpdateModal(true)
  }
  const hadleCloseModal = () => {
    setUpdateModal(false)
  }
  const handleUpdeteSubmit = (student) => {
    const fetchData = async () => {
      await updateStudent(student, user)
      const studentData = await getAllStudent();
      setStudents(studentData)
    }
    fetchData();
  }
  const handleDeleteStudent = (id) => {
    const fetchData = async () => {
      await deleteStudent(id, user)
      const studentData = await getAllStudent();
      setStudents(studentData)
    }
    fetchData();

  }

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getAllStudent();
      setStudents(studentData)
    };

    fetchData();
  }, []);
  const [isCreatingStudent, setIsCreatingStudent] = useState(true);

  const handleCreateStudentClick = async (studentData) => {
    setIsCreatingStudent(!isCreatingStudent); // Set state to indicate creating mode
    if (studentData)
      setStudents([...students, { ...studentData, "id": students[students.length - 1].id + 1, "borrowedStudents": 0, }]); // Add new student to state
    await addStudent(studentData, user);
    const student = await getAllStudent();
    setStudents(student)
  };
  return (
    <div className="student-list">
      {isLoggedIn && (
        <>
          <CreateStudent onCreateStudent={handleCreateStudentClick} />
        </>
      )}
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Borrowed books</th>
            {isLoggedIn && <>
              <th>Update</th>
              {role == "ADMIN" && <th>Delete</th>}</>
            }
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr>
              <Student {...student} />
              {isLoggedIn && <> <td>
                <button onClick={() => handleUpdateStudent(index)}>Update</button>
              </td>
              {/* Role checking */}
                {role == "ADMIN" && <td>
                  {/* First delete borrow history before deleting student */}
                  <button disabled={student.borrowedBooks != 0 && true} onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                </td>}
              </>}
            </tr>
          ))}
        </tbody>
      </table>

      {
        updateModal && <UpdateStudent isOpen={updateModal} student={student} onClose={hadleCloseModal} onSubmit={handleUpdeteSubmit} />
      }
    </div>
  );
};

export default StudentsList;