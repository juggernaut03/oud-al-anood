import './ProductCardSkeleton.css';

/**
 * Layout placeholder shown while products are being fetched.
 * Mirrors ProductCard's box model (4/5 image + info block) so the grid
 * reserves the exact same space — no flash of dummy data, no layout shift.
 */
const ProductCardSkeleton = () => (
  <div className="product-card-skeleton" aria-hidden="true">
    <div className="pcs-image shimmer" />
    <div className="pcs-info">
      <div className="pcs-line shimmer" />
      <div className="pcs-line short shimmer" />
    </div>
  </div>
);

export default ProductCardSkeleton;
