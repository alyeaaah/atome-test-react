import { ComponentProps, ComponentType, SVGProps } from 'react'

export type IconProps = Omit<
  ComponentProps<"svg">,
  "height" | "width" | "widths"
> & {
  size?: "small" | "regular";
};

type Icon = ComponentType<IconProps>;
import Illustration_ from '@/assets/images/illustrations/illustration.svg'
import ErrorIllustration_ from '@/assets/images/error-illustration.svg'

export const Illustration = Illustration_ as unknown as Icon;
export const ErrorIllustration = ErrorIllustration_ as unknown as Icon;




