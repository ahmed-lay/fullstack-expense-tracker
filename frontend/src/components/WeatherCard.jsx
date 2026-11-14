export default function WeatherCard({ data }) {
  if(!data) return null;
  const icon = data.weather?.[0]?.icon;
  return (
    <div>
      <h2>{data.name} — {Math.round(data.main.temp)}°C</h2>
      <p>{data.weather?.[0]?.description}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <div>Humidité: {data.main.humidity}% — Vent: {data.wind.speed} m/s</div>
    </div>
  );
}
