import { supabase } from "../../utils/supabase";

// この関数は、1～maxまでの数字の中で、count枚分の数字を重複なしで生成します。
const generateRandomNumbers = (count: number, max: number) => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers);
};

//この関数は、指定された部屋のユーザーに手札を配ります。
export const PaththeCard = async (id: string, UserID: number) => {
  const cards = generateRandomNumbers(8, 100); //  8枚のカードを生成
  const {data : UserData, error : UserDataError} = await supabase.from('users').select('UserID').eq('RoomID', id);
  if (UserDataError) {
      console.error('ユーザーデータ取得失敗:', UserDataError);
      return;
  }else{
    const minUserID = Math.min(...UserData.map((user) => user.UserID));//UserIDの最小値を取得 *誰か一人がカードを配らないと、四回カードを配ってしまうから
    if (minUserID === UserID) {
        UserData.forEach(async (user, index) => {
            const hand1 = cards[index * 2];
            const hand2 = cards[index * 2 + 1];
            const { error : PaththeCardError} = await supabase.from('users').update({ hand1: hand1, hand2: hand2 }).eq('UserID', user.UserID); //ユーザーにカードを配る
            if (PaththeCardError) {
                console.error('カード配りに失敗しました:', PaththeCardError);
            }else{
              console.log("あなたがカードを配りました。")  
              const {error : RoomUpdateError} = await supabase.from('rooms').update({pathcard: true}).eq('RoomID', id); //手札が配り終えたことをDBに伝える
              if (RoomUpdateError) {
                  console.error('Roomテーブルのpathcardの更新に失敗:', RoomUpdateError);
              }else{
                console.log("Roomデータを更新しました。")
              }   
            }
        });
    }else{
        console.log("他のユーザーがカードを配っています。")
    } 
  }
}
