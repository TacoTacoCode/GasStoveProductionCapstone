import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CustomSideBar from './components/SideBarComponents/CustomSideBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import DashBoard from './components/SideBarPages/DashBoard';
import Accounts from './components/SideBarPages/Accounts';
import Materials from './components/SideBarPages/Materials';
import Components from './components/SideBarPages/Components';
import Products from './components/SideBarPages/Products';
import Signin from './components/login/Signin';

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
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Signin />
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CustomSideBar />
          <Routes>
            <Route path='/dashboard' exact element={<DashBoard />}></Route>
            <Route path='/dashboard/accounts' exact element={<Accounts />}></Route>
            <Route path='/dashboard/materials' exact element={<Materials />}></Route>
            <Route path='/dashboard/products' exact element={<Products />}></Route>
            <Route path='/dashboard/components' exact element={<Components />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;
