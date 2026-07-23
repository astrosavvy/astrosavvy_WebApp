import HomeHero from "../components/HomeHero";
  import AwardsTimeline from "../components/AwardsTimeline";
  import HomeAbout from "../components/HomeAbout";
 import ServicesSection from "../components/ServicesSection";
 import HomeTrustSection from "../components/HomeTrustSection";

function Home() {
  return (
    <>
      <HomeHero />
        <AwardsTimeline />
        <HomeAbout />
       <ServicesSection/>
        <HomeTrustSection />
    </>
  );
}

export default Home;
