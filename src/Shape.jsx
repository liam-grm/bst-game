import { shapeImages } from './shapeImages';

function Shape({ shape }) {
  return (
    <img
      src={shapeImages[shape]}
      alt={shape}
    />
  );
}

export default Shape;