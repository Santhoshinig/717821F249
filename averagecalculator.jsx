import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchNumbers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://20.244.56.144/numbers/${selectedType}`);
      const newNumbers = response.data.numbers;
      setNumbers(newNumbers);
      calculateAverage(newNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
    setLoading(false);
  };

  const calculateAverage = (newNumbers) => {
    let sum = 0;
    let count = 0;
    for (const num of newNumbers) {
      sum += num;
      count++;
    }
    const newAvg = sum / count;
    setAvg(newAvg.toFixed(2));
  };

  return (
    <div className="container">
      <h1 className="mt-5">Average Calculator</h1>
      <div className="row mt-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Number Type</option>
            <option value="primes">Prime Numbers</option>
            <option value="fibo">Fibonacci Numbers</option>
            <option value="rand">Random Numbers</option>
            <option value="even">Even Numbers</option>
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleFetchNumbers} disabled={!selectedType || loading}>
            {loading ? 'Loading...' : 'Fetch Numbers'}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <h3>Numbers:</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Number</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((number, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Average: {avg}</h3>
      </div>
    </div>
  );
};

export default AverageCalculator;
