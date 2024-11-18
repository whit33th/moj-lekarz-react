import BlueBtn from "./../Buttons/BlueBtn/BlueBtn";
import BlueBorderBtn from "../Buttons/BlueBorderBtn/BlueBorderBtn";

function Choice({choice1, choice2, cb1, cb2}) {
  return (
    <div style={{
			display: "flex",
			gap: "20px",
		}}>
      <BlueBorderBtn cb={cb1}>{choice1}</BlueBorderBtn>
      <BlueBtn cb={cb2}>{choice2}</BlueBtn>
    </div>
  );
}

export default Choice;
