import React from "react";
import Aboutus from "../../assets/aboutus.jpg";

function About() {
  return (
    <div>
      <div className="banner__top">
        <div className="elementor-background-overlay"></div>
        <img src={Aboutus} alt="banner" />
        <div className="carousel-caption">
          <h3>
            <span>ABOUT</span> US
          </h3>
          <p>
            The ultimate job sourcing and recruitment tool for top candidates of
            color in the industry.
          </p>
        </div>
      </div>
      <div className="newContnainer">
        <div className="brifhding">
          <h2 className="themestek-custom-heading">about us</h2>
          <p>
            Draftus is an online social talent mining application focused on
            linking collegiate students from low to moderate income areas to
            careers in financial services, money center banking, and technology
            through mentoring partnerships with corporations, colleges,
            universities, and professional organizations.
          </p>
        </div>
        <div className="brifhding">
          <h2 className="themestek-custom-heading">How Draftus Works</h2>
          <p>
            In addition to the usual college metrics such as GPA,
            extracurricular activities, and standardized test scores, Athletes,
            or young professionals, create a video cover letter that showcases
            their strengths and uniqueness, things that are commonly overlooked
            in recruitment. Once this information is secured on their profile,
            they will then be connected with a mentor who is experienced in the
            field that our athlete is starting their career in. Coaches are
            mentors that guide the Athlete by giving them the tips and tricks of
            the trade, helping them to establish connections, and set them up
            for success in corporate America.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
