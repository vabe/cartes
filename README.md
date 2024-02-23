# Cartes

An online planning poker application to help agile teams, built in NextJS 12.

## ⚙️ Getting started

The project requires that you have [Node](https://nodejs.org/en) running on your machine. It has been tested using `v20.9.0`.

### ⏳ Installation

First, install the dependencies:

```bash
npm i
# or
yarn
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## 🏗️ Structure

The overall structure can be seen in the tree representation below, and can be broken down into the following sections.

```
.
└── cartes/
    ├── src/
    │   ├── components/       # reusable components
    │   │   ├── button
    │   │   ├── card
    │   │   └── model
    │   ├── hooks             # custom behaviour hooks
    │   │   ├── use-modal.js
    │   │   └── use-room.js
    │   ├── pages/            # file system-based routing
    │   │   ├── room/
    │   │   │   └── [id].js
    │   │   ├── _app.js
    │   │   └── index.js
    │   └── utils/
    │       ├── constants.js
    │       └── ...
    ├── ...
    └── server.js             # SocketIO server implementation
```

## 📚 Learn more

**Planning poker** is an agile estimation technique used by teams to estimate the effort required for each user story or task in a sprint. Each team member independently assigns a relative size or effort to the item being estimated using a set of predetermined values, such as Fibonacci numbers. After everyone has made their estimation, team members discuss their estimates and reasoning, aiming to reach a consensus on the effort required before moving forward with the task. This collaborative approach helps teams align on expectations, improve accuracy in estimation, and foster better communication and understanding among team members.

[Socket.IO](https://socket.io/) is a JavaScript library that enables real-time, bidirectional communication between web clients and servers. It builds upon the WebSocket protocol, which provides a persistent connection between the client and server, allowing for efficient, low-latency data exchange. Socket.IO abstracts away the complexities of working directly with WebSockets by providing a simple yet powerful API that developers can use to implement real-time features in their web applications.

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that provides a comprehensive set of pre-designed utility classes to streamline the process of building modern and responsive web interfaces. Unlike traditional CSS frameworks that come with predefined components and styles, Tailwind CSS focuses on providing utility classes that represent specific CSS properties and values. These utility classes can be directly applied to HTML elements to style them without writing custom CSS.
