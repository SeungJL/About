import { Textarea as ChakraTextarea } from "@chakra-ui/react";
import { ChangeEventHandler, LegacyRef } from "react";
interface ITextarea {
  value: string | number | readonly string[];
  textareaRef?: LegacyRef<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  minHeight?: number;
}
export default function Textarea({
  value,
  textareaRef,
  onChange,
  placeholder,
  minHeight,
}: ITextarea) {
  return (
    <ChakraTextarea
      value={value}
      ref={textareaRef}
      onChange={onChange}
      placeholder={placeholder}
      focusBorderColor="#00c2b3"
      minHeight={minHeight}
      backgroundColor="white"
    />
  );
}
