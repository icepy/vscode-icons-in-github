import { getIconForFile, getIconForFolder } from "vscode-icons-js";

const findIcon = (type: string, value: string): string => {
  switch (type) {
    case "directory": {
      return getIconForFolder(value) || "";
    }
    case "file": {
      return getIconForFile(value) || "";
    }
    default: {
      console.warn("type not support");
      return "";
    }
  }
}

export default findIcon;
