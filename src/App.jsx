import styled from "styled-components"
import { RadarProvider, SCREEN_1, useRadarContext } from "./RadarContext"
import ExcelUploadButton from "./components/ExcelUploadButton"
import Screen1 from "./components/Screen1"
import Screen2 from "./components/Screen2"

const AppContainer = styled.div({
 
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#000',
  color: '#fff',
  padding: '0',
  margin: '0'
})



const App = () => {
  const {currentScreen} = useRadarContext()
  return (
    
      <AppContainer>
        {currentScreen === SCREEN_1 ? <Screen1 /> : <Screen2 />}
      </AppContainer>
    
  )
}

export default App