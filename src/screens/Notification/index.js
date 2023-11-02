import NotiCard from "./NotiCard";
import { useEffect, useState } from "react";
import { getNoti } from "../../services/notification";

const Notification = () => {
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    async function getData() {
      const responseNoti = await getNoti();
      if (responseNoti.status === 200) {
        setNoti(responseNoti.data.notifications);
      }
      console.log({ responseNoti });
    }
    getData();
  }, []);
  return (
    <div
      className="container"
      style={{ marginTop: "25px", alignItems: "center" }}
    >
      {noti.map((nt) => {
        return (
          <NotiCard
            message={nt.message}
            seen={nt.seen}
            date={nt.createdAt}
            id={nt._id}
          />
        );
      })}
    </div>
  );
};
export default Notification;
