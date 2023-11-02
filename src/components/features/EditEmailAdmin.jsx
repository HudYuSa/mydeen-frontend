import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EditEmailAdmin = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header>
        <nav className="t flex items-center justify-between bg-primary p-4 text-white">
          <button>
            <IoArrowBack size={30} onClick={goBack} />
          </button>

          <h1 className="flex-grow text-center text-xl">Settings</h1>
        </nav>
      </header>
    </>
  );
};
export default EditEmailAdmin;
