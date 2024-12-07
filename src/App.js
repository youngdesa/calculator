import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [activeCalculator, setActiveCalculator] = useState('basic');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [deposit, setDeposit] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [depositResult, setDepositResult] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [pricePerCard, setPricePerCard] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input));
      } catch {
        setResult('Ошибка');
      }
    } else {
      setInput(value === 'C' ? '' : input + value);
      if (value === 'C') setResult('');
    }
  };

  const calculateDeposit = () => {
    const total = parseFloat(deposit) * (1 + parseFloat(interestRate) / 100 * parseFloat(years));
    setDepositResult(isNaN(total) ? null : total.toFixed(2));
  };

  const calculateTotalCost = () => {
    const total = parseInt(quantity) * parseFloat(pricePerCard);
    setTotalCost(isNaN(total) || total < 0 ? null : total.toFixed(2));
  };

  const renderCalculator = () => {
    if (activeCalculator === 'basic') {
      return (
        <div className="calculator">
          <div className="display">
            <div className="input">{input}</div>
            <div className="result">{result}</div>
          </div>
          <div className="buttons">
            {['7', '8', '9', '/','4', '5', '6', '*','1', '2', '3', '-','0', '.', '=', '+'].map(item => (
              <button key={item} onClick={() => handleButtonClick(item)}>{item}</button>
            ))}
            <button className="clear" onClick={() => handleButtonClick('C')}>C</button>
          </div>
        </div>
      );
    }
    return (
      <div className="calculator">
        <h2>{activeCalculator === 'deposit' ? 'Депозитный калькулятор' : 'Калькулятор визиток'}</h2>
        {activeCalculator === 'deposit' ? (
          <>
            <input value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="Сумма депозита" type="number" />
            <input value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="Процентная ставка (%)" type="number" />
            <input value={years} onChange={(e) => setYears(e.target.value)} placeholder="Срок вклада (в годах)" type="number" />
            <button onClick={calculateDeposit}>Рассчитать</button>
            {depositResult !== null && <h3>Итоговая сумма: {depositResult} руб.</h3>}
          </>
        ) : (
          <>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Количество визиток" type="number" />
            <input value={pricePerCard} onChange={(e) => setPricePerCard(e.target.value)} placeholder="Стоимость одной визитки" type="number" />
            <button onClick={calculateTotalCost}>Рассчитать</button>
            {totalCost !== null && <h3>Общая стоимость: {totalCost} руб.</h3>}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="header">
        {['basic', 'deposit', 'businessCards'].map(calc => (
          <button key={calc} onClick={() => setActiveCalculator(calc)}>{calc === 'basic' ? 'Калькулятор' : calc === 'deposit' ? 'Депозитный' : 'Калькулятор визиток'}</button>
        ))}
      </div>
      {renderCalculator()}
    </div>
  );
};

export default App;