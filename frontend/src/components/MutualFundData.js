import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StockData() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const [conversionRate, setConversionRate] = useState(82.5); // Default conversion rate

  // Fetch daily conversion rate from an API
  const fetchConversionRate = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rate = response.data.rates.INR;
      setConversionRate(rate);
    } catch (err) {
      console.error('Failed to fetch conversion rate, using default:', err.message);
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, []);

  // Fetch stock data from the backend
  const fetchData = async (stockSymbol) => {
    try {
      const response = await axios.get(`http://localhost:5000/stock/${stockSymbol}`);
      const stockData = response.data;

      // Convert price to INR using the fetched conversion rate
      stockData.price = (stockData.price * conversionRate).toFixed(2);
      stockData.dayHigh = (stockData.dayHigh * conversionRate).toFixed(2);
      stockData.dayLow = (stockData.dayLow * conversionRate).toFixed(2);
      stockData.previousClose = (stockData.previousClose * conversionRate).toFixed(2);

      setData(stockData);

      // Prepare chart data
      setChartData({
        labels: ['Previous Close', 'Day Low', 'Current Price', 'Day High'],
        datasets: [
          {
            label: `Price in INR for ${stockSymbol.toUpperCase()}`,
            data: [
              stockData.previousClose,
              stockData.dayLow,
              stockData.price,
              stockData.dayHigh,
            ],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });

      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error:', err.message);
    }
  };

  // Handle the search
  const handleSearch = () => {
    if (!symbol) {
      setError('Please enter a stock symbol.');
      return;
    }
    fetchData(symbol);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Stock Data Viewer</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{
            padding: '10px',
            marginRight: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>Stock Data for {symbol.toUpperCase()}</h2>
          <p><strong>Current Price:</strong> ₹{data.price}</p>
          <p><strong>High Price:</strong> ₹{data.dayHigh}</p>
          <p><strong>Low Price:</strong> ₹{data.dayLow}</p>
          <p><strong>Previous Close:</strong> ₹{data.previousClose}</p>
        </div>
      )}

      {chartData && (
        <div style={{ marginTop: '40px' }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Price Chart for ${symbol.toUpperCase()}`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StockData;
