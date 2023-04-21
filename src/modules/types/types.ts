import { PostItem } from "@/pages/api/get-posts";
import { ModalNames } from "./modals";

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export const isTruthy = <T>(x: T): x is Truthy<T> => Boolean(x);

export interface GenericPageProps {
  posts: PostItem[];
}

export interface ModalProps {
  isVisible: boolean;
  onClose: (ModalNames: ModalNames) => void;
}
