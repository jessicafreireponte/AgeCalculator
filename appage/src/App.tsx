import { useState, useRef, RefObject } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState("");
  const dayRef: RefObject<HTMLInputElement> = useRef(null);
  const monthRef: RefObject<HTMLInputElement> = useRef(null);
  const yearRef: RefObject<HTMLInputElement> = useRef(null);

  const calculateAge = () => {
    const day = parseInt(dayRef.current?.value || "1");
    const month = parseInt(monthRef.current?.value || "1");
    const year = parseInt(yearRef.current?.value || "1900");

    if (day > 31) {
      setError("Día no válido");
    } else if (month > 12) {
      setError("Mes no válido");
    } else if (year < 1990) {
      setError("Año no válido de 1990 en adelante");
    } else {
      setError("");
    }

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    setAge({ years, months, days });
  };

  const handleInputChange = () => {
    calculateAge();
  };

  return (
    <>
      <main>
        <ul className="content">
          <li>
            <form>
              <label>
                DAY
                <input
                  type="number"
                  ref={dayRef}
                  name="day"
                  min="1"
                  max="31"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                MONTH
                <input
                  type="number"
                  ref={monthRef}
                  name="mes"
                  min="1"
                  max="12"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                YEAR
                <input
                  type="number"
                  ref={yearRef}
                  name="ano"
                  min="1900"
                  onChange={handleInputChange}
                />
              </label>
            </form>
            {error !== "" ? <p>{error} </p> : ""}
          </li>
          <li className="line">
            <hr />
            <img src="/flecha2.png" alt="flecha" />
          </li>
          <li className="datos">
            <ul>
              <li>
                <em>{age.years} </em>
                {` years`}
              </li>
              <li>
                <em>{age.months} </em>
                {` months`}
              </li>
              <li>
                <em>{age.days} </em>
                {` days`}
              </li>
            </ul>
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
