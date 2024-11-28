import React, { useEffect, useState } from "react";

export default function Alert({ type, text }) {
  const [visible, setVisible] = useState(false); 

  let style = {};

  switch (type) {
    case 'success':
      style = {
        icon: 'bx bx-check-circle',
        textColor: 'text-green-900',
        bgColor: 'bg-green-400/95',
      };
      break;
    case 'error':
      style = {
        icon: 'bx bx-error-circle',
        textColor: 'text-red-900',
        bgColor: 'bg-red-400/95',
      };
      break;
    case 'warnning':
      style = {
        icon: 'bx bx-error',
        textColor: 'text-orange-900',
        bgColor: 'bg-orange-400/95',
      };
      break;
    case 'info':
      style = {
        icon: 'bx bx-info-circle',
        textColor: 'text-cyan-900',
        bgColor: 'bg-cyan-400/95',
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-10 z-50 right-10 flex items-center gap-2 w-1/3 mx-auto pl-2 py-2 rounded-md transition-transform duration-500 ${visible ? "translate-x-0" : "translate-x-full"
        } ${style.textColor} ${style.bgColor}`}
    >
      <i className={`${style.icon} text-lg`}></i>
      <p>{text}</p>
    </div>
  );
}
