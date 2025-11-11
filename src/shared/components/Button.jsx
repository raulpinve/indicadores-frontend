import { RiLoader4Fill  } from "react-icons/ri";

const Button = (props) => {
  const { type, loading, colorButton, textButton, onClick, children, className = "", title } = props;

  return (
    <button 
        type={type}
        className={`button-form ${className} button-form-${colorButton} ${loading ? "button-form-disabled": ``}`}
        title={title ? title : ""}
        disabled={loading}
        onClick={onClick}
    >
        { loading && <RiLoader4Fill className="animate-spin" />}
        { textButton || children }
    </button>
  )
}

export default Button