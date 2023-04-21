import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings";
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal"
import { ModalNames } from "@/types/modals"
import { Fragment } from "react"
import { PostItem, getAllPostTitles } from "../api/get-posts";
import { GenericPageProps } from "@/modules/types/types";
import Image from "next/image";
import CodeContainer from "@/modules/components/Layout/containers/code-container";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CodeBlock from "@/modules/components/Layout/containers/code-block";

interface NavigatingOpenSourceProps extends GenericPageProps {
}

const NavigatingOpenSource: React.FC<NavigatingOpenSourceProps> = ({ posts }) => {

    const { showModal, hideModal, isModalVisible } = useModalContext();
    useKeyMappings();
    return (
        <Fragment>
            <div className="blog-container">
                <h1 className=" text-4xl text-vim-purple font-extrabold " >Navigating Open Source</h1>
                <h2 className="blogHeader">Getting Started</h2>
                <p className="w-fit flex justify-start items-start text-vim-light">
                    Have you been looking for an open source codebase to contribute to?
                    Have you found it difficult to navigate a codebase, find an entry point,
                    understand what is actually going on? Do you want to know how code is written
                    in large enterprise codebases? If the answer to any of those questions is yes,
                    then this is the place for you.</p>
                <p>

                    The main focus of this blog is going to be breaking down code snippets and implementations
                    of large open source codebases such as grafana, docker, react or even typescript.
                    If you’ve never navigated open source before and you’re slightly inexperienced at navigating large codebases,
                    this article will guide you through some pointers on how to ‘ground’ yourself and work your way through.
                </p>
                <p>
                    I would like to state upfront, though, that as much as people advise beginners to ‘just contribute to open
                    source,’ it’s actually not a simple task. Sure, it’s possible to find small and simple packages/open-source
                    repos that you can contribute to. However, generally speaking, open-source codebases have gone through years
                    of iteration, refactoring, and abstraction that is not going to be immediately clear to someone venturing in for
                    the first time. That is to say, there is no one step or task that will get you from beginner to open-source
                    maintainer, but simply, time, reading, adding logs, and playing around will help you become more familiar with it.
                </p>
                <p>
                    The benefit of this approach is that it helps you set up a process for getting started on a new codebase
                    which is both helpful in your career as well as when coding personal projects. You’ll be
                    able to step through a codebase and understand how (often) very experienced and talented software
                    developers handle different implementations and utilise design patterns.
                </p>
                <div className="w-full">
                    In this blog post, we&apos;ll cover the following topics:
                    <ol>
                        <li>Finding a suitable codebase</li>
                        <li>Identifying entry point files in popular programming languages</li>
                        <li>Tips for navigating and understanding codebases</li>
                        <li>Recognizing common design patterns used in open-source projects</li>
                    </ol>
                </div>
                <h2 className="blogHeader">Finding a codebase</h2>
                <p className="w-full">
                    When looking for an open-source codebase to explore, there are several factors to consider:
                </p>
                <ol className="flex flex-col gap-2">
                    <li><span className="text-vim-red-standard font-extrabold">Choose a familiar programming language =&gt;</span> It&apos;s a good idea to start with a language you&apos;re familiar with. As you become more experienced, you may begin to understand code in any language, since most languages are abstractions of the same concepts. From my experience, if you know one scripting language (e.g., Python or JavaScript), one functional language (e.g., Haskell, Elixir, or Go), and one object-oriented programming (OOP) language (e.g., C#, C++, or Java), you&apos;ll start to see the same sort of things happening and be able to learn from alternative languages.
                    </li>
                    <li>
                        <span className="text-vim-red-standard font-extrabold">Pick a project you&apos;re actively using or interested in =&gt;</span> If you want to make a contribution, it&apos;s helpful to choose a project you&apos;re using or have a use case for, or one that is similar to software you&apos;re familiar with. This can help when navigating the codebase, as you&apos;ll be able to understand the user&apos;s flow through the program and when and why certain functions or methods will be called and used.
                    </li>

                    <li><span className="text-vim-red-standard font-extrabold">Utilize search functionality on version control hosting providers =&gt;</span> You can use the search functionality built directly into GitHub, GitLab, or other version control hosting providers to find projects. Pick a language to browse and have a look through popular repos within that domain.</li>

                    <div className="w-full flex justify-center items-center">
                        <div className=" xl:w-[825px] xl:h-[730px] rounded-md flex justify-center items-center  ">
                            <Image
                                src={"/github screenshot.png"}
                                alt={"Searching github"}
                                width={800}
                                height={750}
                                className="frosty-shadow my-4 rounded-md"
                            />
                        </div>
                    </div>

                    <li><span className="text-vim-red-standard font-extrabold">Look for good first issues on GitHub =&gt; </span>
                        You can use the search functionality built directly into GitHub, GitLab, or other version control hosting providers to find projects. Pick a language to browse and have a look through popular repos within that domain.
                    </li>
                </ol>
                <h2 className="blogHeader">Where to Start ⇒ Navigating Codebases on GitHub</h2>
                <div className="w-full flex flex-col gap-4">
                    <p>
                        When you find an interesting repository on GitHub, you&pos;ll want to start reading through the code. As you become more familiar with the codebase, you&pos;l be able to tackle issues directly. However, when first exploring a codebase, it&pos;s helpful to find an entry point and understand how the components fit together.
                    </p>

                    <ol className="flex flex-col gap-2">
                        <li><span className="text-vim-red-standard font-extrabold">Get the code into an IDE/Editor</span> <br />Modern editors and IDEs make it much easier to navigate codebases than the default GitHub interface. Even though GitHub has recently upgraded its search functionality, it&pos;s still preferable to open the codebase in an editor like Vim or VSCode. There are a couple of ways to do this:
                            <ol className="nested-list">
                                <li>
                                    <span className="text-vim-purple font-extrabold">Open VSCode in the browser directly =&gt;</span> GitHub has a built-in feature that allows you to open any GitHub codebase in VSCode in the browser. This provides an easier way to navigate through the repository and inspect functions, classes, and variables. To access this feature, simply append &quot;.dev&quot; to the end of the URL in place of &quot;.com&quot;; the rest of the URL remains the same.
                                </li>
                                <li>
                                    <span className="text-vim-purple font-extrabold">Fork & Clone the repository: =&gt;</span> Fork the repository and use the Git CLI to clone it to your local machine. This enables you to open the code in the editor of your choice.
                                    <div className="mt-4 flex justify-center min-w-full ">
                                        <CodeContainer>
                                            <CodeBlock language="bash"
                                                codeString={`git clone "repourl" --depth 1`} />
                                        </CodeContainer>

                                    </div>

                                </li>

                            </ol>
                        </li>
                    </ol>
                </div>

            </div>
            <FuzzyModal
                isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
                onClose={hideModal}
                posts={posts}
            />
        </Fragment>
    )
}

export default NavigatingOpenSource

export function getServerSideProps() {
    return {
        props: {
            posts: getAllPostTitles(),
        },
    };
}