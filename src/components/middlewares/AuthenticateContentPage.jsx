import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkRole, selectCommonAuthenticate } from "../../slices/commonSlice";
import { useEffect } from "react";

const AuthenticateContentPage = () => {
  const commonAuthenticate = useSelector(selectCommonAuthenticate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkRole());
  }, [dispatch]);

  return commonAuthenticate && <Outlet />;
};
export default AuthenticateContentPage;
