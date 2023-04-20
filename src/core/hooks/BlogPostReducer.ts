import { PostItem } from "@/pages/api/get-posts";

const blogPostReducer = (
  state: any[],
  action: { type: any; name?: any; posts?: any; initialPosts?: PostItem[] }
) => {
  let selectedIndex: number;
  switch (action.type) {
    case "RESET_STATE":
      return action.initialPosts; // Replace initialState with the initial state value
    case "UPDATE_POSTS":
      if (action.posts && action.posts.length > 0) {
        return action.posts.map((post: PostItem, index: number) => ({
          ...post,
          isSelected: index === 0 ? true : post.isSelected,
        }));
      } else {
        return action.posts;
      }

    case "SELECT_NAV_ITEM":
      return state.map((item) =>
        item.name === action.name
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      break;
    case "DOWN_KEY":
      selectedIndex = state.findIndex((item) => item.isSelected);
      if (selectedIndex !== -1) {
        // x % x = 0 so it will wrap around
        const nextIndex = (selectedIndex + 1) % state.length;
        return state.map((item, index) =>
          index === nextIndex
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        );
      }
      return state;
    case "UP_KEY":
      selectedIndex = state.findIndex((item) => item.isSelected);
      if (selectedIndex !== -1) {
        // x - 1 + length % length = x - 1
        const nextIndex = (selectedIndex - 1 + state.length) % state.length;
        return state.map((item, index) =>
          index === nextIndex
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        );
      }
      return state;
    default:
      return state;
  }
};

export { blogPostReducer };
