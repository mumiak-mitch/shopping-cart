import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Importing useParams and useNavigate instead of useRouteMatch
import "../styles/Details.css";
import data from "../data";

const Details = ({ buyNow, addToCart }) => {
  const { id } = useParams(); // Using useParams to get the route parameter instead of useRouteMatch
  const navigate = useNavigate(); // Using useNavigate for navigation

  const [selected, setSelected] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const selectedData = data.find((item) => item.id === id);

    if (!selectedData) {
      setError(true);
      return;
    }

    setSelected(selectedData);
    setError(false);
  }, [id]);

  const increaseSelectedQty = () => {
    setSelected({ ...selected, qty: selected.qty + 1 });
  };

  const decreaseSelectedQty = () => {
    if (selected.qty === 1) return;
    setSelected({ ...selected, qty: selected.qty - 1 });
  };

  const selectedChangeHandler = (e) => {
    setSelected({ ...selected, qty: e.target.value });
  };

  const setSelectedDefault = (e) => {
    if (e.target.value === "" || e.target.value === "0")
      setSelected({ ...selected, qty: 1 });
  };

  return !error ? (
    <div className="details">
      <img src={selected.image} alt={selected.brand} />
      <div className="details__info">
        <h2>{selected.brand}</h2>
        <br />
        <p>{selected.description}</p>
        <br />
        <span>${selected.price}</span>
        <br />
        <div className="details__quantity">
          <label>Quantity: </label>
          <button onClick={decreaseSelectedQty}>-</button>
          <input
            type="number"
            value={selected.qty || 1}
            onChange={selectedChangeHandler}
            onBlur={setSelectedDefault}
          />
          <button onClick={increaseSelectedQty}>+</button>
        </div>
        <div className="details__btns">
          <button onClick={() => navigate("/cart")}>Buy Now</button>
          <button onClick={() => addToCart(selected)}>Add to cart</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="error">Product not found</div>
  );
};

export default Details;