import { useContext, useEffect, useState } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { Container } from "react-bootstrap";
import MyPie from "../Charts/Pie";
import MyLine from "../Charts/Line";

const moment = require("moment");

const Statistics = () => {
  const { getExpensesByDate, getExpenses, getTotalExpenses, totalExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const [expensesFiltered, setExpensesFiltered] = useState([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento -> mi servirà per evitasre che il grafico mi crashi se i dati non sono pronti essendo Async -> mi riferisco a expensesFiltered
  const [deltaDay, setDeltaDay] = useState(-1);
  const [total, setTotal] = useState([]);

  const getCategoryName = (categoryId) => {
    const c = categories.find((category) => category._id === categoryId);
    return c ? [c.categoryName, c.color] : null;
  };

  const getExpensesFiltered = async (data) => {
    let delta;
    const id = data;
    const toDate = moment();

    switch (data) {
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
        delta = 0;
        return;
    }
    setDeltaDay(delta);
    const fromDate = moment().startOf("day").add(2, "hours").subtract(delta, "days").toISOString();
    const res = await getExpensesByDate(fromDate, toDate);
    setExpensesFiltered(res);
  };

  const generaAnno = async () => {
    await getTotalExpenses();
    await setTotal(totalExpenses.totalExpenses);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Imposta lo stato di caricamento su true prima di effettuare la richiesta
      await getExpensesFiltered("today");
      await generaAnno();
      await getCategories();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <div className="col-lg-6 d-flex gap-2">
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("today")}>
            Oggi
          </div>
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("week")}>
            Ultima Settimana
          </div>
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("month")}>
            Ultimi 30 giorni
          </div>
          <div className="btn btn-outline-primary" onClick={generaAnno} id="month">
            Genera Anno
          </div>
        </div>
      </Container>

      <Container className="d-flex justify-content-between">
        {loading ? (
          <div>Caricamento...</div>
        ) : (
          <>
            <MyPie data={expensesFiltered ?? []} categoryData={getCategoryName} deltaDay={deltaDay} />
            <MyLine data={total} trigger={generaAnno} />
          </>
        )}
      </Container>
    </>
  );
};

export default Statistics;
