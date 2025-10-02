import { useState } from "react";
import { Modal, Button, Input } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export interface AlertProps {
  open: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  iconClassname?: string;
  title: string;
  description: string;
  refId?: string;
  buttons?: {
    label: string;
    onClick: (param?: any) => void;
    variant?: "primary" | "default" | "dashed" | "link" | "text";
    type?: "button" | "submit";
    autoFocus?: boolean;
    main?: boolean;
  }[];
  size?: "sm" | "md" | "lg";
  dismissable?: boolean;
  notes?: {
    placeholder: string;
    label: string;
    value: string;
    required?: boolean;
  };
  [key: string]: any;
}

const Confirmation = ({
  open,
  onClose,
  title,
  description,
  buttons,
  dismissable = true,
  notes,
  icon,
  iconClassname,
  refId,
}: AlertProps) => {
  const [noteText, setNoteText] = useState(notes?.value || "");

  return (
    <Modal
      open={open}
      onCancel={() => {
        setNoteText("");
        onClose();
      }}
      closable={dismissable}
      footer={null}
      centered
    >
      <div className="text-center">
        {icon ? (
          <span className={`text-5xl ${iconClassname}`}>{icon}</span>
        ) : (
          <ExclamationCircleOutlined className="text-5xl text-red-500" />
        )}
        <div className="mt-4 text-xl font-semibold">{title}</div>
        <div className="mt-2 text-gray-500">{description}</div>
      </div>

      {notes && (
        <div className="mt-4">
          <Input.TextArea
            rows={2}
            placeholder={notes.placeholder}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2">
        {buttons?.map((button, index) => (
          <Button
            key={index}
            autoFocus={button.autoFocus}
            type={button.variant === "primary" ? "primary" : "default"}
            disabled={notes?.required && !noteText && button.main === true}
            onClick={() => button.onClick(noteText)}
            block
          >
            {button.label}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default Confirmation;
