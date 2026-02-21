# Low-Level Design (LLD) & System Design in Node.js

A collection of mini-projects built from scratch to master Low-Level Design (LLD), Object-Oriented Programming (OOP), SOLID principles, and Data Structures & Algorithms (DSA). All projects are written in strictly-typed TypeScript and executed in a Node.js environment.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Execution:** `tsx` (for seamless TypeScript execution without build steps)

## How to Run
To run any of the individual project files, use the `tsx` command followed by the filename. For example:
`npx tsx src/01-singleton-lru-cache.ts`

---

## Projects

### 1. Global In-Memory LRU Cache

- **Filename:** `01-singleton-cache.ts`
- **Concepts:** Singleton Pattern
- **Description:** An in-memory cache system that guarantees a single global instance using the Singleton pattern.
### 2. Notification System

- **Filename:** `02-factory-notification.ts`
- **Concepts:** Factory Pattern (Creational), SOLID Principles (SRP, OCP, DIP).
- **Description:** A dynamic notification service (Email, SMS, Push) built to strictly adhere to SOLID principles. By using the Factory pattern and interfaces, the system avoids fragile `if/else` blocks and remains fully open for extension but closed for modification.

### 3. Payment Gateway Interface

- **Filename:** `03-strategy-payment-gateway.ts`
- **Concepts:** Strategy Pattern (Behavioral), Encapsulation.
- **Description:** A modular checkout processor that delegates payment execution to interchangeable strategy classes (Credit Card, PayPal, Crypto). This allows the application to swap complex payment and verification algorithms dynamically at runtime without altering the core checkout logic.

### 4. LRU (Least Recently Used) Cache

- **Filename:** `04-lru-cache.ts`
- **Concepts:** Hash Maps, Doubly Linked Lists, $O(1)$ Time Complexity.
- **Description:** A highly performant cache eviction algorithm. It combines a Hash Map for instant data lookups with a Doubly Linked List to track the chronological order of usage, ensuring both read and write operations execute in constant $O(1)$ time.

### 5. Pub/Sub Event System
* **Filename:** `05-observer-pub-sub.ts`
* **Concepts:** Observer Pattern (Behavioral), Event-Driven Architecture, Node.js Event Emitters.
* **Description:** Implements a Publish/Subscribe architecture from scratch. It demonstrates how to decouple application components so that a central "Publisher" can notify multiple "Subscribers" of state changes asynchronously, strictly adhering to the Open/Closed Principle.

### 6. API Rate Limiter
* **Filename:** `06-queue-rate-limiter.ts`
* **Concepts:** Queue Data Structure, Sliding Window Algorithm, System Protection.
* **Description:** A security mechanism to protect APIs from DDoS attacks and spam. It uses a Sliding Window Log algorithm, combining a Hash Map with internal Queues to track user request timestamps and strictly limit the number of operations a single user can perform within a specific timeframe.

### 7. Background Jobs (Producer-Consumer Pattern)
* **Filename:** `07-producer-consumer-queue.ts`
* **Concepts:** Producer-Consumer Pattern (Concurrency), Message Queues, Asynchronous Processing, Node.js Event Loop.
* **Description:** Demonstrates how to handle heavy computational tasks without blocking the Node.js main thread. Implements an in-memory message queue where "Producers" push background jobs and asynchronous "Consumers" (Workers) process them concurrently at their own pace. 

### 8. API Gateway (Facade Pattern)
* **Filename:** `08-facade-api-gateway.ts`
* **Concepts:** Facade Pattern (Structural), Microservices Orchestration, Principle of Least Knowledge.
* **Description:** Demonstrates how to hide a complex system of microservices (Auth, Inventory, Payment, Shipping) behind a single, unified interface. This prevents the frontend client from having to manage multiple network requests and handles complex orchestration on the backend.

### 9. Third-Party API Adapter
* **Filename:** `09-adapter-pattern.ts`
* **Concepts:** Adapter Pattern (Structural), Interface Integration, Legacy Migration.
* **Description:** Demonstrates how to make two incompatible interfaces work together. By using a wrapper class, it translates the requests from your core application into a format that a legacy system or new third-party library can understand, without modifying either's source code.

### 10. Order Lifecycle (State Pattern)
* **Filename:** `10-state-pattern.ts`
* **Concepts:** State Pattern (Behavioral), Finite State Machines, Open/Closed Principle.
* **Description:** Eliminates massive `switch` statements when managing an object's lifecycle (like an Order). Each state (Pending, Paid, Shipped) is extracted into its own distinct class. The main Order object simply delegates behavior to its current state class, allowing it to transition seamlessly without bloated conditional logic.


### 11. SQL Query Builder (Builder Pattern)
* **Filename:** `11-builder-pattern.ts`
* **Concepts:** Builder Pattern (Creational), Method Chaining, Fluent Interfaces.
* **Description:** Demonstrates how to construct a complex object step-by-step. By returning the current instance (`this`) from each method, it creates a "fluent interface" that allows developers to chain methods together cleanly, completely avoiding massive and confusing constructor functions.

--

## Algorithms 

### 12. Sliding Window Pattern
* **Filename:** `12-sliding-window.ts`
* **Concepts:** Sliding Window, Dynamic Window Sizing, $O(N)$ Time Optimization, Hash Sets.
* **Description:** Transforms $O(N^2)$ nested loops into highly efficient $O(N)$ linear passes. Demonstrates how to maintain a dynamic "window" of elements to solve continuous subarray or substring problems, specifically finding the longest substring without repeating characters.

### 13. Two Pointers Pattern
* **Filename:** `13-two-pointers.ts`
* **Concepts:** Two Pointers, Time Complexity Optimization $O(N)$, Space Complexity $O(1)$.
* **Description:** Eliminates nested loops when searching for pairs in a collection. By placing one pointer at the beginning and one at the end of a sorted array, we can systematically narrow down our search window to find a target sum or validate palindromes in a single linear pass without using extra memory. 


### 14. Prefix Sum Pattern
* **Filename:** `14-prefix-sum.ts`
* **Concepts:** Precomputation, $O(1)$ Range Queries, Array Caching.
* **Description:** Demonstrates how to instantly calculate the sum of elements within a specific range of an array. By preprocessing the array into a "running total" map, we eliminate the need for repetitive $O(N)$ loops, allowing massive amounts of queries to be answered in constant time.

### 15. Modified Binary Search
* **Filename:** `15-binary-search.ts`
* **Concepts:** Binary Search, Boundary Finding, $O(\log N)$ Time Complexity.
* **Description:** Demonstrates how to adapt standard binary search to find the exact boundaries (first and last occurrence) of a target in a sorted array containing duplicates. This drops the search time from a linear $O(N)$ scan to a logarithmic $O(\log N)$ search.

### 16. SOLID Sorting Algorithms (Strategy Pattern)
* **Filename:** `16-sorting-strategies.ts`
* **Concepts:** Strategy Pattern, Divide and Conquer, Time Complexity ($O(N^2)$ vs $O(N \log N)$).
* **Description:** Implements the three most important interview sorting algorithms (Bubble, Merge, and Quick Sort) using the Strategy Pattern. Demonstrates how to write decoupled, extensible algorithmic logic while contrasting slow nested loops with high-performance recursive sorting.