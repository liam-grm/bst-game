import { resolveShapeKey, shapeImages } from './shapeImages';

function Shape({ shape }) {
  const shapeKey = resolveShapeKey(shape);
  const src = shapeImages[shapeKey];

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={`${shape} silhouette`}
      className="shape-image"
    />
  );
}

export default Shape;
