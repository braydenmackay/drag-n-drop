import React from "react"
import { Draggable } from "react-beautiful-dnd"
import axios from "axios"

const StudentDraggable = props => {
  const { student } = props

  const deleteStudent = id => {
    axios
      .delete(`https://drag-n-drop-db.herokuapp.com/member/${id}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("delete student error", error)
      })
    setInterval(() => {
      document.location.reload()
    }, 100)
  }

  return (
    <Draggable draggableId={student.id} index={props.index}>
      {provided => (
        <div
          className="student-draggable"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className="student-name">{student.name}</p>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      )}
    </Draggable>
  )
}

export default StudentDraggable
