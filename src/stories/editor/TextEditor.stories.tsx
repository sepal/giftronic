import type { Meta, StoryObj } from "@storybook/react";
import { TextEditor } from "@/components/Editor/TextEditor";
const meta = {
  title: "Editor/MemeTextInput",
  component: TextEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <TextEditor {...args} />
    </div>
  ),
  args: {
    onTextChange: (texts) => console.log(texts),
  },
};
