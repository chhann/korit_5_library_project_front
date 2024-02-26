import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import SideBarPractice from './components/SideBar/SideBarPractice';
import RootLayout from './components/RootLayout/RootLayout';
import { MENUS } from './constants/menu';

function App() {
  return (
    <>
      <Reset/>
      <SideBar/>
      <SideBarPractice/>

      <RootLayout>
        <Routes>
        {MENUS.map(menu => <Route key={menu.id} path={menu.path} element={menu.element} />)}
        </Routes>
      </RootLayout>

      
    </>
  );
}

export default App;
