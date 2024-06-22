import { supabase } from "../../utils/supabase";

//リアルタイムで部屋の状況を取得する関数
export const GetRoomAvailabilityonRealTime = (RoomID : string, onRoomUpdate : any, onRoomVacant : any) => {
  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms" },
      (payload) => {
        if (payload.old.RoomID === RoomID) {
          if (payload.new.fill === true) {
            console.log('データ変更がありました。4人揃いました。');
            onRoomUpdate(true);
          } else {
            console.log('データ変更がありましたが、まだ4人揃っていません。', payload.new);
            onRoomUpdate(false);
            onRoomVacant(payload.new.vacantplayer);            
          }
        } else {
          console.log('違う部屋です');
        }
      }
    ).subscribe();
};

//部屋の状況を取得する関数
export const GetRoomAvailability = async (RoomID : string) => {
  const { data, error } = await supabase.from("rooms").select("fill").eq("RoomID", RoomID)
  if (error) {
    console.log("部屋の状況の取得に失敗しました。", error);
  }else{
    console.log("部屋の空き状況です。", data);
  }
  return data;
};

export const GetRoomVacant = async (RoomID : string) => {
  const { data, error } = await supabase.from("rooms").select("vacantplayer").eq("RoomID", RoomID)
  if (error) {
    console.log("後何人かの取得に失敗しました。", error);
  }else{
    console.log("後何人かの取得に成功しました。", data);
  }
  return data;
};


//ユーザに部屋IDを割り当てる関数
export const AssignRoomIDtoUser = async (UserID : number, RoomID : string) => {
  const { data, error } = await supabase.from('users').update({ RoomID : RoomID}).eq('UserID', UserID).select()
  if(data){
    console.log("ユーザに部屋IDを割り当てました。", data);
  }else{
    console.log("ユーザーへの部屋ID割り当てに失敗しました。",error)
  }
}