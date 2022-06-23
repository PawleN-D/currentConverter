import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './converter.css';
  
function Converter() {
   
  const [data, setData] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("zar");
  const [to, setTo] = useState("usd");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  useEffect(() => {
    axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
        )
        .then((res) => {
      setData(res.data[from]);
    })
  }, [from]);
  
  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(data));
    convert();
  }, [data])
    
  // Function to convert the currency
  function convert() {
    var rate = data[to];
    setOutput(input * rate);
  }
  
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }
  
  return (
    <div className="main">
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input type="text" 
             placeholder="Enter the amount" 
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div >
          <HiSwitchHorizontal size="40px" 
                        onClick={() => { flip()}}/>
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}}>Convert</button>
        <h2>Amount:</h2>
        <p>{input+" "+from.toUpperCase()+" = "+output.toFixed(2) + " " + to.toUpperCase()}</p>
  
      </div>
    </div>
  );
}
  
export default Converter;