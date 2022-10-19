const getFileExts = (fileType?: string) => {
  switch (fileType) {
    case "image/png":
      return "png";
    case "image/jpg":
      return "jpg";
    case "image/jpeg":
      return "jpeg";
    case "image/svg+xml":
      return "svg";
    case "image/gif":
      return "gif";
    default:
      return undefined;
  }
};

const getNewFile = (file: File, exts: string, name: string) =>
  new File([file], `${encodeURI(name)}.${exts}`, {
    type: file.type,
  });

/**
 * Encode files name to utf8 to avoid chinese garbled.
 * @param files
 * @returns
 */
export default function encodeFilesNameToUtf8(files: File[]) {
  return files.map((file) => {
    let exts: string | undefined;
    let name: string | undefined;
    if (file.name) {
      exts = file.name.split(".").pop();
      name = file.name.replace(`.${exts}`, "");
    } else if (file.type) {
      exts = getFileExts(file.type);
      name = new Date().getTime().toString();
    }
    if (exts && name) {
      const newFile = getNewFile(file, exts, name);
      return newFile;
    }

    return file;
  });
}
