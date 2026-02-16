import { describe, expect, test } from "vitest";

import { ExampleComponent } from "./example-component";
import { render, screen } from "~/test/react-test-utils";

describe("ExampleComponent", () => {
  test("given: a message prop, should: render the message", () => {
    render(<ExampleComponent message="hello world" />);

    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});
