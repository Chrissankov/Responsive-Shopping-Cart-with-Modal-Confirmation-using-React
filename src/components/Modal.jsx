import "../Modal.css";

export default function Modal({ totalPrice, cartItems, handleNewOrder }) {
  return (
    <div className="modal--background">
      <div className="model--overlay">
        <div className="modal--container">
          <img
            className="success"
            src="./assets/images/icon-order-confirmed.svg"
            alt="Success Icon"
          />
          <h2>
            <span>Order</span>
            <span> Confirmed</span>
          </h2>
          <p className="hope">We hope you enjoy your food!</p>

          <ul>
            {cartItems.map((item) => (
              <li key={item.name}>
                <img
                  src={`./assets/images/image-${item.name
                    .split(" ")
                    .join("")}-thumbnail.jpg`}
                  alt={`${item.name} Thumbnail`}
                />
                <p className="modal--name">{item.name}</p>
                <div className="modal--data">
                  <p className="modal--quantity">{`${item.quantity}x`}</p>
                  <p className="modal--iprice">{`@$${item.price.toFixed(
                    2
                  )}`}</p>
                  <span className="modal--price">{`$${(
                    item.quantity * item.price.toFixed(2)
                  ).toFixed(2)}`}</span>
                </div>
                <div className="modal--divider" />
              </li>
            ))}
            <p className="modal--totalPrice">
              Order Total <span>{`$${totalPrice.toFixed(2)}`}</span>
            </p>
          </ul>

          <button onClick={handleNewOrder} className="start-new-order">
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}
