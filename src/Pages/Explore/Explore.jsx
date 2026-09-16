import Styles from "./Styles";
import Navbar from "../Home/Navbar";
import Copyright from "../../components/Copyright";
function Explore() {
  return (
    <section className="text-center py-20">
      <Navbar style={{ backgroundColor: "var(--background)" }} />
      <Styles />
      <Copyright style={{ backgroundColor: "var(--background)" }} />
    </section>
  );
}

export default Explore;
