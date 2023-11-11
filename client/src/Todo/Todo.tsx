import { Outlet, useNavigate } from "react-router-dom";

export function Todo() {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded rounded-lg bg-blue-300 p-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-center uppercase text-2xl">
            Your Todos
          </h1>

          <button className="bg-blue-700 rounded rounded-lg p-2 px-4 text-white"
            onClick={()=>navigate("/todo/new")}>
            Add another
          </button>
        </div>

        <section className="my-2 p-4">
          <Outlet />
        </section>
      </div>
    </>
  );
}
