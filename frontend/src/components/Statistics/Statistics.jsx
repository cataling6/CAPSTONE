import { useContext, useEffect, useState } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { Container } from "react-bootstrap";
import MyPie from "../Charts/Pie";
import MyLine from "../Charts/Line";

const moment = require("moment");

const Statistics = () => {
  const { expenses, getExpensesByDate, getExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const [expensesFiltered, setExpensesFiltered] = useState([]);

  const getCategoryName = (categoryId) => {
    const c = categories.find((category) => category._id === categoryId);
    return c ? c.categoryName : null;
  };

  const getExpensesFiltered = async (e) => {
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

  useEffect(() => {
    getCategories();
    getExpenses();
  }, [expensesFiltered]);
  return (
    <>
      <Container>
        <div className="col-lg-6 d-flex gap-2">
          <div className="btn btn-outline-primary" onClick={getExpensesFiltered} id="today">
            Oggi
          </div>
          <div className="btn btn-outline-primary" onClick={getExpensesFiltered} id="week">
            Ultima Settimana
          </div>
          <div className="btn btn-outline-primary" onClick={getExpensesFiltered} id="month">
            Ultimi 30 giorni
          </div>
        </div>
      </Container>

      <Container>
        <MyPie data={expensesFiltered} categoryNames={getCategoryName} />
        <MyLine data={expenses} />
      </Container>
    </>
  );
};

export default Statistics;
