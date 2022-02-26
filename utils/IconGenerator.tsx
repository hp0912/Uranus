import Icon, {
  CustomIconComponentProps,
  IconComponentProps,
} from '@ant-design/icons/lib/components/Icon';
import React, { ForwardRefRenderFunction } from 'react';

export const IconGenerator = (
  displayName: string,
  component: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
) => {
  const InternalIcon: ForwardRefRenderFunction<any, IconComponentProps> = (
    props,
    ref
  ) => {
    return <Icon ref={ref as any} component={component} {...props} />;
  };

  const OuterIcon = React.forwardRef<any, IconComponentProps>(InternalIcon);
  OuterIcon.displayName = displayName;

  return OuterIcon;
};
