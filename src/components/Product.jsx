import AddToCart from "./AddToCart";

export default function Product(props) {
  return (
    <div className="product--info">
      <img src={props.image} alt="Dessert Image" />
      <AddToCart
        cartCounter={props.cartCounter}
        handleDecrement={props.handleDecrement}
        handleIncrement={props.handleIncrement}
      />
      <h6>{props.category}</h6>
      <h4>{props.name}</h4>
      <p>{`$${props.price.toFixed(2)}`}</p>
    </div>
  );
}
