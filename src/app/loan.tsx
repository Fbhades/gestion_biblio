// src/app/loan.tsx

import { useState, useEffect } from 'react';

const LoanPage = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [current, setCurrent] = useState<any[]>([]);

  useEffect(() => {
    // Récupération de l'historique des emprunts
    fetch('/api/history/history')
      .then(res => res.json())
      .then(data => setHistory(data.history))
      .catch(error => console.error('Error fetching loan history:', error));
    
    // Récupération des emprunts en cours
    fetch('/api/history/current')
      .then(res => res.json())
      .then(data => setCurrent(data.current))
      .catch(error => console.error('Error fetching current loans:', error));
  }, []);

  return (
    <div>
      <h1>Emprunts</h1>
      <div>
        <h2>Historique des emprunts</h2>
        <ul>
          {history.map((item: any) => (
            <li key={item.id}>{/* Afficher les détails de l'emprunt */}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Emprunts en cours</h2>
        <ul>
          {current.map((item: any) => (
            <li key={item.id}>{/* Afficher les détails de l'emprunt */}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoanPage;
