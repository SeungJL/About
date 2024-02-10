"use client";

import HighlightSelectButton from "@/components/atoms/buttons/HighlightSelectButton";
import Link from "next/link";

interface ITabNav {
  left: {
    text: string;
    url: string;
  };
  right: {
    text: string;
    url: string;
  };
  currentText: string;
}

export default function TabNav({ left, right, currentText }: ITabNav) {
  return (
    <nav className="flex">
      <Link href={left.url} className="flex-1">
        <HighlightSelectButton
          text="공지 알림"
          isSelected={left.text === currentText}
        />
      </Link>
      <Link href={right.url} className="flex-1">
        <HighlightSelectButton
          text="활동 알림"
          isSelected={right.text === currentText}
        />
      </Link>
    </nav>
  );
}
