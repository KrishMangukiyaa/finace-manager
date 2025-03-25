import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import ChatBot from "./Components/chat bot/chat-bot-ai";
import Notes from "./Components/Notes/Notes";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Components/login and register/register";
import Login from "./Components/login and register/login";

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App" isAuthPage={isAuthPage}>
      {orbMemo}
      {isAuthPage ? (
        location.pathname === "/login" ? <Login /> : <Register />
      ) : (
        <MainLayout>
          <div style={{ display: "flex", width: "100%", gap: "35px" }}>
            <Navigation active={active} setActive={setActive} />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/incomes" element={<Income />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </MainLayout>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: ${({ isAuthPage }) => (isAuthPage ? "100vh" : "100%")};
  width: ${({ isAuthPage }) => (isAuthPage ? "100vw" : "auto")};
  background-image: ${({ isAuthPage, bg }) => (isAuthPage ? "none" : `url(${bg})`)};
  display: ${({ isAuthPage }) => (isAuthPage ? "flex" : "block")};
  align-items: ${({ isAuthPage }) => (isAuthPage ? "center" : "unset")};
  justify-content: ${({ isAuthPage }) => (isAuthPage ? "center" : "unset")};
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    height: 90vh;
    background-image: url(${(props) => props.bg});
    position: relative;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
