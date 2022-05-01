import React from "react";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
function CoachSeenAthlete({ item }) {
  return (
    <Card size="small">
      <div className="drpdownclas">
        <b> Name :</b>{" "}
        <Link to={"/profile/coach_details/" + item.coach_id}>
          <span>
            {item && item.coach_data && item.coach_data.fname != ""
              ? item.coach_data.fname
              : "N/A"}
          </span>
          <span> </span>
          <span>
            {item && item.coach_data && item.coach_data.lname != ""
              ? item.coach_data.lname
              : "N/A"}
          </span>
        </Link>
      </div>
      <div className="drpdownclas">
        <b> Email :</b>{" "}
        <span>
          {item && item.coach_data && item.coach_data.email != ""
            ? item.coach_data.email
            : "N/A"}
        </span>
      </div>
      <div className="drpdownclas">
        <b> Contact :</b>{" "}
        <span>
          {item && item.coach_data && item.coach_data.get_user_details != ""
            ? item.coach_data.get_user_details.phone
            : "N/A"}
        </span>
      </div>
      <Link to={"/profile/coach_details/" + item.coach_id}>
        <div className="btnedu">
          <Button>View Details</Button>
        </div>
      </Link>
    </Card>
  );
}
export default CoachSeenAthlete;
