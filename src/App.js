import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import LoginProvider from "../src/context/loginContext";
import Main from "../src/components/Main";

function App() {
  return (
    <>
      <LoginProvider>
        <Main />
      </LoginProvider>
    </>
  );
}

export default App;
