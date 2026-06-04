import armor from './assets/shapes/armor.png';
import arms from './assets/shapes/arms.png';
import ball from './assets/shapes/ball.png';
import blob from './assets/shapes/blob.png';
import bugwings from './assets/shapes/bug-wings.png';
import fish from './assets/shapes/fish.png';
import heads from './assets/shapes/heads.png';
import humanoid from './assets/shapes/humanoid.png';
import legs from './assets/shapes/legs.png';
import quadruped from './assets/shapes/quadruped.png';
import squiggle from './assets/shapes/squiggle.png';
import upright from './assets/shapes/upright.png';
import wings from './assets/shapes/wings.png';

const SHAPE_NAME_ALIASES = {
  'bug-wings': 'bugwings',
};

export const shapeImages = {
  armor,
  arms,
  ball,
  blob,
  bugwings,
  fish,
  heads,
  humanoid,
  legs,
  quadruped,
  squiggle,
  upright,
  wings,
};

export function resolveShapeKey(apiShapeName) {
  return SHAPE_NAME_ALIASES[apiShapeName] ?? apiShapeName;
}
