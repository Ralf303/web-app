import "../styles/gpu.css";
//@ts-ignore
import dev from "../img/dev.png";

function Gpu() {
  return (
    <div>
      <img className="soonImg" src={dev}></img>
      <p className="soon">Скоро...</p>
    </div>
  );
}

export default Gpu;
