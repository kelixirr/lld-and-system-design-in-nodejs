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

- **Filename:** `01-singleton-lru-cache.ts`
- **Concepts:** Singleton Pattern (Creational), Hash Maps, Doubly Linked Lists.
- **Description:** An in-memory cache system that guarantees a single global instance using the Singleton pattern. It implements a Least Recently Used (LRU) eviction policy by combining a Hash Map for $O(1)$ lookups and a Doubly Linked List for $O(1)$ insertions and deletions.

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