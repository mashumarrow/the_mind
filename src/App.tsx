import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iugkezjkrodtdxfzverc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Z2tlemprcm9kdGR4Znp2ZXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MzE1NjgsImV4cCI6MjAzNDIwNzU2OH0.b4cCjvU3urfWaJNZ_5dohRi1B6emQQg8vmoleFOapi4"
);

function App() {
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data }: any = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      <h1>yoshito</h1>
      {countries.map((country: any) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
