import { Request } from 'express'
import fileUpload from 'express-fileupload'

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
  files?: fileUpload.FileArray
}

export interface FileUploadRequest extends Request {
  files?: fileUpload.FileArray
}
