import type { ComponentType } from "react";

export type ExampleComponentProps = {
  message: string;
};

export interface ExampleComponentPort {
  Component: ComponentType<ExampleComponentProps>;
}
