import { Label, TextInput } from "flowbite-react";
import { FC, SVGProps } from "react";

interface IInput {
  id: string;
  type: string;
  placeholder?: string;
  labelText?: string;
  rightIcon?: FC<SVGProps<SVGSVGElement>>;
}
export default function Input({
  id,
  type,
  labelText,
  rightIcon,
  placeholder,
}: IInput) {
  return (
    <div className="max-w-md">
      {labelText && (
        <div className="mb-2 block">
          <Label htmlFor="email4" value="Your email" />
        </div>
      )}

      <TextInput
        className="flow-text-input"
        id="email4"
        type={type}
        rightIcon={rightIcon}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
