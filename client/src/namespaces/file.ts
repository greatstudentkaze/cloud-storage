import { IFile } from '../interfaces';

export namespace ResponseType {
  export type Files = IFile[];

  export type CreateDirectory = IFile;

  export type UploadFile = IFile;

  export type DeleteFile = { message: string };

  export type SearchFiles = IFile[];
}
