import { supabase } from "../../utils/supabase";

export const GetCountries = async () => {
        const { data, error } = await supabase.from("countries").select();
        console.log("Fetched data:", data);
        if(error){
            console.error("Fetch error:", error);
        }
        return { data, error };  // dataとerrorの両方を返す
    }
    
    export const MakeUser = async (name : string) => {
        const { error } = await supabase
        .from('users')
        .insert({name: name })
        if(error){
            console.error("Fetch error:", error);
        }else{
            console.log('送信しました')
        }
    }
    
    export const GetUsres = async () => {
        const { data, error } = await supabase.from('users').select();
        console.log("Fetched data:", data);
        if(error){
            console.error("Fetch error:", error);
        }
        return { data, error };  // dataとerrorの両方を返す
    }
    