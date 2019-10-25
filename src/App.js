import React from "react"
import RenderLists from "./components/RenderLists"

const App = () => {
  const [mode, setMode] = React.useState(true)

  const handleTheme = () => {
    if (mode) {
      setMode(!mode)
      console.log("mode change true", mode)
    } else {
      setMode(!mode)
      console.log("mode change false", mode)
    }
  }

  return (
    <div>
      <button className="theme-button" onClick={handleTheme}>
        Change Theme
      </button>
      {mode ? (
        <div className="app">
          <RenderLists />
        </div>
      ) : (
        <div className="app-night">
          <RenderLists />
        </div>
      )}
    </div>
  )
}

export default App
