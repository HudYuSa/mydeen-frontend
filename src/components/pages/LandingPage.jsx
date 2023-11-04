import { FaHashtag } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import AppLogo from "../features/AppLogo";

const LandingPage = () => {
  return (
    <>
      <AppLogo />
      <main>
        <section className="mx-auto w-4/5 max-w-lg">
          <div className="w-full rounded-lg  bg-primary px-4 py-8">
            <h1 className="mb-4 text-center text-2xl text-white">
              Gabung sebagai peserta
            </h1>
            <div className="relative">
              <form>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FaHashtag className="text-primary" size={"1.5rem"} />
                </div>
                <input
                  className="z-10 w-full rounded-md border py-4 pl-12 pr-[3.5rem] text-xl focus:outline-none"
                  type="text"
                  placeholder="Masukkan code"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    className={"cursor-pointer rounded-full bg-primary p-2"}
                  >
                    <AiOutlineArrowRight color="white" size={"1.25rem"} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Link
              className={
                "rounded-xl bg-primary px-10 py-2 text-xl text-white md:px-[4.5rem]"
              }
              to={"/admin/signup"}
            >
              Sign Up
            </Link>
            <Link
              className={
                "rounded-xl bg-primary px-10 py-2 text-xl text-white md:px-[4.5rem]"
              }
              to={"/admin/signin"}
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
export default LandingPage;
