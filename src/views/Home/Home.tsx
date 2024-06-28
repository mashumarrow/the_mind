import { useForm, SubmitHandler } from "react-hook-form";
import { MakeUser, Room } from "./hooks";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomIdContext, UserIdContext } from "../../Context";
import Layout from "../../Layout";

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

  //下2行は、Context(useContext)から値を取得している。
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
    <Layout>
      <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-b from-pink-200 to-blue-400 gap-10">
        <div className="flex flex-col text-black">
          <p className="mt-40 text-7xl font-semibold">The Mind</p>
          <p className="text-center text-lg font-semibold">
            ー ザ・マインド ー
          </p>
        </div>

        <div className="flex  mt-5 flex-col w-full">
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("name", { required: "名前を入力してください" })}
              className="border bg-white rounded w-2/3 h-11 px-3"
              placeholder="名前を入力してください"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded h-11 w-2/3"
            >
              ゲームを始める
            </button>
          </form>
        </div>

        <div className="relative flex items-center justify-center w-full px-5 gap-20">
          <hr className="flex-grow h-px bg-white border-t-2 dark:text-white"></hr>
          <span className="absolute px-3 font-normal text-gray-900 dark:text-white">
            遊び方
          </span>
          <hr className="flex-grow h-px bg-gray-200 border-t-2 dark:text-white"></hr>
        </div>

        <div className="px-5 text-sm dark:text-black">
          <p>
            the
            1~100までのカードが1人2枚ランダムに配られ、1チーム4人でお互いの手札を低い数字だと思う順番から出していきます。ただしお互いの手札は見えなく相手のスタンプや表情で予想して進めていきます。数字の小さい順に全てのカードを出すことができたらクリア！途中で順番を間違えたらアウト。
          </p>
          <br />
          <p>みんなの気持ちを一つにマインドをシンクロさせよう！</p>
        </div>
      </div>
    </Layout>
  );
};
