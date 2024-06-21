import { useForm, SubmitHandler } from "react-hook-form";
import { MakeUser } from "./hooks";
import Layout from "../../Layout";

type Inputs = {
  name: string;
};

export const Home = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await MakeUser(data.name);
    reset();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-b from-pink-200 to-blue-400 gap-10">
        <div className="flex flex-col">
          <p className="mt-40 text-7xl font-semibold">The Mind</p>
          <p className="text-center text-lg font-semibold">ー ザ・マインド ー</p>
        </div>

        <div className="flex  mt-5 flex-col w-full">
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("name")}
              className="border rounded w-2/3 h-11 px-3"
              placeholder="名前を入力してください"
            />
            <button type="submit" className="bg-black text-white py-2 px-4 rounded h-11 w-2/3">
              ゲームを始める
            </button>
          </form>
        </div>

        <div className="relative flex items-center justify-center w-full px-5 gap-20">
          <hr className="flex-grow h-px bg-gray-200 border-t-2 dark:text-white"></hr>
          <span className="absolute px-3 font-normal text-gray-900 dark:text-white">遊び方</span>
          <hr className="flex-grow h-px bg-gray-200 border-t-2 dark:text-white"></hr>
        </div>

        <div className="px-5 text-sm">
          <p>
            the
            mindとはお互いの手札を低い数字だと思う順番から出していこう。お互いの手札は見えないよ。数字の小さい順に全てのカードを出すことができたらクリア！途中で順番を間違えたらアウトです。
          </p>
          <br />
          <p>みんなの気持ちを一つにマインドをシンクロさせよう！</p>
        </div>
      </div>
    </Layout>
  );
};
