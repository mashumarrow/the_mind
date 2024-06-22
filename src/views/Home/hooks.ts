import { supabase } from "../../utils/supabase";


//この関数は、Form送信後に実行され、ユーザーを作成します。
export const MakeUser = async (name : string) => {
    const { data, error } = await supabase.from('users').insert({name: name }).select('UserID, name')
    if(data){
        console.log("ユーザーを作成しました。", data);
    }else{
        console.log(error)
    }
    return { data, error };  
}

//この関数は、4人集まっていない部屋のデータを取得してきます。
const GetRoom = async () => {
    const { data : RoomData, error : RoomDataError} = await supabase.from('rooms').select().eq('fill', false);
    console.log("4人集まっていない部屋の情報です。", RoomData);
    if(RoomDataError){
        console.error("4人集まっていない部屋の情報取得に失敗しました。", RoomDataError);
    }
    return { RoomData, RoomDataError }; 
}

//この関数は、新たに部屋を作成し、一人目にユーザーを割り当てます。
const MakeRoom = async (UserID : number) => {
    const {data, error } = await supabase.from('rooms').insert({'person_one' : UserID}).select('RoomID')
    if(error){
        console.error("部屋の作成に失敗しました:", error);
    }else{
        console.log('部屋を作成しました。')
    }
    return data;
}

//この関数は、部屋の状況を確認し、空いている場所(2,3,4人目に)にユーザーを割り当てます。
const AssignMembertoRoom = async (id : string, UserID : number) => {
    const { data, error } = await supabase.from('rooms').select('person_two,person_third,person_four').eq('RoomID', id);
    console.log("部屋の状況です。", data);
    if(error){
        console.error("部屋の状況の取得に失敗しました。", error);
        return;
    }else{
        try{
            if(data[0].person_two === null){
                await JoinRoom(UserID, id, 'person_two')
            }else if(data[0].person_third === null){
                await JoinRoom(UserID, id, 'person_third')
            }else if(data[0].person_four === null){
                await JoinRoom(UserID, id, 'person_four')
            }
        } catch (error) {
            console.error("部屋の割り当てに失敗しました。", error);
        }    
    };
}

//この関数は、部屋の割り当てと4人目を割り当てる際に部屋が埋まったことを伝えます。
const JoinRoom = async (UserID : number, id : string, number : string) => {
    const updatedata : any= { [number] : UserID }
    if (number === 'person_four') {
        updatedata['fill'] = true
    }
    const { data, error } = await supabase.from('rooms').update(updatedata).eq('RoomID', id).select()
    if(error){
        console.error(`${updatedata[number]}は部屋に参加できませんでした。`, error);
    }else{
        console.log(`${updatedata[number]}は部屋に参加できました。`,data)
    }
}

//この関数は、部屋があるかどうかを確認し、なければ部屋を作成し、あれば部屋に割り当てます。
export const Room = async (UserID : number) => {
    const res : any = await GetRoom();
    if (res.RoomData?.length === 0) {
        const RoomID : any = await MakeRoom(UserID);
        //console.log('RoomID',RoomID[0].RoomID);
        return RoomID[0].RoomID;
    }else{
        console.log("部屋があります");
        const RoomID = res.RoomData[0].RoomID;
        //console.log('roomID',RoomID);
        await AssignMembertoRoom(RoomID, UserID);       
        return RoomID;
    }
}