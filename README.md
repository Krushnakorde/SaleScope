# SaleScope

**SaleScope** is a comprehensive application built with the MERN stack (MongoDB, Express.js, React, Node.js) to manage and analyze product transaction data. This project offers both backend and frontend functionalities, showcasing real-time data fetching, transaction tracking, dynamic chart generation, and user-friendly interfaces.

## Features

### Backend (Node.js and Express)

- **API Integration**: Fetches product transaction data from a third-party API.
- **Database Initialization**: Initializes the MongoDB database with seed data from the external API.
- **Transaction Listing**: Lists all transactions with search and pagination features. Filters data based on product title, description, and price.
- **Transaction Statistics**: Provides statistics for the selected month, including total sales, total sold items, and unsold items.
- **Bar Chart Data**: Returns the number of items in various price ranges for a selected month.
- **Pie Chart Data**: Returns the count of items by category for a selected month.
- **Combined Data API**: Fetches and combines data from all APIs for integrated analysis.

### Frontend (React)

- **Transaction Table**: Displays product transactions in a table format, with search, pagination, and month selection features.
- **Transaction Statistics**: Displays statistics for the selected month, including total sale amount, sold items, and unsold items.
- **Bar Chart**: Displays a bar chart with price ranges and the number of items in each range for the selected month.
- **Pie Chart**: Visualizes the number of items in each category for the selected month.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (https://nodejs.org/)
- MongoDB (You can use MongoDB Atlas for cloud hosting)
- Git (https://git-scm.com/)

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Krushnakorde/salescope.git
cd salescope