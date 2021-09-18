import React, {useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import {apiUrl} from "../../../config/api/url";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
} as React.CSSProperties;

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
} as React.CSSProperties;

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100px',
  height: '100px'
};

export const uploadImage = async (files: any) => {
  let formData = new FormData();
  files.map((file: any) => {
    formData.append("file", file);
  });
  const res = await axios.post(`${apiUrl}/image/user`, formData, {
    headers: {
    "Content-Type": 'multipart/form-data',
    }
  });
  return res.data;
}

const Uploader = ({multiple, files, setFiles, defaultImage}: {multiple: boolean, files: any, setFiles: any, defaultImage?: string}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    multiple
  });

  const thumbs = () => {
    if (files.length === 0 && defaultImage) {
      return (<img src={defaultImage} style={img}/>)
    }

    return files.map((file: any) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ))
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="mt-3">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className={"border d-flex justify-content-center"} style={{cursor: 'pointer'}}>
          <div className={"my-auto"}>
            {thumbs()}
          </div>
          <div>
            <p className={"text-secondary text-center p-3"}>
              ドラッグアンドドロップ<br/>
              または<br/>
              クリックをして画像をアップロードしてください
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Uploader;
