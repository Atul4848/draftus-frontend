import React from "react";
import HomeBanner from "./component/HomeBanner";
import Aboutus from "./component/Aboutus";
import FeaturedClasses from "./component/FeaturedClasses";

function Home() {
  return (
    <div>
      <HomeBanner />
      <Aboutus />
      <FeaturedClasses />
    </div>
  );
}
export default Home;
