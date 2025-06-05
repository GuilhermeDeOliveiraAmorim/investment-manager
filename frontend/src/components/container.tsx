import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 h-full">
      {children}
    </div>
  );
}
