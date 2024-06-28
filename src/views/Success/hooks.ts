import { supabase } from "../../utils/supabase";

export const PostTime = async (time: number, id : string, UserID : number) => {
    const {data : UserData, error : UserDataError} = await supabase.from('users').select('UserID').eq('RoomID', id);
    if (UserDataError) {
        console.error('ユーザーデータ取得失敗:', UserDataError);
        return;
    }else{
        const minUserID = Math.min(...UserData.map((user) => user.UserID));//UserIDの最小値を取得 *誰か一人がカードを配らないと、四回やってしまうから
        if (minUserID === UserID) {
            const { error } = await supabase.from('ranking').insert({ time: time });
            if (error) {
                console.error("結果を保存できませんでした。", error);
            } else {
                console.log("結果を保存しました。");
            }
        }
    }
}