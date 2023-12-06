import { Badge } from "flowbite-react";
import { ChangeEvent, useRef, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";

export interface OnUploadCallback {
  (file?: File): void | Promise<void>;
}
export interface FileUploadProps {
  existing?: string;
  onUpload: OnUploadCallback;
}

export function FileUpload(props: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState("");

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event?.target;
        if (!target) return;

        const file = target.files?target.files[0]:null;
        if (!file) return;

        const dataURL = URL.createObjectURL(file);
        setPreview(dataURL);
        props.onUpload(file);
    }

    const onFileDelete = () => {
        setPreview("");
        props.onUpload(undefined);
    }
    
    return (
      <div>
        <div className="flex flex-row items-center justify-center py-2">
          {preview ? (
            <img className="w-[96px] h-[96px] rounded-full" src={preview}></img>
          ) : (
            <RxAvatar className="w-[96px] h-[96px] rounded-full" />
          )}
        </div>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={onFileChange}
        ></input>

        <div className="flex flex-row items-center justify-center gap-2">
          <Badge
            className="cursor-pointer"
            icon={HiPencil}
            onClick={() => fileInputRef?.current?.click()}
            title="Change profile picture"
          ></Badge>

          <Badge
            className="cursor-pointer"
            icon={HiTrash}
            color="red"
            onClick={onFileDelete}
            title="Remove selected profile picture"
          ></Badge>
        </div>
      </div>
    );
}