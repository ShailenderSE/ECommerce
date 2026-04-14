import PropTypes from "prop-types";

export default function ProductGrid({ products }) {
  return (
    <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 bg-white rounded-2xl shadow">
          <img
            src={product.image}
            alt={product.title}
            className="h-60 w-48 mx-auto mb-4 object-contain"
          />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
