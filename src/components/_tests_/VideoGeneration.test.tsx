import { describe, it, expect, vi, afterEach } from "vitest";
import { VideoGeneration } from "../VideoGeneration";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe("VideoGeneration", () => {
  afterEach(() => cleanup());

  // User enters a prompt longer than 3 characters and clicks Generate button
  it("should generate a video when user enters a prompt longer than 3 characters and clicks Generate button", () => {
    const onSubmit = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <VideoGeneration onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText(
      "A dancing cartoon polar bear dancing..."
    );
    fireEvent.change(input, { target: { value: "A funny cat video" } });
    fireEvent.click(getByText("Generate"));
    expect(onSubmit).toHaveBeenCalledWith("A funny cat video");
  });

  // User enters a prompt with special characters and clicks Generate button
  it("should generate a video when user enters a prompt with special characters and clicks Generate button", () => {
    const onSubmit = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <VideoGeneration onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText(
      "A dancing cartoon polar bear dancing..."
    );
    fireEvent.change(input, { target: { value: "A funny cat video!" } });
    fireEvent.click(getByText("Generate"));
    expect(onSubmit).toHaveBeenCalledWith("A funny cat video!");
  });

  // User enters a prompt with only 1 or 2 characters and clicks Generate button
  it("should not generate a video when user enters a prompt with only 1 or 2 characters and clicks Generate button", () => {
    const onSubmit = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <VideoGeneration onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText(
      "A dancing cartoon polar bear dancing..."
    );
    fireEvent.change(input, { target: { value: "A" } });
    fireEvent.click(getByText("Generate"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // User enters a prompt with only spaces and clicks Generate button
  it("should not generate a video when user enters a prompt with only spaces and clicks Generate button", () => {
    const onSubmit = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <VideoGeneration onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText(
      "A dancing cartoon polar bear dancing..."
    );
    fireEvent.change(input, { target: { value: "     " } });
    fireEvent.click(getByText("Generate"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
