import React from "react";
import Banner from "../../../assets/Management.jpg";

function HomeBanner() {
  return (
    <div className="banner__top">
      <div className="elementor-background-overlay"></div>
      <img src={Banner} alt="banner" />
      <div className="carousel-caption">
        <h3>
          <span>Welcome</span> to Draftus
        </h3>
        <p>
          <b> The Road To Your Future Starts Today!</b> <br />
          Draftus is an online social talent mining application focused on
          linking collegiate students from low to moderate income areas to
          careers in financial services, money center banking, and technology
          through mentoring partnerships with corporations, colleges,
          universities, and professional organizations.
        </p>
      </div>
    </div>
  );
}
export default HomeBanner;
