import type { ReactNode, HTMLAttributes } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function Reveal({ children, delay, y, ...rest }: RevealProps) {
  return <div {...rest}>{children}</div>;
}

export function StaggerGroup({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; className?: string }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; className?: string }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
