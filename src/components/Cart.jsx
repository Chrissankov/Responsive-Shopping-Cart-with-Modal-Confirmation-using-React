import emptyCart from "../../assets/images/illustration-empty-cart.svg";

export default function Cart({
  cartCounter,
  cartItems,
  handleRemove,
  handleConfirm,
  totalPrice,
}) {
  return (
    <div className="cart--info">
      <h1>Your Cart ({cartCounter})</h1>
      {!cartCounter ? (
        <>
          <img src={emptyCart} alt="Empty Cart Icon" />
          <p>Your added items will appear here</p>
        </>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.name}>
                <p className="item--name">{item.name}</p>
                <div className="item--data">
                  <p className="item--quantity">{`${item.quantity}x`}</p>
                  <p className="item--iprice">{`@$${item.price.toFixed(2)}`}</p>
                  <span>{`$${(item.quantity * item.price.toFixed(2)).toFixed(
                    2
                  )}`}</span>

                  <button
                    onClick={() => handleRemove(item.name)}
                    className="remove"
                  >
                    x
                  </button>
                </div>
                <div className="divider" />
              </li>
            ))}
            <p className="totalPrice">
              Order Total <span>{`$${totalPrice.toFixed(2)}`}</span>
            </p>
          </ul>

          <div className="carbon-neutral">
            <img
              src="./assets/images/icon-carbon-neutral.svg"
              alt="Carbon Neutral Icon"
            />
            <p>
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <button onClick={handleConfirm} className="confirm-order">
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}
