import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
function RibbonContent({ item }) {
  return (
    <Card size="small">
      <div className="drpdownclas">
        <b> Name :</b>
        <Link to={"/profile/athlete_detail/" + item.athlete_id}>
          <span>{item && item.user != "" ? item.user.fname : "N/A"}</span>
          <span> </span>
          <span>{item && item.user != "" ? item.user.lname : "N/A"}</span>
        </Link>
      </div>
      <div className="drpdownclas">
        <b> Email :</b>{" "}
        <span>{item && item.user != "" ? item.user.email : "N/A"}</span>
      </div>
      <div className="drpdownclas">
        <b> Contact :</b>{" "}
        <span>
          {item && item.user && item.user.get_user_details != ""
            ? item.user.get_user_details.phone
            : "N/A"}
        </span>
      </div>
      <Link to={"/profile/athlete_detail/" + item.athlete_id}>
        <div className="btnedu">
          <Button>View Detail</Button>
        </div>
      </Link>
    </Card>
  );
}
export default RibbonContent;
