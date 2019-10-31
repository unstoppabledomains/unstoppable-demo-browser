import * as React from 'react';
import { Path, StyledPreloader } from './style';

export interface Props {
  style?: any;
  color?: string;
  thickness?: number;
  size?: number;
}

export const Preloader = ({ style, color, size, thickness }: Props) => {
  return (
    <div style={style}>
      <StyledPreloader size={size}>
        <svg viewBox="25 25 50 50">
          <Path
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeMiterlimit="10"
            color={color}
            thickness={thickness}
          />
        </svg>
      </StyledPreloader>
    </div>
  );
};