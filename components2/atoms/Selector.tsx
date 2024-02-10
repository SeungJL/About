"use client";

import { Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { DispatchType } from "../../types2/reactTypes";
import { ActiveLocation } from "../../types2/serviceTypes/locationTypes";
import { isLocationType } from "../../utils/typeCheckUtils";

interface ISelector {
  defaultValue: string;
  options: string[];
  setValue: DispatchType<string> | DispatchType<ActiveLocation>;
}

export default function Selector({
  defaultValue,
  options,
  setValue: setParentValue,
}: ISelector) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.currentTarget.value;
    if (isLocationType(targetValue))
      setParentValue(targetValue as ActiveLocation);
    else (setParentValue as DispatchType<string>)(targetValue);
  };

  return (
    <div className="max-w-md">
      <Select size="sm" color="primary" value={value} onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx}>{option}</option>
        ))}
      </Select>
    </div>
  );
}
