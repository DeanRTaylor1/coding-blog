import { getAllPostTitles } from "../../../pages/api/get-posts";
import { blogFuzzyFinder } from "../fuzzyFinder";

const testData = [
  {
    name: "Grafana Modal Manager",
    link: "/blog/grafana-modal-manager-typescript",
    language: "typescript",
    icon: "typescript",
    tags: ["grafana", "modal", "manager", "typescript"],
    isSelected: true,
    createdAt: "2023-04-20T03:04:09.717Z",
  },
  {
    name: "Navigating Open Source",
    link: "/blog/navigating-open-source-typescript",
    language: "typescript",
    icon: "typescript",
    tags: ["navigating", "open", "source", "typescript"],
    isSelected: false,
    createdAt: "2023-04-20T01:36:50.295Z",
  },
  {
    name: "React Advanced Patterns",
    link: "/blog/react-advanced-patterns-javascript",
    language: "javascript",
    icon: "javascript",
    tags: ["react", "advanced", "patterns", "javascript"],
    isSelected: false,
    createdAt: "2023-04-18T09:30:42.295Z",
  },
  {
    name: "Vue 3 Composition API",
    link: "/blog/vue-3-composition-api-javascript",
    language: "javascript",
    icon: "javascript",
    tags: ["vue", "3", "composition", "api", "javascript"],
    isSelected: false,
    createdAt: "2023-04-15T14:20:35.295Z",
  },
  {
    name: "Next.js Performance Optimization",
    link: "/blog/next-js-performance-optimization-typescript",
    language: "typescript",
    icon: "typescript",
    tags: ["nextjs", "performance", "optimization", "typescript"],
    isSelected: false,
    createdAt: "2023-04-12T10:25:50.295Z",
  },
  {
    name: "Angular Best Practices",
    link: "/blog/angular-best-practices-typescript",
    language: "typescript",
    icon: "typescript",
    tags: ["angular", "best", "practices", "typescript"],
    isSelected: false,
    createdAt: "2023-04-10T12:55:42.295Z",
  },
];

describe("testing valid inputs", () => {
  it("returns list unaltered if given blank input", () => {
    const results = blogFuzzyFinder("", testData);
    expect(results).toHaveLength(testData.length);
  });
  it("returns object containing query string if string in name", () => {
    const query = "angular";
    const results = blogFuzzyFinder(query, testData);
    expect(results).toHaveLength(1);
    expect(results[0].name.toLowerCase()).toContain(query);
  });
  it("returns empty array if string not found", () => {
    const query = "abfeosihcecsef";
    const results = blogFuzzyFinder(query, testData);
    expect(results).toHaveLength(0);
  });
});
