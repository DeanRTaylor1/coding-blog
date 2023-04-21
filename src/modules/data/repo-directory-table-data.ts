const repoDirectoryTableHeaders = ["Directory name", "Contents"];

const repoDirectoryTableData = [
  [
    "app/",
    "Usually contains the main application logic, components and modules. You may find the entry file, class or method in here.",
  ],
  [
    "src/",
    "The “source” directory, where most of the source code for the project is stored. It often contains subdirectories for specific components or modules.",
  ],
  [
    "lib/",
    "Short for “library” this directory contains shared code, utilities or external libraries that the project depends on.",
  ],
  [
    "core/",
    "This directory typically holds the core functionality of the application such as the central services or main engine that drives the software.",
  ],
  [
    "server/ or api/",
    "Contains server-side code, apis or server components for web applications or services. This is useful for seeing what kind of requests the application is expecting from external sources.",
  ],
  [
    "cli/",
    "Short for “command-line interface” this directory holds code related to any command-line tools and scripts.",
  ],
  [
    "bin/",
    "Short for “binary” this directory contains compiled binaries or executable scripts.",
  ],
  [
    "config/",
    "Contains configuration files or settings for the application, for example env configurations or feature flags.",
  ],
  [
    "public/",
    "Holds static assets, such as images, stylesheets, or JavaScript files, that are served directly by a web server.",
  ],
  [
    "assets/",
    "Similar to public, this directory contains media files, stylesheets, or other resources used by the application.",
  ],
  [
    "test/",
    "Contains test files, test utilities, and other testing-related code.",
  ],
  [
    "docs/",
    "Holds documentation files, such as Markdown files or generated API documentation.",
  ],
  [
    "vendor/",
    "Contains third-party libraries or dependencies, usually managed by a package manager.",
  ],
  [
    "utils/ or helpers/",
    "Contains utility functions, helper classes, or other shared code that doesn't fit into a specific module or component.",
  ],
  [
    "middleware/",
    "For web applications, this directory contains middleware components, such as authentication, logging, or caching.",
  ],
];

export { repoDirectoryTableHeaders, repoDirectoryTableData };
