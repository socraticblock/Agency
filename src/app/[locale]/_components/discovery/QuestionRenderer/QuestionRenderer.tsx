"use client";

import type { QuestionRendererProps } from "./types";
import { CardsInput, TabsInput, ToggleInput } from "./ChoiceInputs";
import { TextInput, TextareaInput, MultiInput } from "./TextInputs";
import { TagsInput, MultiSelectInput, ColorPaletteInput } from "./SelectInputs";

export function QuestionRenderer(props: QuestionRendererProps) {
  const { q } = props;

  if (q.type === "cards") return <CardsInput {...props} />;
  if (q.type === "tabs") return <TabsInput {...props} />;
  if (q.type === "toggle") return <ToggleInput {...props} />;

  if (q.type === "input") return <TextInput {...props} />;
  if (q.type === "textarea") return <TextareaInput {...props} />;
  if (q.type === "multi-input") return <MultiInput {...props} />;

  if (q.type === "tags") return <TagsInput {...props} />;
  if (q.type === "multi-select") return <MultiSelectInput {...props} />;
  if (q.type === "color-palette") return <ColorPaletteInput {...props} />;

  return null;
}
