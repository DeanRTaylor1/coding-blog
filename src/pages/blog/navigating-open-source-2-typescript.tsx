
import { useKeyMappings } from "@/core/services/useKeyMappings"
import { GenericPageProps } from "@/modules/types/types";
import { getAllPostTitles } from "../api/get-posts";
import BlogPost from "@/modules/components/Layout/containers/blog-post";
import CodeContainer from "@/modules/components/Layout/containers/code-container";
import CodeBlock from "@/modules/components/Layout/containers/code-block";
interface GrafanaModalProps extends GenericPageProps {
}

const GrafanaModalManager: React.FC<GrafanaModalProps> = ({ posts }) => {
    useKeyMappings();
    return (
        <BlogPost posts={posts}>
            <h1 className="text-4xl text-vim-purple font-extrabold">Navigating Open Source - Part 2</h1>
            <h2 className="blogHeader">Wading through the code</h2>
            <div className="w-full">
                In part 2 of “Navigating open source” we will cover the following points:
                <ul>
                    <li>Tips for navigating and understanding codebases</li>
                    <li>Recognizing common design patterns used in open-source projects</li>
                </ul>
            </div>
            <h2 className="blogHeader">Tips for navigating and understanding codebases</h2>
            <h3 className=" font-extrabold italic text-vim-orange">The tips provided here focus on using VSCode as the IDE, but most of them can be applied to other IDEs or text editors with similar features.</h3>
            <div>Once we have a starting point for our codebase, this is where the features of an IDE, specifically VSCode, come into play. Here are some tips and tricks related to VSCode (since it&apos;s available in the browser via GitHub, as demonstrated previously, and is, according to stack overflow, the most widely used text editor). However, this functionality exists in other IDEs and text editors as well:
                <ol className="pt-2">
                    <li> Go to Definition: By default in VSCode, F12 or Ctrl + Left-Click is set up to go to the definition of a function. Most of the time, this will take you to the exact location where the function, variable, class, etc., is declared. This is one of the most useful features when navigating a codebase, as it allows you to go to each function and see what it&#39;s doing.
                    </li>
                    <li> Find All References: The second most useful feature, in my opinion, when navigating a codebase is the &#39;Find All References&#39; feature. The default mapping for this feature is Shift + Alt + F12. This feature is particularly helpful when you need to find where a function is used. By doing so, it helps build context around a particular function, allowing you to get a bigger picture of where and when it&#39;s used. Using this shortcut opens a sidebar with a list of all the files that have used or called the function, class, or variable. You can then jump into that file and read through its use case to gain a deeper understanding. This leads to the next feature.
                        3.</li>
                    <li>Breadcrumbs: Breadcrumbs, found at the top of the file, show the current file&#39;s hierarchy and allow you to navigate between folders, files, and symbols. When you navigate to a new file, it&#39;s worthwhile to make a note of what directory you&#39;re in, as it may help you ground yourself in the repo. For example, are you in core/api/services/utils? This will help you understand the overall structure of the project.
                    </li>
                    <li>Peek Definition: Peek definition can be accessed with Alt + F12 or Option + F12. This allows you to view the definition of a function, class, or variable without leaving the file. This can be useful in cases where you think staying in the current file makes sense. However, personally, I feel that when I&#39;m initially navigating a repo, I like to follow the functions to their file and see what else is bundled in the file, as it can help you get a better feel for how the repo maintainers structure their code.</li>
                </ol>
                <p>Since my blog is based upon a vim emulator, here are the commands that I have set to map these commands in neovim. Make sure you have an LSP setup and you can add these to your init.lua:</p>

                <div className="p-4">
                    <CodeContainer>
                        <CodeBlock language="lua"
                            codeString={
                                `
-- Go To Definition
vim.api.nvim_set_keymap(
    'n', '<F12>',
    '<Cmd>lua vim.lsp.buf.definition()<CR>',
    {noremap = true, silent = true}
    )

-- Find All References
vim.api.nvim_set_keymap(
    'n', '<S-A-F12>', 
    '<Cmd>lua vim.lsp.buf.references()<CR>', 
    {noremap = true, silent = true}
    )

-- Peek Definition open in split
vim.api.nvim_set_keymap(
    'n', '<A-F12>',
    '<Cmd>split | lua vim.lsp.buf.definition()<CR>',
    {noremap = true, silent = true}
    )
`} />
                    </CodeContainer>
                </div>
            </div>
            <h2 className="blogHeader">Recognising Design Patterns in Open Source</h2>
            <p>Design patterns are an essential concept, especially when dealing with complex projects in object-oriented programming (OOP). They provide solutions to commonly occurring problems, making it easier to develop and maintain software. Although modern programming languages often adopt a hybrid approach to OOP, design patterns still emerge once a certain level of complexity is reached in a project. Being able to identify design patterns can help you better understand a codebase and navigate it using the aforementioned features.</p>
            <div className="w-full"><p>In later blog posts, we will explore more concrete examples of design patterns. For now, if you&apos;re not entirely familiar with them, I suggest learning about some of the most popular ones and seeking out relevant resources.</p>
                <ol>
                    <li className="pt-2">
                        Singleton Pattern:
                        <ul>
                            <li className="pt-2">
                                The Singleton pattern is a creational design pattern that ensures only one instance of a class is instantiated. It&apos;s often used in cases like managing database connections with libraries such as Mongoose, PostgreSQL, or DbContext. A Singleton pattern is typically employed when allowing concurrent access to a class could cause issues with atomicity, which is an essential concept in maintaining consistency in database transactions and concurrent programming. Here is an example:
                                <CodeContainer>
                                    <CodeBlock
                                        language="typescript"
                                        codeString={
                                            `
import { Pool, QueryResult } from "pg";

interface User {
    id: number;
    username: string;
    email: string;
}
                                            
class Database {
    private static instance: Database;
    private pool: Pool;
    private constructor() {
        this.pool = new Pool({
        // Your PostgreSQL connection configuration
        user: "your-user",
        host: "your-host",
        database: "your-database",
        password: "your-password",
        port: 5432,
        });
    }
                                            
    public static getInstance(): Database {
        if (!Database.instance) {
        Database.instance = new Database();
        }
        return Database.instance;
    }
                                            
    public async getUserById(id: number): Promise<User | null> {
        const result: QueryResult = await this.pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
        );
    
        return result.rows[0] || null;
    }
                                            
    public async createUser(username: string, email: string): Promise<User> {
        const result: QueryResult = await this.pool.query(
        "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
        [username, email]
        );
        
        return result.rows[0];
    }
                                            
    public async updateUser(
        id: number,
        username: string,
        email: string
    ): Promise<User> {
        const result: QueryResult = await this.pool.query(
        "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
        [username, email, id]
        );
        return result.rows[0];
    }
                                            
    public async deleteUser(id: number): Promise<void> {
        await this.pool.query("DELETE FROM users WHERE id = $1", [id]);
        }
    }
                                            
    // Usage
    (async () => {
        const db = Database.getInstance();
        
        // Create a new user
        const newUser = await db.createUser("JohnDoe", "john.doe@example.com");
        console.log("New user:", newUser);
        
        // Get user by ID
        const user = await db.getUserById(newUser.id);
        console.log("Fetched user:", user);
                                            
        // Update user
        const updatedUser = await db.updateUser(
            newUser.id,
            "JohnDoeUpdated",
            "john.doe.updated@example.com"
        );
        
        console.log("Updated user:", updatedUser);
                                            
        // Delete user
        await db.deleteUser(newUser.id);
        console.log("User deleted");
    })();
                                            
`}
                                    />
                                </CodeContainer>
                            </li>
                        </ul>
                    </li>
                    <li className="pt-2">
                        Factory Pattern:
                        <ul>
                            <li className="pt-2">
                                The factory pattern is another creational design pattern that provides an interface for creating objects in a super class. The benefit of using a factory means that each subclass can modify the functionality of the methods. This means that to extend the functionality of the app, you just need to create a new subclass that extends the superclass and modify its implementation as the codebase is not coupled directly with a single implementation, instead it’s based upon the superclass that can be easily extended. This pattern is used regularly in large codebases to improve flexibility and decoupling as the code that uses the factory does not need to know the specific type of class it is creating.</li>
                            <li>
                                An example use case might be allowing users to manage various database connections on a SAAS application. You may define a superclass that defines a database connection on the front end the user selects a database type and passes/selects some parameters. You then define subclasses that handle the connection based on each database&#39;s implementation.

                                <CodeContainer>
                                    <CodeBlock
                                        language="typescript"
                                        codeString={
                                            `
// Define a generic database connection interface
interface DatabaseConnection {
  //This would be more specific in a real world example
  config: object;
  connect(): void;
}

// Define specific classes for each supported database
class MongoDBConnection implements DatabaseConnection {
  config: object;

  constructor(config: object) {
    this.config = config;
  }

  connect() {
    // MongoDB-specific connection logic
  }

  // MongoDB-specific methods
}

class PostgreSQLConnection implements DatabaseConnection {
  config: object;

  constructor(config: object) {
    this.config = config;
  }

  connect() {
    // PostgreSQL-specific connection logic
  }

  // PostgreSQL-specific methods
}

class MySQLConnection implements DatabaseConnection {
  config: object;

  constructor(config: object) {
    this.config = config;
  }

  connect() {
    // MySQL-specific connection logic
  }

  // MySQL-specific methods
}

// Factory function to create the appropriate database connection object
function createDatabaseConnection(
  dbType: string,
  config: object
): DatabaseConnection {
  switch (dbType) {
    case "mongodb":
      return new MongoDBConnection(config);
    case "postgresql":
      return new PostgreSQLConnection(config);
    case "mysql":
      return new MySQLConnection(config);
    default:
      throw new Error('Unsupported database type:', + dbType);
  }
}

// Usage
const dbType = "mongodb"; // This could come from user input or configuration
const config = { }; // Database-specific configuration
const dbConnection = createDatabaseConnection(dbType, config);
dbConnection.connect();
`}
                                    />
                                </CodeContainer>
                            </li>
                        </ul>
                    </li>
                    <li className="pt-2">
                        Observer Pattern:
                        <ul>
                            <li className="pt-2">
                                The observer pattern is a behavioral design pattern that facilitates communication between a subject (or parent class) and its observers (or subclasses). This pattern is commonly used in event-driven systems or UI frameworks. In the observer pattern, the subject maintains a list of observers that are interested in its state changes or events. The observers can subscribe to the subject to receive updates or notifications whenever the subject&apos;s state changes or events occur.

                            </li>
                            <li>
                                One prevalent use case for the observer pattern is an event emitter class, which allows observers to subscribe to events. The event emitter class manages the distribution of events to the appropriate observers, ensuring that each observer receives the relevant notifications. This pattern promotes loose coupling between the subject and its observers, making it easier to maintain and extend the system.

                                <CodeContainer>
                                    <CodeBlock
                                        language="typescript"
                                        codeString={
                                            `
interface Listener {
    (data: any): void;
  }
  
  class EventEmitter {
    private listeners: { [eventName: string]: Listener[] };
  
    constructor() {
      this.listeners = {};
    }
  
    public subscribe(eventName: string, listener: Listener) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
    }
  
    public unsubscribe(eventName: string, listener: Listener) {
      if (!this.listeners[eventName]) {
        throw new Error("Event " + eventName "not found");
      }
      const index = this.listeners[eventName].indexOf(listener);
      if (index === -1) {
        throw new Error("Listener not found");
      }
      this.listeners[eventName].splice(index, 1);
    }
  
    public emitEvent(eventName: string, data: any) {
      if (!this.listeners[eventName]) {
        throw new Error("Event " + eventName "not found");
      }
      for (let listener of this.listeners[eventName]) {
        listener(data);
      }
    }
  }
  
  // Usage
  const financeBlogEvents = new EventEmitter();
  
  const emailHandler = (email: string) => {
    console.log("Email sent to: " + email);
  };
  
  financeBlogEvents.subscribe("Email Finance Subscribers", emailHandler);
  
  financeBlogEvents.emitEvent("Email Finance Subscribers", "email@example.com");
  financeBlogEvents.unsubscribe("Email Finance Subscribers", emailHandler);
  
`}
                                    />
                                </CodeContainer>
                            </li>
                        </ul>

                    </li>
                    <li className="pt-2">
                        Strategy Pattern:
                        <ul>
                            <li className="pt-2">
                                The Strategy pattern is a behavioral design pattern that enables an object to implement business logic in a generic manner while allowing the user to define the specific strategy to use. This pattern allows the class to exhibit different behaviors at runtime, with each strategy potentially implementing different algorithms or functionality. By decoupling the class from any specific logic, the Strategy pattern enables the program to work through the strategy class without being tightly bound to any particular implementation. The Strategy can be modified at runtime, providing flexibility and adaptability.

                            </li>
                            <li>
                                Examples of when the Strategy pattern might be implemented include: Authentication logic, where a user might be authenticated using OAuth, Local authentication, etc. The chosen authentication strategy can be passed to the system at runtime, allowing it to handle program flow based on the active strategy.
                            </li>
                            <li>
                                Another example is handling program logic based on end-user devices. In React, for instance, the Strategy pattern can be employed to manage rendering on different devices (web, mobile, various operating systems) by defining separate rendering strategies for each device type. By encapsulating these strategies within their own classes, you can easily switch between them at runtime, providing a flexible and modular approach to handling different situations or requirements.
                            </li>
                            <li>
                                Here is an example for our earlier use case regarding database connections for a SAAS application, although there won&apos;t be many use cases that require a user to switch database connections at runtime unless they wanted to switch database providers which would be very complex to handle elsewhere in the codebase, nevertheless I believe it serves as a valid demonstration of how the Strategy pattern may be implemented.

                                <CodeContainer>
                                    <CodeBlock
                                        language="typescript"
                                        codeString={
                                            `
  // DatabaseStrategy.ts
  interface DatabaseStrategy {
    connect(): void;
    disconnect(): void;
    // Add other methods related to database interactions as needed.
  }
  
  // MongodbStrategy.ts
  import mongoose from "mongoose";
  
  class MongodbStrategy implements DatabaseStrategy {
    async connect() {
      await mongoose.connect("mongodb://localhost:27017/myapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    }
  
    async disconnect() {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }
  
  // PostgresStrategy.ts
  import { Client } from "pg";
  
  class PostgresStrategy implements DatabaseStrategy {
    private client: Client;
  
    constructor() {
      this.client = new Client({
        connectionString: "postgresql://user:password@localhost:5432/mydb",
      });
    }
  
    async connect() {
      await this.client.connect();
      console.log("Connected to PostgreSQL");
    }
  
    async disconnect() {
      await this.client.end();
      console.log("Disconnected from PostgreSQL");
    }
  }
  
  // Usage example
  class DatabaseHandler {
    private strategy: DatabaseStrategy;
  
    constructor(strategy: DatabaseStrategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy: DatabaseStrategy) {
      this.strategy = strategy;
    }
  
    async connect() {
      await this.strategy.connect();
    }
  
    async disconnect() {
      await this.strategy.disconnect();
    }
  }
  
  const mongodbStrategy = new MongodbStrategy();
  const postgresStrategy = new PostgresStrategy();
  
  const databaseHandler = new DatabaseHandler(mongodbStrategy);
  databaseHandler.connect(); // Connects to MongoDB
  databaseHandler.disconnect(); //Disconnects
  
  databaseHandler.setStrategy(postgresStrategy);
  databaseHandler.connect(); // Connects to PostgreSQL
  databaseHandler.disconnect();  
`}
                                    />
                                </CodeContainer>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <p className="w-full">
                And that&apos;s it for this blog post, hopefully you&apos;ve gained some valuable information. In the upcoming posts we will be breaking down some interesting design patterns in real open source repositories.
            </p>
        </BlogPost >
    )
}

export default GrafanaModalManager

export function getServerSideProps() {
    return {
        props: {
            posts: getAllPostTitles(),
        },
    };
}