import { useState, useRef, RefObject } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const dayRef: RefObject<HTMLInputElement> = useRef(null);
  const monthRef: RefObject<HTMLInputElement> = useRef(null);
  const yearRef: RefObject<HTMLInputElement> = useRef(null);

  const calculateAge = () => {
    const day = parseInt(dayRef.current?.value || "1");
    const month = parseInt(monthRef.current?.value || "1");
    const year = parseInt(yearRef.current?.value || "1900");

    // Calculate age based on the current date
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
          </li>
          <li>
            <img src="./icon-arrow.svg" alt="flecha" />
          </li>
          <li>
            <ul>
              <li>{`${age.years} years`}</li>
              <li>{`${age.months} months`}</li>
              <li>{`${age.days} days`}</li>
            </ul>
          </li>
        </ul>
      </main>
    </>
  );
}

export default App;
