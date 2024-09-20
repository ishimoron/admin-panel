import { IAuthContext } from '../../auth/models/Auth_I';
import { Categories_I, CategoryFromParent } from './Categories_I';

export interface ErrorResponse {
  error: string;
  message: string[] | string;
  statusCode?: number;
}

export interface apiCreateNewCategoryProps extends IAuthContext {
  newCategory: Categories_I;
  fileUrl?: string;
}

export interface apiCreateIconPathProps extends IAuthContext {
  fileIcon: File;
}

export interface apiCreateCategoryFromParentIdProps extends IAuthContext {
  newParentCategory: CategoryFromParent;
  fileUrl?: string;
}

export interface apiDeleteCategoryProps extends IAuthContext {
  id: number;
}

export interface apiUpdateCategoryProps extends IAuthContext {
  id: number;
  categoryName: string;
}
