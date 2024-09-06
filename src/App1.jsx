import { useState, useEffect, useRef } from 'react';

import { empty, wind, humidity, d01, n01, d02, n02, d03, n03, d04, n04, d09, n09, d10, n10, d11, n11, d13, n13, d50, n50 } from './assets/img.js';
import { FidgetSpinner } from 'react-loader-spinner'

function App() {
  const [userInput, setUserInput] = useState('');
  const [city, setCity] = useState('peshawar');
  const [weather, setWeather] = useState(false);
  const [isLoad, setIsLoad] = useState('');

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getData = async () => {
    const url = `.netlify/functions/weatherdata?city=${city}`;
    console.log(url);

    try {
      console.log('data loading...');
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (isMounted.current) {
        setUserInput('');
        setIsLoad('hidden');
        setWeather({
          icon: data.weather[0].icon,
          temp: data.main.temp.toFixed(),
          weather: data.weather[0].main,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          location: data.name,
          date: new Date(data.dt * 1000).toDateString(),
          desc: data.weather[0].description,
        });
      }
    } catch (error) {
      console.log(error);
      if (isMounted.current) {
        setWeather({
          icon: false,
          temp: 0,
          weather: 0,
          windSpeed: 0,
          humidity: 0,
          location: 'Not Found',
          date: 'Please Enter a Valid City Name',
        });
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoad('');
    setCity(userInput);
    console.log(userInput);
  };

  useEffect(() => {
    getData();
  }, [city]);

  const weatherIcons = {
    '01d': d01,
    '01n': n01,
    '02d': d02,
    '02n': n02,
    '03d': d03,
    '03n': n03,
    '04d': d04,
    '04n': n04,
    '09d': d09,
    '09n': n09,
    '10d': d10,
    '10n': n10,
    '11d': d11,
    '11n': n11,
    '13d': d13,
    '13n': n13,
    '50d': d50,
    '50n': n50,
  };

  const currentIcon = weatherIcons[weather.icon] || empty;

  return (
    // <div className="bg-slate-800 w-screen h-screen flex items-center flex-col text-white pt-8">
    //   <h1 className='text-4xl text-center mb-8 max-w-[20rem]'>Your Daily Forecast Clear and Simple</h1>

    //   <div className="w-1/4 min-w-[24rem] p-6 rounded-lg grid bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% backdrop-blur-2xl">
    //     <form className="flex justify-between" onSubmit={submitHandler}>
    //       <input
    //         type="text"
    //         required
    //         placeholder="Search"
    //         className="pl-5 outline-0 bg-white text-black/70 capitalize rounded-3xl w-10/12"
    //         value={userInput}
    //         onChange={(e) => setUserInput(e.target.value)}
    //       />
    //       <button type="submit" className="py-[0.5rem] rounded-full bg-white w-[3.1rem]">
    //         <i className="las la-search text-black text-2xl scale-x-[-1]"></i>
    //       </button>
    //     </form>

    //     <h1 className="text-lg font-semibold text-center mt-6">{weather.date}</h1>

    //     <div className="w-full flex justify-center p-8">
    //       <img
    //         src={currentIcon}
    //         alt="Weather Icon"
    //         className="w-28 object-cover"
    //         style={{ filter: 'drop-shadow(0 0 10px lightblue)' }}
    //       />
    //     </div>

    //     <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLoad}`}>
    //       <FidgetSpinner
    //         visible={true}
    //         height="80"
    //         width="80"
    //         ariaLabel="fidget-spinner-loading"
    //         wrapperStyle={{}}
    //         wrapperClass="fidget-spinner-wrapper"
    //         colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
    //         backgroundColor="#eee"
    //       /></div>

    //     <div className="text-center">
    //       <h2 className='capitalize mb-2'>{weather.desc}</h2>
    //       <h1 className="text-6xl font-semibold">{weather.temp}°<span className="text-4xl">C</span></h1>
    //       <p className="text-4xl mt-2">{weather.location}</p>
    //     </div>
    //     <div className="flex justify-between items-end mt-4">
    //       <div className="flex items-center w-full">
    //         <div className="flex-shrink-0">
    //           <img src={humidity} alt="Humidity" className="h-8 object-cover" />
    //         </div>
    //         <div className="ml-2 text-left">
    //           <p className="text-2xl">{weather.humidity}%</p>
    //           <p>Humidity</p>
    //         </div>
    //       </div>
    //       <div className="flex justify-end items-center w-full mt-4">
    //         <div className="flex-shrink-0">
    //           <img src={wind} alt="Wind Speed" className="h-8 object-cover" />
    //         </div>
    //         <div className="ml-2 flex flex-col items-end justify-end">
    //           <p className="text-2xl">{weather.windSpeed} km/h</p>
    //           <p>Wind Speed</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={`w-screen h-screen flex items-center justify-center bg-gradient-to-br ${weather.bgColor} text-white`}>
      {/* Main Weather Card */}
      <div className="w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] shadow-2xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section: Search and Instructions */}
        <div className="bg-white text-black p-8 w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center">
          <form className="flex mb-4" onSubmit={submitHandler}>
            <input
              type="text"
              required
              placeholder="Search city"
              className="pl-5 py-2 outline-none bg-gray-100 text-black rounded-3xl w-full shadow-md"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="ml-3 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition">
              <i className="las la-search text-xl"></i>
            </button>
          </form>
          <p className="text-sm text-gray-500">Enter a city name to get the latest weather forecast.</p>
        </div>
        
        {/* Right Section: Weather Info */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 w-full md:w-1/2 lg:w-[55%] flex flex-col justify-between relative">
          
          {/* Weather Date */}
          <h1 className="text-lg font-semibold mb-4 text-center">{weather.date}</h1>
          
          {/* Weather Icon */}
          <div className="flex justify-center mb-4">
            <img
              src={currentIcon}
              alt="Weather Icon"
              className="w-24 h-24 hover:scale-105 transition-transform"
            />
          </div>

          {/* Weather Description */}
          <h2 className="capitalize text-xl text-center mb-2">{weather.desc}</h2>

          {/* Temperature and Location */}
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold">{weather.temp}°<span className="text-3xl">C</span></h1>
            <p className="text-2xl mt-2">{weather.location}</p>
          </div>

          {/* Humidity and Wind Speed */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={humidity} alt="Humidity" className="h-8" />
              <div className="ml-2">
                <p className="text-lg">{weather.humidity}%</p>
                <p className="text-sm text-gray-400">Humidity</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={wind} alt="Wind Speed" className="h-8" />
              <div className="ml-2 text-right">
                <p className="text-lg">{weather.windSpeed} km/h</p>
                <p className="text-sm text-gray-400">Wind Speed</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  

  )
}

export default App