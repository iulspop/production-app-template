import type {
  ExampleComponentPort,
  ExampleComponentProps,
} from "../ports/example-component";

export const ExampleComponent = ({ message }: ExampleComponentProps) => (
  <p>{message}</p>
);

export const exampleComponentAdapter: ExampleComponentPort = {
  Component: ExampleComponent,
};
