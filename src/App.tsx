import React, { useEffect, useState, CSSProperties} from "react";
import "./App.css";

// Type Definitions
type GreetingProps = {
 
};

type Data = {
  main: {
    temp: number;
    humidity: number;
    sea_level: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

const Greeting: React.FC<GreetingProps> = () => {
  const [data, setData] = useState<Data | null>(null);
  const [location, setLocation] = useState<string>('Ho Chi Minh City')
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  // Fetch data
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const apiKey = "a638d72e1ded6bfebc1f457af80a00cc";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
        );
        const dataRes: Data = await res.json();
        setData(dataRes);
      } catch (ex) {
        if (ex instanceof Error) {
          console.error(ex.message);
        } else {
          console.error("Unknown Error");
        }
      }
    };
    fetchAPI();
  }, [isSubmit]);
  const submitCityLocation = () => {
    setIsSubmit(!isSubmit)
  }
  return (

      <div style={{backgroundImage:'url(https://images.unsplash.com/photo-1565642899687-1c332fb7dc65?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}} className="App">
        <h1 style={{backgroundColor: '#0866FF', marginTop:'5px', color:'white'}}>WEATHER APP</h1>
        <div>
          {data === null ? (
            <p>Nothing Data To Show</p>
          ) : (
            <div>
              <ul style={ulStyle}>
              <li style={weatherContent}>Weather Information</li>
        <li style={liStyle}>________________________________</li>
        <li style={liStyle}>Description: <span style={spanStyle}>{data.weather?.[0]?.description || 'N/A'}</span></li>
        <li style={liStyle}>Temperature: <span style={spanStyle}>{data.main?.temp || 'N/A'} °F</span></li>
        <li style={liStyle}>Min Temp: <span style={spanStyle}>{data.main?.temp_min || 'N/A'} °F</span></li>
        <li style={liStyle}>Max Temp: <span style={spanStyle}>{data.main?.temp_max || 'N/A'} °F</span></li>
        <li style={liStyle}>Humidity: <span style={spanStyle}>{data.main?.humidity || 'N/A'} %</span></li>
        <li style={liStyle}>Wind Speed: <span style={spanStyle}>{data.wind?.speed || 'N/A'} km/h</span></li>
        <li style={liStyle}>Location: <span style={spanStyle}>{data.name || 'N/A'}</span></li>
        <li style={liStyle}>Weather: <span style={spanStyle}>{data.weather?.[0]?.main || 'N/A'}</span></li>
              </ul>
            </div>
          )}
        </div>
        <div>
        <input placeholder="Input your city ..." onChange={(t)=>setLocation(t.target.value)} value={location} style={inputText} type="text" />
        <button onClick={submitCityLocation} style={btnStyle}>Check</button>
        </div>
      </div>

  );
};

export default Greeting;
const btnStyle : CSSProperties = {padding:'10px', fontSize:'15px', borderRadius: '10px'}
const inputText : CSSProperties = {padding: '10px', width:'25%', margin:'5px 5px 20px 4.5%'}
const liStyle : CSSProperties = {padding: '5px', color:'darkblue', fontSize: '24px'}
const spanStyle : CSSProperties = {color: 'red'}
const weatherContent : CSSProperties = {textAlign:'center', fontSize:'24px', color:'green', fontWeight:'bold'}
const ulStyle : CSSProperties  ={
  display:'inline-block',
  listStyleType:'none',
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  margin: '20px auto',
  textAlign: 'center',
}