import { Outlet } from "react-router-dom";

export function Todo() {
  return (
    <>
      <div className="p-4">
        <section className="my-2">
          <Outlet />
        </section>
      </div>
    </>
  );
}
