# Purely Functional Webcrawler in TypeScript

This is a command-line Webcrawler application built in **TypeScript** (Node.js). It crawls web pages starting from a seed URL down to a defined depth, extracts outgoing hyperlinks, builds a tree representation of the pages, and writes the output as a Markdown file.

This project is built following strict **Functional Programming (FP)** guidelines and uses no external libraries for its core engine.

---

## 🛠️ Division of the Problem (Teilprobleme)

To manage complexity and maintain pure code, the problem was split into independent modules:

1. **Monadic Effect Isolation (`src/io.ts`) AI**:
   - In pure functional programming, functions must have no side-effects (e.g. no direct fetch or file writes).
   - We created a custom `IO<A>` monad that wraps lazy asynchronous operations. 
   - Side-effects are declared as values and chained using monadic operators (`map`, `flatMap`, `catchError`). They are only executed at the very end using `.unsafeRun()`.

2. **Pure Parsing & Resolving (`src/parser.ts`)**:
   - Extract raw `href` strings from HTML bodies using regular expressions (zero external parsing libraries).
   - Normalize and resolve relative paths against the current base URL using the native `URL` class.
   - Filter out non-HTTP/HTTPS protocols and strip hash fragments (`#`) to avoid crawling duplicates.


3. **Pure Recursion Engine (`src/crawler.ts`) AI**:
   - Crawl recursively to a defined depth.
   - Pass a `CrawlState` to all URLs, holds visited URLs and pages crawled counts. Passed down the recursive tree
   - Support depth limits, max pages limits, and handle page errors purely without throwing exceptions.

4. **Tree Formatting (`src/formatter.ts`)**:
   - A pure transformer that accepts the `CrawlNode` tree and formats it into a Markdown list tree.

5. **Main CLI & Execution (`src/main.ts`)**:
   - Parses arguments, configures the network fetching function with connection timeouts using `AbortController`, composes the monadic flow, and triggers the final `unsafeRun()`.

---

## 🎯 Functional Programming Concepts Demonstrated

- **Pure Functions**: Every business logic function in `parser.ts`, `crawler.ts`, and `formatter.ts` is pure. They do not read or write global variables, execute network calls, or mutate objects.
- **Immutability**: All data interfaces are defined with `readonly` properties and arrays are frozen (`Object.freeze`) to prevent mutation.
- **State-Passing Recursion**: Instead of using a global mutable `Set` to track visited pages, the recursive functions pass the updated `CrawlState` to subsequent crawls, ensuring purity and determinism.
- **Monadic Side-Effect Isolation**: The application builds a lazy `IO` pipeline. The CLI execution is the only place where the program runs.
- **Higher-Order Functions**: We map and filter arrays, compose function pipelines, and pass mock fetching operations as arguments.

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 20+)
- npm

### 1. Installation
Install local development dependencies (TypeScript and Node type definitions):
```bash
npm install
```

### 2. Run the Crawler
Execute the crawler against a website:
```bash
npm run start -- <url> [maxDepth] [maxPages] [timeoutMs] [outputFilePath]
```

**Example:**
To crawl `https://example.com` with a depth of 1, max 5 pages, 3000ms timeout, writing to `./crawl_report.md`:
```bash
npm run start -- https://example.com 1 5 3000 ./crawl_report.md
```

### 3. Run the Tests
Execute the unit tests using Node's native test runner (no third-party test libraries):
```bash
npm run test
```

---

## 🧪 Unit Tests Overview

To verify the pure core without making real network requests, we mock the HTTP request mechanism in our tests by passing a pure mock resolver mapping URLs to mock HTML responses.

- **Parser Tests (`tests/parser.test.ts`)**: Verifies raw URL regex extraction, absolute resolution, filtering of non-HTTP protocols, and fragment stripping.
- **Crawler Tests (`tests/crawler.test.ts`)**: Verifies depth-limited recursion, duplicate page prevention (detecting cycles), max page limits, and error handling.

---

## 🤖 AI Guidelines & Prompts Log

This project was built incrementally using Gemini 3.5 Flash through Google Antigravity. Below are the prompts and models used:

1. **Step 1: Planning and Architecture Design**
   - **Model**: Gemini 3.5 Flash
   - **Prompt**: *Read the raw GitLab README for LB3 Mini-Projekt to identify the requirements. Draft a structural division of the problem and write an implementation plan using TypeScript.*
   - **Outcome**: Created `implementation_plan.md` separating `io.ts`, `parser.ts`, `crawler.ts`, `formatter.ts`, and `main.ts`.

2. **Step 2: Core Coding**
   - **Model**: Gemini 3.5 Flash
   - **Prompt**: *Create package.json, tsconfig.json, parser.ts, io.ts, and crawler.ts according to the approved plan. Ensure typescript compiles without error.*
   - **Outcome**: Initialized configs and wrote core modules incorporating monadic `IO` and pure state-passing recursive traversal.

3. **Step 3: Output Formatting & CLI Runner**
   - **Model**: Gemini 3.5 Flash
   - **Prompt**: *Implement formatter.ts to generate a Markdown tree structure report, and main.ts to parse CLI arguments, set network request timeouts, and invoke unsafeRun.*
   - **Outcome**: Completed the CLI application and tree-formatting report generator.

4. **Step 4: Writing and Fixing Unit Tests**
   - **Model**: Gemini 3.5 Flash
   - **Prompt**: *Write unit tests for the parser and crawler using Node's native test runner. Fix test execution wildcards for Windows shells and correct assertions to match sequential state-passing crawl optimizations.*
   - **Outcome**: Tests successfully executed and passed all 9 test assertions.
