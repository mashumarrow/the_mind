import { supabase } from "../supabase";

export const GetCountries = async () => {
        const { data, error } = await supabase.from("countries").select();
        console.log("Fetched data:", data);
        if(error){
            console.error("Fetch error:", error);
        }
        return { data, error };  // dataとerrorの両方を返す
    }
    

