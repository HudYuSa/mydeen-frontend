import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  selectEventByEventCode,
  selectEventsError,
  selectEventsStatus,
} from "../../slices/eventSlice";

const FetchEvent = () => {
  const [eventFetched, setEventFetched] = useState(false);

  const { eventCode } = useParams();

  const event = useSelector((state) =>
    selectEventByEventCode(state, eventCode),
  );
  const eventsStatus = useSelector(selectEventsStatus);
  const eventsError = useSelector(selectEventsError);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!event) {
      dispatch(getEvent(eventCode));
    }
  }, [event, eventCode, dispatch]);

  useEffect(() => {
    if (eventsStatus === "success" || eventsError) {
      setEventFetched(true);
    }
  }, [eventFetched, eventsStatus, event, eventsError]);

  useEffect(() => {
    if (!event && eventFetched && eventsError) {
      navigate("/event/notfound");
      setEventFetched(false);
    }
  }, [event, navigate, eventFetched, eventsStatus, eventsError]);

  return eventsStatus === "pending" && !eventFetched ? (
    <Loader />
  ) : !event && eventsError && eventFetched ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    event && eventFetched && <Outlet />
  );
};
export default FetchEvent;
