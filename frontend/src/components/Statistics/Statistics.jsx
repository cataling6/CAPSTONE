import { useContext, useEffect, useState } from "react";
import React from "react";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { Container } from "react-bootstrap";
import MyPie from "../Charts/Pie";
import MyLine from "../Charts/Line";
import MyBar from "../Charts/Bar";
import { motion } from "framer-motion";

const moment = require("moment");

const Statistics = () => {
  const { getExpensesByDate, totalExpenses, allUserExpenses, getTotalExpenses } = useContext(ExpensesCtx);
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
        delta = 30;
        return;
    }
    setDeltaDay(delta);
    const fromDate = moment().startOf("day").add(2, "hours").subtract(delta, "days").toISOString();
    const res = await getExpensesByDate(fromDate, toDate);
    setExpensesFiltered(res);
  };

  const generaAnno = async () => {
    await getTotalExpenses();
    setTotal(totalExpenses);
  };

  const fetchData = async () => {
    setLoading(true); // Imposta lo stato di caricamento su true prima di effettuare la richiesta
    await getExpensesFiltered("month");
    await generaAnno();
    await getCategories();
    setLoading(false);
  };
  const loadData = async () => {
    await generaAnno();
    await fetchData();
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container>
        <motion.div
          className="col-lg-6 d-flex gap-2"
          initial={{ y: -40 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
            stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
            duration: 1, // Durata dell'animazione in secondi
          }}
        >
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("today")}>
            Today
          </div>
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("week")}>
            Last 7 days
          </div>
          <div className="btn btn-outline-primary" onClick={() => getExpensesFiltered("month")}>
            Last 30 days
          </div>
          <div className="btn btn-outline-primary" onClick={generaAnno} id="month">
            Generate Year
          </div>
        </motion.div>
      </Container>

      <Container>
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }} className="d-flex justify-content-between">
          {loading ? (
            <div>Caricamento...</div>
          ) : (
            <>
              <MyPie data={expensesFiltered ?? []} categoryData={getCategoryName} deltaDay={deltaDay} />
              <MyLine data={total} trigger={generaAnno} />

              {/* <div>
              <MyBar data={total} trigger={generaAnno} />
            </div> */}
            </>
          )}
        </motion.div>
      </Container>
    </>
  );
};

export default Statistics;
