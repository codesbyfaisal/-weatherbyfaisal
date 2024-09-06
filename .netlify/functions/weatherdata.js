export default async (req, context) => {
  const url = new URL(req.url);
  const city = url.searchParams.get('city') || 'peshawar';

  const API_KEY = '0e6f4673b9f8af75f397f23f0e23bf4c';
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

  const response = await fetch(api_url);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};