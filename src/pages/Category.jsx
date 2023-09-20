import React from "react";
import ProductIndexItem from "./product_index_item";

class Category extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProducts("");
  }
  render() {
    let { products } = this.props;
    const categoryItems = (
      products.filter(
        (product) => product.category === this.props.match.params.category
      ) || []
    ).map((product) => {
      return <ProductIndexItem key={product.id} product={product} />;
    });
    return <div className="product-index">{categoryItems}</div>;
  }
}

export default Category;
