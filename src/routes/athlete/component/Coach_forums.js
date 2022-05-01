import React from "react";
import { Button, Collapse } from "antd";

function Coach_forums() {
  const { Panel } = Collapse;
  return (
    <div>
      <h3 className="activecoaches d-flex justify-content-start">
        Active Forums
      </h3>
      <div className="coachesflied">
        <Collapse ghost>
          <Panel header="John Doe " key="1">
            <div className="drpdownclas">
              <b> Name :</b> <span>John Doe</span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>John@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
          <Panel header="Ethan " key="2">
            <div className="drpdownclas">
              <b> Name :</b> <span>Ethan </span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>Ethan@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
          <Panel header="Shira " key="3">
            <div className="drpdownclas">
              <b> Name :</b> <span>Shira </span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>Shira@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
          <Panel header="hello" key="4">
            <div className="drpdownclas">
              <b> Name :</b> <span>Doe</span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>John@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
          <Panel header="hello" key="5">
            <div className="drpdownclas">
              <b> Name :</b> <span>John Doe</span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>John@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
          <Panel header="hello" key="6">
            <div className="drpdownclas">
              <b> Name :</b> <span>John Doe</span>
            </div>
            <div className="drpdownclas">
              <b> Email :</b> <span>John@gmail.com</span>
            </div>
            <div className="drpdownclas">
              <b> Contact :</b> <span>7543657787</span>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
export default Coach_forums;
