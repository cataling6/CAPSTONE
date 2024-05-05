import React, { useContext, useEffect, useId } from "react";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import MineShared from "./MineShared";
import UsersProvider from "../../contexts/users_ctx";
import SharedWithMe from "./SharedWithMe";
import "./style.css";
const SharedExpenses = () => {
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);

  useEffect(() => {}, []);
  return (
    <Container>
      <div className="d-flex justify-content-between ">
        <div className="w-50 container ">
          <div className="d-flex justify-content-center">My Shared Expenses</div>
          <div className="shadow rounded rounded-2 max-height">
            <UsersProvider>
              <MineShared />
            </UsersProvider>
          </div>
        </div>
        <div className="w-50 container ">
          <div className="d-flex justify-content-center">Shared with me</div>
          <div className="shadow rounded rounded-2 max-height">
            <div className="row d-flex mt-3 px-3 gap-2 justify-content-center ">
              <UsersProvider>
                <SharedWithMe />
              </UsersProvider>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SharedExpenses;
