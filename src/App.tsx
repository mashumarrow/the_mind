import { Suspense, useEffect, useState } from "react";
import { GetCountries } from "./utils/functions/fetchCountries";


type Country = {
  id: number;
  name: string;
};


function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const response = await GetCountries();
      if (response.data) {
        console.log(response.data);
        setCountries(response.data);
      } else {
        console.log("No data found", response.error);
      }
    };
    getCountries();
  }, []);


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-red-500">Countries</h1>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>{country.name}</li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}

export default App;