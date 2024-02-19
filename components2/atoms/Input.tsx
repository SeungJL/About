import { Input as ChakraInput } from "@chakra-ui/react";
import { ChangeEventHandler, LegacyRef } from "react";
interface IInput {
  value: string | number | readonly string[];
  inputRef?: LegacyRef<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}
export default function Input({ value, inputRef, onChange, placeholder }: IInput) {
  return (
    <ChakraInput
      value={value}
      ref={inputRef}
      onChange={onChange}
      placeholder={placeholder}
      focusBorderColor="#00c2b3"
    />
  );
}
