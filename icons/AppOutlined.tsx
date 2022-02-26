import React from 'react';
import { IconGenerator } from '../utils/IconGenerator';

const SVG = (props) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      d="M416 480H256C134.4 480 32 377.6 32 256S134.4 32 256 32 480 134.4 480 256v160c0 38.4-25.6 64-64 64zM256 128c-70.4 0-128 57.6-128 128s57.6 128 128 128h128V256c0-70.4-57.6-128-128-128zM256 992C134.4 992 32 889.6 32 768S134.4 544 256 544h160c38.4 0 64 25.6 64 64V768c0 121.6-102.4 224-224 224zM256 640c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128v-128H256zM768 992c-121.6 0-224-102.4-224-224V608c0-38.4 25.6-64 64-64H768c121.6 0 224 102.4 224 224s-102.4 224-224 224zM640 640v128c0 70.4 57.6 128 128 128s128-57.6 128-128-57.6-128-128-128h-128zM768 480H608c-38.4 0-64-25.6-64-64V256C544 134.4 646.4 32 768 32s224 102.4 224 224-102.4 224-224 224zM640 384h128c70.4 0 128-57.6 128-128s-57.6-128-128-128-128 57.6-128 128v128z"
      p-id="2749"
    />
  </svg>
);

export default IconGenerator('AppOutlined', SVG);
