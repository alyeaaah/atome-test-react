import React from "react";
import { notification } from "antd";
import { ToastContentInterface, ToastContext } from "./ToastContext";
import Icon from "@ant-design/icons";

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (content: ToastContentInterface) => {
    api.open({
      message: content.title ?? "",
      description: (
        <>
          {content.text}
          {content?.action && (
            <a
              onClick={(e) => {
                e.preventDefault();
                content.action?.onClick();
              }}
              style={{ marginLeft: 8 }}
            >
              {content.action.text}
            </a>
          )}
        </>
      ),
      icon: !!content.icon ? (typeof content.icon === "string" ? <Icon name={content.icon} /> : content.icon) : undefined, // supports ReactNode (e.g. AntD icons)
      duration: content.duration / 1000, // antd expects seconds
    });
  };

  return (
    <ToastContext.Provider value={{ showNotification }}>
      {children}
      {contextHolder} {/* Required to render notifications */}
    </ToastContext.Provider>
  );
};
