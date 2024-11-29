import axios from "axios";
import ProductTransactionModel from "../model/schema.js";

const getMonthFilter = (month) => ({
    $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
  });
  
export const initialiseDatabase = async (req, res, next)=>{
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await ProductTransactionModel.deleteMany(); // Clear existing data
        await ProductTransactionModel.insertMany(data); // Seed new data
        res.status(200).json({ message: 'Database initialized successfully!' });
      } catch (error) {
        res.status(500).json({ message: 'Error initializing database', error });
      }
}


export const transactions=async (req, res, next)=>{
    const { search = '', page = 1, perPage = 10, month } = req.query;

    const monthFilter = month ? getMonthFilter(month) : {};
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search.toString(), $options: 'i' } },
      ],
    };
  
    try {
      const transactions = await ProductTransactionModel.find({
        ...monthFilter,
        ...(search ? searchQuery : {}),
      })
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error)

      res.status(500).json({ message: 'Error fetching transactions', error });
    }
}


export const statistics =async (req, res, next)=>{
    const { month } = req.query;
  try {
    const transactions = await ProductTransactionModel.find(getMonthFilter(month));

    const totalSaleAmount = transactions.reduce((sum, item) => sum + (item.sold ? item.price : 0), 0);
    const totalSoldItems = transactions.filter((item) => item.sold).length;
    const totalNotSoldItems = transactions.filter((item) => !item.sold).length;

    res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
}


export const barChart= async(req, res, next)=>{
    const { month } = req.query;

  try {
    const transactions = await ProductTransactionModel.find(getMonthFilter(month));

    const priceRanges = {
      '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0,
      '401-500': 0, '501-600': 0, '601-700': 0, '701-800': 0,
      '801-900': 0, '901+': 0,
    };

    transactions.forEach(({ price }) => {
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901+']++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
}


export const pieChart =async (req, res, next)=>{
    const { month } = req.query;

  try {
    const transactions = await ProductTransactionModel.find(getMonthFilter(month));

    const categoryCounts = transactions.reduce((counts, { category }) => {
      counts[category] = (counts[category] || 0) + 1;
      return counts;
    }, {});

    res.status(200).json(categoryCounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
}


export const combined = async(req, res, next)=>{

    const { month } = req.query;
    const baseUrl = "http://localhost:3000"
    try {
      const [statistics, barChart, pieChart] = await Promise.all([
        axios.get(`${baseUrl}/api/statistics?month=${month}`),
        axios.get(`${baseUrl}/api/bar_chart?month=${month}`),
        axios.get(`${baseUrl}/api/pie_chart?month=${month}`),
      ]);
  
      res.status(200).json({
        statistics: statistics.data,
        barChart: barChart.data,
        pieChart: pieChart.data,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching combined data', error });
    }
}