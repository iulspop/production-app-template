export type ExampleComponentProps = {
  message: string;
};

export const ExampleComponent = ({ message }: ExampleComponentProps) => (
  <p>{message}</p>
);
