import { useContext, useEffect, useState } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { Container } from "react-bootstrap";
import MyPie from "../Charts/Pie";
import MyLine from "../Charts/Line";

const moment = require("moment");

const Statistics = () => {
  const { expenses, getExpensesByDate, getExpenses, getTotalExpenses, totalExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const [expensesFiltered, setExpensesFiltered] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [deltaDay, setDeltaDay] = useState(-1);
  const [total, setTotal] = useState([]);

  const getCategoryName = (categoryId) => {
    const c = categories.find((category) => category._id === categoryId);
    return c ? [c.categoryName, c.color] : null;
  };

  const getExpensesFiltered = async (e) => {
    let delta;
    const id = e.target.id;
    const toDate = moment();

    switch (id) {
      case "today":
        delta = 0;

        break;
      case "week":
        delta = 7;

        break;
      case "month":
        delta = 30;

        break;
      default:
        return;
    }
    setDeltaDay(delta);

    const fromDate = moment().startOf("day").add(2, "hours").subtract(delta, "days").toISOString();
    const res = await getExpensesByDate(fromDate, toDate);
    setExpensesFiltered(res);
  };

  const generaAnno = async () => {
    await getTotalExpenses();
    setTotal(totalExpenses.totalExpenses);
    setTrigger((prevTrigger) => !prevTrigger);
  };
  useEffect(() => {
    //getTotalExpenses();
    //getExpenses();
    getCategories();
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
          <div className="btn btn-outline-primary" onClick={generaAnno} id="month">
            Genera Anno
          </div>
        </div>
      </Container>

      <Container className="d-flex justify-content-between">
        <MyPie data={expensesFiltered} categoryData={getCategoryName} deltaDay={deltaDay} />
        <MyLine data={total} trigger={generaAnno} />
      </Container>
    </>
  );
};

export default Statistics;
