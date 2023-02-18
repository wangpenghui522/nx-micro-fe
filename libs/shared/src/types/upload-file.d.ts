export interface UploadFile {
  uid: string;
  name: string;
  url: string;
}

// 业务上传文件配置，根据后端配置中心查询（nacos - tenwit-cos.yaml）
export interface BizFile {
  bizKey: string; // 业务编码
  bizDesc?: string; // 业务描述
  fileTypes: string; // 文件类型 以,分隔
  maxFileSize: number; // 文件大小
}
