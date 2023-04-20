import { capitaliseFirstLetters } from "@/modules/utils/capitalise-first-letter";
import fs from "fs";
import path from "path";

interface PostItem {
  name: string;
  link: string;
  language: string;
  icon: string;
  tags: string[];
  isSelected: boolean;
  createdAt: string;
}

export function getAllPostTitles() {
  console.log(process.cwd());
  const postsDirectory = path.join(process.cwd(), "src/pages/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const postTitles = filenames.map((filename, i) => {
    const { birthtimeMs } = fs.statSync(`${postsDirectory}/${filename}`);
    const createdAt = new Date(birthtimeMs).toISOString();
    const parts = filename.split("-").map((part) => part.replace(/\.tsx$/, ""));
    const language = parts[parts.length - 1];
    return {
      name: capitaliseFirstLetters(parts.slice(0, -1)).join(" "),
      link: `/blog/${filename.replace(/\.tsx$/, "")}`,
      language,
      icon: language,
      tags: parts,
      isSelected: i === 0,
      createdAt: createdAt,
    };
  });
  console.log(postTitles);
  return postTitles;
}

export type { PostItem };
