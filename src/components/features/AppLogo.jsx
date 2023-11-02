import { Link } from "react-router-dom";
import ProjectLogo from "../../assets/project-logo.svg";

const AppLogo = () => {
  return (
    <header className="w-full">
      <div className="brand mb-4 flex w-full justify-center pt-4">
        <Link to={"/"}>
          <img className="w-[10rem]" src={ProjectLogo} alt="company brand" />
        </Link>
      </div>
    </header>
  );
};
export default AppLogo;
