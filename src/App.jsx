import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [btnState, setBtnState] = useState(true);
  const [log, setLog] = useState('Click the above button to start scraping');

  const scrapTrends = async () => {
    setLog('Scraping in progress, please wait...');
    setBtnState(false);

    const response = await fetch('https://x-trending-scrapper-41mj.onrender.com/api/scrap', {
      method: 'GET',
    });
    const res = await response.json();

    if (res.success) {
      setData(res.data);
      setLog('Scraping successful');
    } else {
      setLog('Scraping failed, click on the above button to try again');
    }
    setBtnState(true);
  };

  return (
    <div className="container">
      <h1>Twitter Trends Scraper</h1>
      <center>
        <button id="scrapBtn" onClick={scrapTrends} disabled={!btnState}>
          {btnState ? 'Scrap Trends' : 'Scraping...'}
        </button>
        <div id="logs">
          <p id="log-msg">{log}</p>
        </div>
      </center>
      {data && data.id && (
        <div className="trends-container">
          <span>Unique id: {data.id}</span>
          <h4>These are the most happening topics as on datetime: {data.datetime}</h4>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
            <span id="t1">1: {data.trend1}</span>
            <span id="t2">2: {data.trend2}</span>
            <span id="t3">3: {data.trend3}</span>
            <span id="t4">4: {data.trend4}</span>
            <span id="t5">5: {data.trend5}</span>
            <span>The IP address used for this query was: {data.ip}</span>
            <p>Here’s a JSON extract of this record from the MongoDB: {JSON.stringify(data)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;