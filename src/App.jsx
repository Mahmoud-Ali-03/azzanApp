import './App.css'
import MainContent from './Components/MainContent'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
const theTheme = createTheme({
  typography: {
    fontFamily: 'Almarai',
  }
})
  return (
    <>
      <ThemeProvider theme={theTheme}>
      <Container maxWidth="lg" style={{position:"relative" , zIndex:"2" , padding:"50px 0px"}}>
        <MainContent />
      </Container>
      </ThemeProvider>
    </>
  )
}

export default App
