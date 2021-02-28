import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React, { ForwardRefRenderFunction } from 'react';

const VideoSvg = (props) => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4061" width="36" height="36">
    <path d="M450.133333 213.333333l-145.066666-170.666666H140.8l145.066667 170.666666zM876.8 213.333333l-145.066667-170.666666h-164.266666l145.066666 170.666666zM663.466667 213.333333l-145.066667-170.666666h-164.266667l145.066667 170.666666zM938.666667 42.666667h-157.866667l145.066667 170.666666H1002.666667V106.666667c0-36.266667-27.733333-64-64-64zM91.733333 42.666667H85.333333C49.066667 42.666667 21.333333 70.4 21.333333 106.666667v106.666666h215.466667L91.733333 42.666667zM21.333333 917.333333c0 36.266667 27.733333 64 64 64h853.333334c36.266667 0 64-27.733333 64-64V256H21.333333v661.333333z m341.333334-469.333333c0-36.266667 29.866667-53.333333 64-53.333333 10.666667 0 23.466667 2.133333 34.133333 8.533333L704 544c42.666667 23.466667 42.666667 83.2 0 106.666667l-243.2 140.8c-10.666667 6.4-21.333333 8.533333-34.133333 8.533333-34.133333 0-64-17.066667-64-53.333333V448z" fill="#1296db" p-id="4062" />
  </svg>
);

const InternalVideoIcon: ForwardRefRenderFunction<any, IconComponentProps> = (props, ref) => {
  return (
    <Icon ref={ref as any} component={VideoSvg} {...props} />
  );
};

export const VideoIcon = React.forwardRef<any, IconComponentProps>(InternalVideoIcon);
VideoIcon.displayName = 'VideoIcon';