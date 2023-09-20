import React from "react";
import { withRouter, Link } from "react-router-dom";

class ProductIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product-container">
        <Link
          style={{
            width: "100%",
            alignContent: "center",
            textDecoration: "none",
            color: "black",
          }}
          to={`/products/${product.id}`}
        >
          <img className="product-img" src={product.image_url} alt="" />

          <div className="product-content">
            <p style={{ fontWeight: 700 }}>{product.product_name}</p>
            <p>
              <span style={{ fontWeight: 700 }}>Price: $</span>
              {product.price}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductIndexItem;
