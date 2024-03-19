import RootContainer from "./components/RootContainer/RootContainer";
import RootHeader from "./components/RootHeader/RootHeader";
import RootLayout from "./components/RootLayout/RootLayout";
import RootSideMenuLeft from "./components/RootSideMenuLeft/RootSideMenuLeft";
import AuthRoute from "./Routes/AuthRoute";



function App() {
  return (
      
        <RootLayout>
          <RootContainer>
            
            <AuthRoute/>

          </RootContainer>
        </RootLayout>
      
  );
}

export default App;
