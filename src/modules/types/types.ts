import { PostItem } from "@/pages/api/get-posts";

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export const isTruthy = <T>(x: T): x is Truthy<T> => Boolean(x);

export interface GenericPageProps {
  posts: PostItem[];
}
