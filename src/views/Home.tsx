import { GetCountries } from "../utils/functions/fetchCountries";
import { Suspense, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MakeUser } from "../utils/functions/postuser";

type Country = {
  id: number;
  name: string;
};

type Inputs = {
  name: string;
};

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await MakeUser(data.name);
    reset();
  };

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
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <h1 className="text-red-500">Countries</h1>
          <ul>
            {countries.map((country) => (
              <li key={country.id}>{country.name}</li>
            ))}
          </ul>
        </Suspense>

        <div className="flex flex-col justify-center items-center border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} />
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
