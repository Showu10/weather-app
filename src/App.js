import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function Week() {
  function getData() {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&past_days=1",
    )
      .then((res) => res.json())
      .then((data) => {
        let temp = `${data.current.temperature_2m}°C`;
        let days = "";
        let maxs = "";
        let mins = "";
        data.daily.time.forEach((day) => {
          days += `
            <li><a href="/${day}">${day}</a></li>
          `;
        });
        data.daily.temperature_2m_max.forEach((max) => {
          maxs += `
            <li>${max}°C</li>
          `;
        });
        data.daily.temperature_2m_min.forEach((min) => {
          mins += `
            <li>${min}°C</li>
          `;
        });
        document.getElementById("days").innerHTML = days;
        document.getElementById("max").innerHTML = maxs;
        document.getElementById("min").innerHTML = mins;
        document.getElementById("temp").innerHTML = temp;
      });
  }
  return (
    <div>
      {getData()}
      <h1>Week</h1>
      <div className="position-relative">
        <div className="left">
          <ul>
            <li>Day:</li>
            <li>Min Temp:</li>
            <li>Max Temp:</li>
          </ul>
        </div>
        <div className="right">
          <ul id="days" className="hor"></ul>
          <ul id="min" className="hor"></ul>
          <ul id="max" className="hor"></ul>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <h2>Delhi</h2>
      <h2 id="temp"></h2>
      <br />
      <Week />
    </div>
  );
}

function Day() {
  const { id } = useParams();
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&past_days=92&forecast_days=16",
  )
    .then((res) => res.json())
    .then((data) => {
      const x = data.daily.time.indexOf(id);
      const day = `<h2>${data.daily.time[x]}</h1>`;
      const max = `<h3>Max Temp: ${data.daily.temperature_2m_max[x]}</h2>`;
      const min = `<h3>Min Temp: ${data.daily.temperature_2m_min[x]}</h2>`;
      const sun = `<h3>Sunrise: ${data.daily.sunrise[x]}</h2>`;
      const set = `<h3>Sunset: ${data.daily.sunset[x]}</h2>`;
      document.getElementById("days").innerHTML = day;
      document.getElementById("max").innerHTML = max;
      document.getElementById("min").innerHTML = min;
      document.getElementById("sun").innerHTML = sun;
      document.getElementById("set").innerHTML = set;
    });
  return (
    <>
      <h3>
        <a href="/">🔙Return to home page</a>
      </h3>
      <div id="days" className="App"></div>
      <div id="max"></div>
      <div id="min"></div>
      <div id="sun"></div>
      <div id="set"></div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<Day />} />
      </Routes>
    </Router>
  );
}
