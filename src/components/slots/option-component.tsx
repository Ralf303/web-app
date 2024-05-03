//@ts-ignore
import audioOn from "../../res/icons/audioOn.png";
//@ts-ignore
import audioOff from "../../res/icons/audioOff.png";

interface OptionsProps {
  toggleAudio: () => void;
  audio: boolean;
}

function Options(props: OptionsProps) {
  return (
    <section id="options">
      <img
        src={props.audio ? audioOn : audioOff}
        id="audio"
        className="option"
        onClick={props.toggleAudio}
      />
    </section>
  );
}
export default Options;
