import React, { useContext, useEffect, useState } from "react";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
const SharedExpenses = () => {
  const { sharedExpenses, getSharedExpenses } = useContext(SharedExpensesCtx);
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);

  const wantMySharedExpenses = async () => {
    await getSharedExpenses();
  };

  useEffect(() => {
    wantMySharedExpenses();
  }, []);
  return (
    <Container>
      <h2>My shared expenses</h2>
      <div className="d-flex justify-content-between ">
        <div>
          <p>Mine shared</p>
          {}
        </div>
        <div>
          <p>Shared with me</p>
        </div>
      </div>
    </Container>
  );
};

export default SharedExpenses;
