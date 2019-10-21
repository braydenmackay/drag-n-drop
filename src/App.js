import React from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import axios from "axios"

import StudentDraggable from "./components/StudentDraggable"

import TeamList from "./components/TeamList"

const App = () => {
  const [student, setStudent] = React.useState("")
  const [students, setStudents] = React.useState("")

  const renderStudents = () => {
    const noTeam = students.filter(student => student.team === 0)
    return noTeam.map((student, index) => {
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      )
    })
  }

  const getStudents = () => {
    axios.get()
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStudents([
      ...students,
      { id: students.length + 1, name: student, team: 0 }
    ])
  }

  // const handleOnClick = () => {
  //   students.map(student => {
  //     student.team = Math.floor(Math.random() * 3) + 1
  //   })

  //   console.log(...students)
  //   document.location.reload()
  // }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const droppedStudent = students.find(
      student => student.id === result.draggableId
    )
    droppedStudent.team = +result.destination.droppableId
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable droppableId={"0"}>
          {provided => (
            <div
              className="left-student-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  value={student}
                  onChange={e => setStudent(e.target.value)}
                />
                <button>Add Student</button>
              </form>
              {/* <button onClick={handleOnClick}>Random Team</button> */}
              {renderStudents()}
              <div className="separator-skew" />
            </div>
          )}
        </Droppable>

        <div className="teams-wrapper">
          <TeamList students={students} number={"1"} />
          <TeamList students={students} number={"2"} />
          <TeamList students={students} number={"3"} />
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
