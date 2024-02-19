import { Input as ChakraInput } from "@chakra-ui/react";
import { ChangeEventHandler, LegacyRef } from "react";
interface IInput {
  value: string | number | readonly string[];
  ref?: LegacyRef<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}
export default function Input({ value, ref, onChange, placeholder }: IInput) {
  return (
    <ChakraInput
      value={value}
      // ref={ref}
      onChange={onChange}
      placeholder={placeholder}
      focusBorderColor="#00c2b3"
    />
  );
}
