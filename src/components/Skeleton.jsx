import './Skeleton.css';

/**
 * Generic shimmer placeholder block. Size it via className/style so it reserves
 * the exact footprint of the real element — prevents flash of dummy/old images
 * and layout shift while remote content (banners, hero) is loading.
 */
const Skeleton = ({ className = '', style }) => (
  <div className={`skeleton-box ${className}`} style={style} aria-hidden="true" />
);

export default Skeleton;
