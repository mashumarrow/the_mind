import { supabase } from "../../utils/supabase";

// この関数は、指定されたユーザーの手札を取得します。
export const GetUserCard = async (UserID: number) => {
  const { data, error } = await supabase.from("users").select("hand1, hand2").eq("UserID", UserID);
  if (data) {
    console.log("手札取得できた", data);
    return data;
  } else {
    console.log("手札取得できない", error);
  }
};

// この関数は、指定された部屋の場のカードを更新します。
export const ChangeNowCard = async (id: string, card: number | null) => {
  const { data, error } = await supabase
    .from("rooms")
    .update({ now_card: card })
    .eq("RoomID", id)
    .select("now_card");
  if (error) {
    console.error("場のカードの更新に失敗しました。", error);
  } else {
    console.log("場のカードの更新に成功しました。", data);
  }
};

// この関数は、指定されたカードを比較し、成功か失敗を判定します。
export const CompareCards = async (nowcard: any, { hand1, hand2 }: any) => {
  console.log(hand1, hand2, nowcard);
  if ((hand1 !== null && hand1 < nowcard) || (hand2 !== null && hand2 < nowcard)) {
    console.log("場のカードが手札より大きいのでゲーム失敗です。");
    return false;
  }
  console.log("場のカードが手札より小さいのでゲーム続行です。");
  return true;
};

// この関数は、ゲームが失敗したときに、指定された部屋の成功フラグをfalseに更新します。
export const UpdateSuccess = async (RoomID: string, posiblity: boolean | null) => {
  if (posiblity === null) return console.log("成功可能性がnullです。");
  const { error } = await supabase
    .from("rooms")
    .update({ success: posiblity })
    .eq("RoomID", RoomID);
  if (error) {
    console.error("成功可能性の更新に失敗。", error);
  } else {
    console.log("成功可能性の更新に成功。");
  }
};

export const GetUserNameonRoom = async (RoomID: string) => {
  const { data, error } = await supabase.from("users").select("UserID, name").eq("RoomID", RoomID);
  if (data) {
    console.log(`${RoomID}のユーザー名を取得`, data);
    return data;
  } else {
    console.log("ユーザー名の取得失敗", error);
    return error;
  }
};

export const GetUserNumberofCards = async (RoomID: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("UserID, name, hand1, hand2")
    .eq("RoomID", RoomID);
  if (data) {
    console.log(`${RoomID}のユーザーIDと手札を取得`, data);
    return data;
  } else {
    console.log("ユーザー名の取得失敗", error);
    return error;
  }
};
