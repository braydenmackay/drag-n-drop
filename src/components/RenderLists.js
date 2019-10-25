import React, { useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import axios from "axios"

import StudentDraggable from "./StudentDraggable"

import TeamList from "./TeamList"

const RenderLists = () => {
  const [student, setStudent] = React.useState("")
  const [students, setStudents] = React.useState([])

  const renderStudents = () => {
    const noTeam = students.filter(student => student.team === "0")
    return noTeam.map((student, index) => {
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      )
    })
  }

  useEffect(() => {
    axios
      .get("https://drag-n-drop-db.herokuapp.com/members")
      .then(response => {
        setStudents(response.data)
      })
      .catch(error => {
        console.log("getStudents error", error)
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post("https://drag-n-drop-db.herokuapp.com/member", {
        name: student,
        team: "0"
      })
      .then(response => {
        setStudents([
          ...students,
          { id: response.data.id, name: student, team: 0 }
        ])
      })
      .catch(error => {
        console.log("post newStudent error", error)
      })
    setInterval(() => {
      document.location.reload()
    }, 100)
  }

  const handleOnClick = () => {
    students.map(student => {
      axios
        .put(`https://drag-n-drop-db.herokuapp.com/member/${student.id}`, {
          id: student.id,
          name: student.name,
          team: (Math.floor(Math.random() * 3) + 1).toString()
        })
        .then(response => {
          setStudents(response.data)
        })
        .catch(e => {
          console.log("put error", e)
        })
    })
    setInterval(() => {
      document.location.reload()
    }, 1000)
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const droppedStudent = students.find(
      student => student.id === result.draggableId
    )
    droppedStudent.team = result.destination.droppableId
    axios
      .put(`https://drag-n-drop-db.herokuapp.com/member/${droppedStudent.id}`, {
        id: droppedStudent.id,
        name: droppedStudent.name,
        team: result.destination.droppableId
      })
      .then(response => {
        setStudents(response.data)
      })
      .catch(e => {
        console.log("put error", e)
        return
      })
    setInterval(() => {
      document.location.reload()
    }, 100)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="render-lists">
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
              <button onClick={handleOnClick}>Random Team</button>
              {students.length > 0 ? renderStudents() : null}
              <div className="separator-skew" />
            </div>
          )}
        </Droppable>

        {students.length > 0 ? (
          <div className="teams-wrapper">
            <TeamList students={students} number={"1"} />
            <TeamList students={students} number={"2"} />
            <TeamList students={students} number={"3"} />
          </div>
        ) : null}
      </div>
    </DragDropContext>
  )
}

export default RenderLists
