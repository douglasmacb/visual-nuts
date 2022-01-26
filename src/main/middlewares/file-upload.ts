import expressFileUpload from 'express-fileupload'

const options = {
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }
}
export const fileUpload = expressFileUpload(options)
