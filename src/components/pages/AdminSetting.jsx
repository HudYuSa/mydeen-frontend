import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectAdmin,
  selectAdminLoggged,
} from "../../slices/adminSlice";
import { IoArrowBack } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminSetting = () => {
  const admin = useSelector(selectAdmin);
  const adminLogged = useSelector(selectAdminLoggged);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!adminLogged) {
      navigate("/");
    }
  }, [adminLogged, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-mainBackground">
      <header>
        <nav className="t flex items-center justify-between bg-primary p-4 text-white">
          <button>
            <IoArrowBack size={30} onClick={goBack} />
          </button>

          <h1 className="flex-grow text-center text-xl">Settings</h1>
        </nav>
      </header>
      <main>
        <h2 className="p-4 text-lg text-gray-600">Account information</h2>
        <ul className="border-y-2 bg-white ">
          <li className="ml-4 flex items-center justify-between border-b-2 py-2 pr-2">
            <p>Username</p>{" "}
            <div>
              <Link
                to={"/admin/setting/username"}
                className="flex items-center justify-end gap-2"
              >
                <p>{admin.username}</p>
                <FaChevronRight />
              </Link>
            </div>
          </li>
          <li className="ml-4 flex items-center justify-between border-b-2 py-2 pr-2">
            <p>Email</p>{" "}
            <div>
              <Link
                to={"/admin/setting/email"}
                className="flex items-center justify-end gap-2"
              >
                <p>{admin.email}</p>
                <FaChevronRight />
              </Link>
            </div>
          </li>
          <li className="ml-4 flex items-center justify-between py-2 pr-2">
            <p>Password</p>
            <div>
              <Link className="flex items-center justify-end gap-2">
                <FaChevronRight />
              </Link>
            </div>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-center text-2xl font-bold text-red-500"
        >
          Logout
        </button>
      </main>
    </div>
  );
};
export default AdminSetting;
