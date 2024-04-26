import { useContext } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { Container } from "react-bootstrap";

const Statistics = () => {
  const { expenses, getExpenses, deleteExpenseById } = useContext(ExpensesCtx);

  return (
    <>
      <Container>exp</Container>
    </>
  );
};

export default Statistics;
