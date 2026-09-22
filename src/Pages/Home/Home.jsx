import About from "./About/About";
import Findstyle from "./FindStyle";
import Footer from "./Footer";
import Hero from "./Hero";
import Howwork from "./Howwork";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Findstyle />
      <Howwork />
      <Footer />
    </div>
  );
}

export default Home;
