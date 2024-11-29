import express from "express";
import { barChart, combined, initialiseDatabase, pieChart, statistics, transactions } from "../controller/controller.js";

const router =express.Router();

router.get("/initialise_db", initialiseDatabase);
router.get("/transactions", transactions);
router.get("/statistics", statistics);
router.get("/bar_chart", barChart);
router.get("/pie_chart", pieChart);
router.get("/combined", combined)


export default router;