export interface IFile {
  name: string,
  path: string,
  size: number,
  type: string,
  date: Date,
  user: IUser['_id'],
  children: IFile['_id'][],
  parent: IFile['_id'],
  accessLink?: string,
  __v: number,
  _id: string,
}

export interface IUploadFile {
  name: IFile['name'],
  id: string,
  progress: number,
}

export interface IUser {
  email: string,
  password: string,
  avatar?: string | null,
  storageSpace: number,
  usedSpace: number,
  files: IFile['_id'],
  __v: number,
  _id: string,
}
