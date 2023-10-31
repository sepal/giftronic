import type { Meta, StoryObj } from "@storybook/react";

import { MemeTextInput } from "@/components/ui/memeTextInput";

const meta = {
  title: "UI/MemeTextInput",
  component: MemeTextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MemeTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Meme text input",
    defaultText: "Meme text input",
  },
};
