
import { useState, useEffect } from 'react';

const LoanPage = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [current, setCurrent] = useState<any[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Récupération de l'historique des emprunts
        const historyResponse = await fetch('/api/loans?type=history');
        const historyData = await historyResponse.json();
        setHistory(historyData);

        // Récupération des emprunts en cours
        const currentResponse = await fetch('/api/loans?type=current');
        const currentData = await currentResponse.json();
        setCurrent(currentData);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
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
