import { useForm, SubmitHandler } from "react-hook-form";
import { MakeUser, Room } from "./hooks";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomIdContext, UserIdContext } from "../../Context";

type Inputs = {
  name: string;
};

export const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  //下3行は、Context(useContext)から値を取得している。

  const [, setId] = useContext(UserIdContext);
  const [, setRoomId] = useContext(RoomIdContext);

  //Form送信後に実行される。
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //console.log(data);
    const res: any = await MakeUser(data.name); //ユーザーを作成
    //console.log("res", res.data);
    if (res.data) {
      setId(res.data[0].UserID); //ContextにユーザーIDをセット
      const RoomID: string = await Room(res.data[0].UserID); //部屋を作成したり、部屋にユーザーを割り当てたりする。
      //console.log("RoomID", RoomID);
      setRoomId(RoomID); //Contextに部屋IDをセット
      navigate("/waiting");
    }
    reset(); //Formのリセット
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", { required: "名前を入力してください" })}
          className="border"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          送信
        </button>
      </form>
    </>
  );
};
