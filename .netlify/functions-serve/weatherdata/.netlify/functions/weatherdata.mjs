
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// .netlify/functions/weatherdata.js
var weatherdata_default = async (req, context) => {
  const url = new URL(req.url);
  const city = url.searchParams.get("city") || "peshawar";
  const API_KEY = "0e6f4673b9f8af75f397f23f0e23bf4c";
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(api_url);
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
};
export {
  weatherdata_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLm5ldGxpZnkvZnVuY3Rpb25zL3dlYXRoZXJkYXRhLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCBjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxLnVybCk7XG4gIGNvbnN0IGNpdHkgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2l0eScpIHx8ICdwZXNoYXdhcic7XG5cbiAgY29uc3QgQVBJX0tFWSA9ICcwZTZmNDY3M2I5ZjhhZjc1ZjM5N2YyM2YwZTIzYmY0Yyc7XG4gIGNvbnN0IGFwaV91cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0ke0FQSV9LRVl9YFxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpX3VybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShkYXRhKSwge1xuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG4gIH0pO1xufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBTyxzQkFBUSxPQUFPLEtBQUssWUFBWTtBQUNyQyxRQUFNLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRztBQUMzQixRQUFNLE9BQU8sSUFBSSxhQUFhLElBQUksTUFBTSxLQUFLO0FBRTdDLFFBQU0sVUFBVTtBQUNoQixRQUFNLFVBQVUscURBQXFELElBQUksdUJBQXVCLE9BQU87QUFFdkcsUUFBTSxXQUFXLE1BQU0sTUFBTSxPQUFPO0FBQ3BDLFFBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUVqQyxTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUFHO0FBQUEsSUFDeEMsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxFQUNoRCxDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
