import fs from "fs";
import path from "path";

export function getAllPostTitles() {
  console.log(process.cwd());
  const postsDirectory = path.join(process.cwd(), "src/pages/blog");
  const filenames = fs.readdirSync(postsDirectory);
  console.log(filenames);
  const postTitles = filenames.map((filename) => {
    return filename.replace(/\.tsx$/, "");
  });
  console.log(postTitles);

  return postTitles;
}
