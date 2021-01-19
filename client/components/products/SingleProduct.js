import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleProduct} from '../../store/redux/products/singleProduct';
import {addToCartThunk} from '../../store/redux/cart/cart';

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart = (orderId, item) => {
    this.props.addToCart(orderId, item);
    alert('Added to cart!');
  };

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.productId);
  }

  render() {
    const {product} = this.props;
    const {user} = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
        Description: {product.description}
        <br />
        Price: ${product.price / 100}
        <br />
        <img src={product.imageUrl} />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <select
          // need value={props...}
          // need onChange={props.handleChange}
          name="quantity"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <p>
          <button
            type="submit"
            onClick={() => this.handleAddToCart(user.order.id, product)}
          >
            Add to Cart
          </button>
        </p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    user: state.user,
    cart: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (id, item) => dispatch(addToCartThunk(id, item)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
