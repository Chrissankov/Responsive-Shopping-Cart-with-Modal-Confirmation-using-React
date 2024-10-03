import addToCart from "../../assets/images/icon-add-to-cart.svg";

export default function AddToCart(props) {
  return (
    <>
      {!props.cartCounter && (
        <div onClick={props.handleIncrement} className="product--addToCart">
          <img src={addToCart} alt="Add to Cart Icon" />
          <span>Add to Cart</span>
        </div>
      )}

      {props.cartCounter > 0 && (
        <div className="product--operation">
          <button onClick={props.handleDecrement} className="operation">
            -
          </button>
          <p>{props.cartCounter}</p>
          <button onClick={props.handleIncrement} className="operation">
            +
          </button>
        </div>
      )}
    </>
  );
}
