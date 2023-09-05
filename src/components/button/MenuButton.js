import "./menuButton.css";

function MenuButton(props) {
  return (
    <button value={props.title} className={props.buttonCss}>
      {props.title}
    </button>
  );
}
export default MenuButton;
