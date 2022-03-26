import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CustomSideBar from './components/SideBarComponents/CustomSideBar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import DashBoard from './components/SideBarPages/admin/DashBoard';
import Accounts from './components/SideBarPages/admin/Accounts';
import Materials from './components/SideBarPages/admin/Materials';
import Components from './components/SideBarPages/admin/Components';
import Products from './components/SideBarPages/admin/Products';
import Signin from './components/login/Signin';
import Orders from './components/SideBarPages/orderdepartment/Orders';
import SectionMaterials from './components/SideBarPages/sectiondepartment/SectionMaterials';
import WorkerList from './components/SideBarPages/sectiondepartment/WorkerList';
import OrderDetails from './components/SideBarPages/orderdepartment/OrderDetails';


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
  // localStorage.clear();
  const token = localStorage.getItem('token');

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
            <Route path='/orders' exact element={<Orders />}></Route>
            <Route path='/orders/orderdetails' exact element={<OrderDetails />}></Route>
            <Route path='/section/materials' exact element={<SectionMaterials />}></Route>
            <Route path='/section/workers' exact element={<WorkerList />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;
