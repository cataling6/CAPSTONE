import React, { useContext, useEffect, useState } from "react";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";

import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import MineShared from "./MineShared";
import UsersProvider from "../../contexts/users_ctx";
import SharedWithMe from "./SharedWithMe";
const SharedExpenses = () => {
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);

  useEffect(() => {}, []);
  return (
    <Container>
      <h2>My shared expenses</h2>
      <div className="d-flex justify-content-between ">
        <div>
          <p>My Shared Expenses</p>
          <UsersProvider>
            <MineShared />
          </UsersProvider>
        </div>
        <div>
          <p>Shared with me</p>
          <div className="d-flex gap-2">
            <UsersProvider>
              <SharedWithMe />
            </UsersProvider>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SharedExpenses;
