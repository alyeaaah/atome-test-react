import { useState } from "react";
import { Upload, UploadProps, UploadFile, Image, Button } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import {
  FileAddOutlined,
  PictureOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import styles from "./uploadDropzone.module.scss";

interface UploadBaseProps
  extends Omit<
    UploadProps,
    | "action"
    | "beforeUpload"
    | "customRequest"
    | "data"
    | "directory"
    | "headers"
    | "method"
    | "withCredentials"
    | "onDownload"
    | "onPreview"
    | "onRemove"
    | "previewFile"
    | "fileList"
    | "index"
    | "onChange"
  > {
  loading?: boolean;
  uploadType?: "image" | "document";
  uploadIcon?: React.ReactNode;
  uploadedIcon?: React.ReactNode;
  // updated: onRemove can receive index
  onRemove?: (index: number) => void;
  onChange?: (file: UploadChangeParam, index: number) => void;
  fileList: string[];
  index: number;
  "data-testid"?: string;
}

const UploadDropzone = (props: UploadBaseProps) => {
  const { loading, fileList, uploadIcon, uploadType } = props;
  const [uploadedFile, setUploadedFile] = useState<UploadFile | undefined>();

  const renderIcon = () => {
    if (loading) {
      return <LoadingOutlined style={{ fontSize: 24, marginBottom: 8 }} spin />;
    } else if (!fileList?.length) {
      if (uploadIcon) return uploadIcon;
      return uploadType === "document" ? (
        <FileAddOutlined style={{ fontSize: 32, marginBottom: 8 }} />
      ) : (
        <PictureOutlined style={{ fontSize: 32, marginBottom: 8 }} />
      );
    }
  };

  const renderUploadButton = () => {
    return (
      <div className="w-full h-full bg-emerald-50 rounded-lg flex flex-col justify-center items-center text-emerald-800 hover:cursor-pointer focus:bg-emerald-100">
        {renderIcon()}
        {!loading && (
          <div className="text-center px-4 text-xs">
            Drop {uploadType === "image" ? "images" : "files"} here or click to
            upload.
          </div>
        )}
        {loading && (
          <div className="text-center px-4 text-xs">Uploading...</div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`w-full min-h-36 border-dashed overflow-hidden border-emerald-100 border-2 rounded-lg flex flex-wrap gap-2 p-2 ${!!fileList?.length ? "hover:border-rose-300" : "hover:border-emerald-300"
        }`}
    >
      {/* Upload button visible if no files or allow multiple */}

      {/* Render all images */}
      {fileList?.length > 0 && (
        <Image.PreviewGroup>
          {fileList.map((url, idx) => (
            <div key={url} className="relative w-28 h-28">
              {props.onRemove && (
                <Button
                  danger
                  size="small"
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  className="absolute z-10 right-1 top-1"
                  onClick={() => props.onRemove?.(idx)}
                />
              )}
              <Image
                src={url}
                width={"100%"}
                height={"100%"}
                className="object-cover rounded"
              />
            </div>
          ))}
        </Image.PreviewGroup>
      )}
      <Upload
        // {...props}
        multiple={props?.multiple || false}
        style={{ width: "100%", height: "100%" }}
        showUploadList={props?.showUploadList || false}
        listType="picture-card"
        beforeUpload={() => false}
        disabled={loading}
        fileList={fileList?.map((url) => ({
          uid: url,
          name: url.split("/").pop() ?? "",
          status: "done",
          url,
        }))}
        onChange={(file) => props.onChange?.(file, props?.index || 0)}
        className={`${styles.uploadDropzone} relative w-28 h-28`}
      >
        <div className="relative w-28 h-28">{renderUploadButton()}</div>
      </Upload>

    </div>
  );
};

export default UploadDropzone;
