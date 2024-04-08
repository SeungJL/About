"use client";

import { useState } from "react";

export default function BottomDrawer() {
  const [isOpen, setIsOpen] = useState(false); // Drawer의 열림 상태를 관리합니다.

  // Drawer를 열고 닫는 함수
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Drawer 컴포넌트 */}
      <div
        id="drawer-bottom-example"
        className={`fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`} // isOpen 상태에 따라 변환을 적용합니다.
        tabIndex={-1}
        aria-labelledby="drawer-bottom-label"
      >
        <h5
          id="drawer-bottom-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          {/* 아이콘과 제목 */}
          Bottom drawer
        </h5>
        <button
          type="button"
          onClick={toggleDrawer} // 버튼 클릭 시 Drawer 닫기
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          {/* 닫기 아이콘 */}
          <span className="sr-only">Close menu</span>
        </button>

        {/* 컨텐츠 */}
        <p className="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">
          Supercharge your hiring by taking advantage of our{" "}
          <a
            href="#"
            className="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline"
          >
            limited-time sale
          </a>{" "}
          for Flowbite Docs + Job Board.
        </p>
        {/* 액션 버튼들 */}
      </div>
    </>
  );
}
