import "../../../index.css";
function Card({ title, description, icon }) {
  return (
    <div className="card lamsa-card">
      <div className="card-body d-flex flex-column align-items-center text-center p-4">
        <div className="card-icon d-flex align-items-center gap-2">
          <i className={icon}></i> <p className="card-title">{title}</p>
        </div>

        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}
export default Card;
