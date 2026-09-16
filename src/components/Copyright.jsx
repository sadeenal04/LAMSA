import "../../src/index.css";
function Copyright({ style }) {
  return (
    <div className="copyright text-center py-3" style={style}>
      &copy; {new Date().getFullYear()} Lamsa. All rights reserved.
    </div>
  );
}
export default Copyright;
