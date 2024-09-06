import { useState, useEffect, useRef, useMemo } from 'react';
import { empty, wind, humidity, view, location, d01, n01, d02, n02, d03, n03, d04, n04, d09, n09, d10, n10, d11, n11, d13, n13, d50, n50 } from './assets/img.js';
import { FidgetSpinner } from 'react-loader-spinner';

function App() {
  const [userInput, setUserInput] = useState('');
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const url = `.netlify/functions/weatherdata?city=${city}`;

    timeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 5000);

    try {
      const response = await fetch(url);
      const data = await response.json();
      clearTimeout(timeoutRef.current);

      if (isMounted.current) {
        setIsLoading(false);
        setWeather({
          icon: data.weather[0].icon,
          temp: data.main.temp.toFixed(),
          feelsLike: data.main.feels_like.toFixed(),
          condition: data.weather[0].main,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          cloudCover: data.clouds.all,
          visibility: (data.visibility / 1609.34).toFixed(1),
          location: data.name,
          date: new Date(data.dt * 1000).toDateString(),
        });
      }
    } catch (error) {
      if (isMounted.current) {
        setIsLoading(false);
        setWeather({
          icon: 'empty',
          temp: '0',
          feelsLike: '',
          condition: 'Please enter a valid city',
          windSpeed: '0',
          humidity: '0',
          cloudCover: '0',
          visibility: '0',
          location: '',
          date: new Date().toDateString(),
        });
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCity(userInput);
    setUserInput('');
    getData();
  };

  useEffect(() => {
    getData();
  }, [city]);

  const weatherIcons = useMemo(() => ({
    '01d': d01, '01n': n01, '02d': d02, '02n': n02,
    '03d': d03, '03n': n03, '04d': d04, '04n': n04,
    '09d': d09, '09n': n09, '10d': d10, '10n': n10,
    '11d': d11, '11n': n11, '13d': d13, '13n': n13,
    '50d': d50, '50n': n50, 'empty': empty,
  }), []);

  const currentIcon = weatherIcons[weather?.icon] || empty;

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 w-screen h-screen text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-[25rem] md:w-[40vw] md:min-w-[38rem]">
        <div className="flex justify-between items-center mb-4">
          <div className='md:flex items-center gap-4 hidden'>
            <img src={location} alt="Location Icon" className="w-6 h-6" />
            <h1 className="text-3xl text-nowrap font-bold">{weather?.location || 'Weather App'}</h1>
          </div>
          <form className="w-full flex rounded-lg overflow-hidden bg-slate-700 shadow-slate-800 shadow-lg md:w-auto" onSubmit={submitHandler}>
            <input
              type="text"
              required
              placeholder="Search"
              className="p-2 w-10/12 text-slate-800"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="p-2 bg-slate-800 w-2/12">
              <i className="las la-search text-xl"></i>
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <FidgetSpinner
              visible={true}
              height="80"
              width="80"
              ariaLabel="fidget-spinner-loading"
              wrapperClass="fidget-spinner-wrapper"
              backgroundColor="rgb(30 41 59)"
            />
          </div>
        ) : weather ? (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:w-1/2 text-slate-800 p-4 rounded-t-lg bg-white shadow-slate-800 shadow-lg md:rounded-lg">
              <div className='flex items-center gap-4 md:hidden'>
                <img src={location} alt="Location Icon" className="w-6 h-6 invert" />
                <h1 className="text-3xl text-nowrap font-bold">{weather?.location || 'Weather App'}</h1>
              </div>
              <img
                src={currentIcon}
                alt="Weather Icon"
                className="w-32"
              />
              <p className="text-xl">{weather.condition}</p>
              <h1 className="text-6xl p-2 font-semibold mb-2">{weather.temp}°<span className="text-3xl">C</span></h1>
              <p className="text-xl mb-2">Feels like {weather.feelsLike}°C</p>
            </div>
            <div className="w-full md:w-4/6 py-1">
              <table className="w-full h-full bg-slate-800 text-left flex justify-center py-6 text-wrap shadow-slate-800 shadow-lg rounded-b-lg md:rounded-r-xl md:rounded-s-none">
                <tbody className="text-xl block mx-auto">
                  <tr rowSpan={2}>
                    <td className='text-center text-xl' colSpan={3}>{weather.date}</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td className="w-10 p-2">
                      <img src={wind} alt="Wind Speed Icon" className="w-6 h-6" />
                    </td>
                    <td className="pr-6">Wind Speed:</td>
                    <td>{weather.windSpeed} mph</td>
                  </tr>
                  <tr>
                    <td className="w-10 p-2">
                      <img src={humidity} alt="Humidity Icon" className="w-6 h-6" />
                    </td>
                    <td className="pr-6">Humidity:</td>
                    <td>{weather.humidity}%</td>
                  </tr>
                  <tr>
                    <td className="w-10 p-2">
                      <img src={d03} alt="Cloud Icon" className="w-6 h-6" />
                    </td>
                    <td className="pr-6">Cloud Cover:</td>
                    <td>{weather.cloudCover}%</td>
                  </tr>
                  <tr>
                    <td className="w-10 p-2">
                      <img src={view} alt="Visibility Icon" className="w-6 h-6" />
                    </td>
                    <td className="pr-6">Visibility:</td>
                    <td>{weather.visibility} mi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-xl">
            <img src={empty} alt="Empty Icon" className="w-32 mb-4" />
            <p>Please try again later</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;