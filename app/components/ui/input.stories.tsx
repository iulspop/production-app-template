import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta = {
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url"],
    },
  },
  component: Input,
  title: "UI/Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const Email: Story = {
  args: { placeholder: "email@example.com", type: "email" },
};

export const Password: Story = {
  args: { placeholder: "Password", type: "password" },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input", value: "Cannot edit" },
};

export const WithValue: Story = {
  args: { defaultValue: "Hello world", type: "text" },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Bad value", type: "email" },
};
