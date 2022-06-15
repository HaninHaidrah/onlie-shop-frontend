import { useContext } from "react";
import Signin from "./SigninForm";
import { LoginContext } from "../context/loginContext";
import Header from "./Header";
import Products from "./Products";
import FavItem from "./FavItems";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main() {
  const { loggedIn } = useContext(LoginContext);
  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route index element={<Products />} />
              <Route path="fav" element={<FavItem />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <>
          <Signin />
        </>
      )}
    </>
  );
}

export default Main;
