import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import NavBar from './components/NavBar';
import CustomSideBar from './components/SideBarComponents/CustomSideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './components/SideBarPages/DashBoard';
import Accounts from './components/SideBarPages/Accounts';
import Materials from './components/SideBarPages/Materials';
import Components from './components/SideBarPages/Components';
import Products from './components/SideBarPages/Products';

const theme = createTheme({
  App: {
    backgroundColor: "#FAFAFA"
  },
  palette: {
    primary: {
      main: "#2e1667"
    },
    secondary: {
      main: "#c7d8ed"
    },
  },
  typography: {
    fontFamily: [
      'Muli',
      'Arial'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem'
    },
    h5: {
      fontWeight: 600,
      lineHeight: '2rem'
    }
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <NavBar /> */}
        <Router>
          <CustomSideBar />
          <Routes>
            <Route path='/' exact element={<DashBoard />}></Route>
            <Route path='/accounts' exact element={<Accounts />}></Route>
            <Route path='/materials' exact element={<Materials />}></Route>
            <Route path='/products' exact element={<Products />}></Route>
            <Route path='/components' exact element={<Components />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
