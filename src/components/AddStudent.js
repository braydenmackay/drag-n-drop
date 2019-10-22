import React from "react"
import axios from "axios"

const AddStudent = props => {
  const [newStudent, setNewStudent] = React.useState({ name: "", team: "0" })

  const addNewStudent = () => {
    axios
      .post("https://drag-n-drop-db.herokuapp.com/member", {
        name: props.student,
        team: "0"
      })
      .then(response => {
        console.log.apply(response)
      })
      .catch(error => {
        console.log("post newStudent error", error)
      })
  }

  return (
    <div>
      <button onClick={addNewStudent}>Add Student</button>
    </div>
  )
}

export default AddStudent
