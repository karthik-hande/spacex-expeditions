import React from "react";

import { ILaunch } from "../models";

interface IProps {
  launch: ILaunch;
}

const LaunchInfoCard: React.FC<IProps> = ({ launch }) => {

  const getLaunchStatus = (launch: ILaunch) => {
    if (launch.rocket.first_stage.cores[0].land_success === null) {
      return "----";
    }
    return ""+launch.rocket.first_stage.cores[0].land_success;
  };

  return (
    <div className="launch-card">
      <div className="thumbnail-container">
        <img
          className="thumbnail"
          src={launch.links.mission_patch_small}
          loading="lazy"
          alt="Rocket Image"
        />
      </div>
      <div className="info-container">
        <div className="info">
          <div className="title main">
            {launch.mission_name} #{launch.flight_number}
          </div>
        </div>
        <div className="info">
          <div className="title">Mission Id:</div>
          <div className="value">
            {launch.mission_id.length === 0
              ? "----"
              : launch.mission_id.map((id) => id + " ")}
          </div>
        </div>
        <div className="info">
          <div className="title">Launch Year:</div>
          <div className="value">{launch.launch_year}</div>
        </div>
        <div className="info">
          <div className="title">Successful Launch:</div>
          <div className="value">{"" + launch.launch_success}</div>
        </div>
        <div className="info">
          <div className="title">Successful Landing:</div>
          <div className="value">
            {getLaunchStatus(launch)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchInfoCard;
