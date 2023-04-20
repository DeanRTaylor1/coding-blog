import { PostItem } from "@/pages/api/get-posts";

const blogFuzzyFinder = (query: string, posts: PostItem[]): PostItem[] => {
  let matchedResults: PostItem[] = [];
  for (let post of posts) {
    let matchScore: number = 0;
    let { name } = post;
    let parts = name.toLowerCase().split(" ");
    let queryIndex = 0;
    for (let char of query.toLowerCase()) {
      if (char === " ") {
        continue;
      }
      while (queryIndex < parts.length) {
        let foundIndex = parts[queryIndex].indexOf(char);
        if (foundIndex > -1) {
          matchScore++;
          parts[queryIndex] = parts[queryIndex].slice(foundIndex + 1);
          break;
        } else {
          queryIndex++;
        }
      }
      if (queryIndex === parts.length) {
        break;
      }
    }
    if (matchScore === query.length) {
      matchedResults.push(post);
    }
  }
  console.log(matchedResults);
  return matchedResults;
};

export { blogFuzzyFinder };
