import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, Icon, Circle, Tooltip } from './style';

interface Props {
  onClick?: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
  onMouseDown?: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
  size?: number;
  style?: any;
  icon: string;
  divRef?: (ref: HTMLDivElement) => void;
  disabled?: boolean;
  className?: string;
  children?: any;
  opacity?: number;
  autoInvert?: boolean;
  tooltip?: string;
}

export const ToolbarButton = observer(
  ({
    icon,
    onClick,
    onMouseDown,
    size,
    disabled,
    className,
    divRef,
    children,
    opacity,
    autoInvert,
    style,
    tooltip
  }: Props) => {
    style = { ...style };

    return (
      <Button
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={className}
        style={style}
        ref={(r: HTMLDivElement) => {
          if (typeof divRef === 'function') {
            divRef(r);
          }
        }}
        disabled={disabled}
      >
        <Icon
          style={{ backgroundImage: `url(${icon})` }}
          size={size}
          disabled={disabled}
          opacity={opacity}
          autoInvert={autoInvert}
        />
        <Circle></Circle>
        <Tooltip visible={tooltip ? true : false}>{tooltip}</Tooltip>
        {children}
      </Button>
    );
  },
);

(ToolbarButton as any).defaultProps = {
  size: 20,
  autoInvert: true,
};