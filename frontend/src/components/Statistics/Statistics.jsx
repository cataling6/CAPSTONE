import { useContext, useEffect, useState } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { Container } from "react-bootstrap";
import MyPie from "../Charts/Pie";

const moment = require("moment");

const Statistics = () => {
  const { getExpensesByDate } = useContext(ExpensesCtx);
  const [expensesFiltered, setExpensesFiltered] = useState({});

  const getExpenses = async (e) => {
    let deltaDay;
    const id = e.target.id;
    const toDate = moment();

    switch (id) {
      case "today":
        deltaDay = 0;

        break;
      case "week":
        deltaDay = 7;

        break;
      case "month":
        deltaDay = 30;

        break;
      default:
        return;
    }
    const fromDate = moment().startOf("day").add(2, "hours").subtract(deltaDay, "days").toISOString();
    const res = await getExpensesByDate(fromDate, toDate);
    setExpensesFiltered(res);
  };

  useEffect(() => {}, [expensesFiltered]);

  return (
    <>
      <Container>
        <div className="col-lg-6 d-flex gap-2">
          <div className="btn btn-outline-primary" onClick={getExpenses} id="today">
            Oggi
          </div>
          <div className="btn btn-outline-primary" onClick={getExpenses} id="week">
            Ultima Settimana
          </div>
          <div className="btn btn-outline-primary" onClick={getExpenses} id="month">
            Ultimi 30 giorni
          </div>
        </div>
      </Container>
      <Container>
        <MyPie data={expensesFiltered} />
      </Container>
    </>
  );
};

export default Statistics;
