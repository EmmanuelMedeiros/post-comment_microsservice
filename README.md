# 🧩 Microservices Architecture - Post & Comment System

## 📄 Description

This project demonstrates a **microservices architecture** built with Node.js using two independently running services: a **Post Microservice** and a **Comment Microservice**. Both services communicate asynchronously through **RabbitMQ**, allowing scalable and decoupled interactions.

### 📝 Post Microservice

The Post Microservice is responsible for handling post-related operations and includes the following features:

- Built with **Express.js** and **GraphQL**
- Connected to a **PostgreSQL** database
- Uses **RabbitMQ** as a message broker
- Supports full **CRUD** operations for posts, including:
  - `uuid`: Unique identifier
  - `author`: Author of the post
  - `title`: Title of the post
  - `likes`: Number of likes

#### 🔁 Event-Based Communication

- On **post creation** or **deletion**, this service **publishes a message** to RabbitMQ.
- These messages are consumed by the Comment Microservice to keep its data in sync.

---

### 💬 Comment Microservice

The Comment Microservice is responsible for managing comments and ensures they are always associated with valid posts. It includes:

- Full **CRUD** operations for comments, including:
  - `content`: Text of the comment
  - `author`: Author of the comment
  - `post`: Associated post ID

#### 🔄 Data Synchronization

- Maintains its own **posts database**, which is **not directly connected** to the Post Microservice.
- This posts database is **updated via messages** received from RabbitMQ.
- When a user tries to insert a comment, the microservice checks if the referenced post exists in its local cache—populated and updated via RabbitMQ events.

---

## 🚀 Technologies

### Common Stack
- [Node.js](https://nodejs.org/)
- [RabbitMQ](https://www.rabbitmq.com/) (asynchronous messaging)

### Post Microservice
- [Express.js](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [amqplib](https://www.npmjs.com/package/amqplib) (RabbitMQ client)

### Comment Microservice
- [Express.js](https://expressjs.com/) *(optional or assumed if not mentioned)*
- [PostgreSQL](https://www.postgresql.org/)
- [amqplib](https://www.npmjs.com/package/amqplib)

---

Feel free to extend this README with sections like **Setup**, **Running Locally**, **Architecture Diagram**, or **License** if needed!
# 🧩 Microservices Architecture - Post & Comment System

## 📄 Description

This project demonstrates a **microservices architecture** built with Node.js using two independently running services: a **Post Microservice** and a **Comment Microservice**. Both services communicate asynchronously through **RabbitMQ**, allowing scalable and decoupled interactions.

### 📝 Post Microservice

The Post Microservice is responsible for handling post-related operations and includes the following features:

- Built with **Express.js** and **GraphQL**
- Connected to a **PostgreSQL** database
- Uses **RabbitMQ** as a message broker
- Supports full **CRUD** operations for posts, including:
  - `uuid`: Unique identifier
  - `author`: Author of the post
  - `title`: Title of the post
  - `likes`: Number of likes

#### 🔁 Event-Based Communication

- On **post creation** or **deletion**, this service **publishes a message** to RabbitMQ.
- These messages are consumed by the Comment Microservice to keep its data in sync.

---

### 💬 Comment Microservice

The Comment Microservice is responsible for managing comments and ensures they are always associated with valid posts. It includes:

- Full **CRUD** operations for comments, including:
  - `content`: Text of the comment
  - `author`: Author of the comment
  - `post`: Associated post ID

#### 🔄 Data Synchronization

- Maintains its own **posts database**, which is **not directly connected** to the Post Microservice.
- This posts database is **updated via messages** received from RabbitMQ.
- When a user tries to insert a comment, the microservice checks if the referenced post exists in its local cache—populated and updated via RabbitMQ events.

---

## 🚀 Technologies

### Common Stack
- [Node.js](https://nodejs.org/)
- [RabbitMQ](https://www.rabbitmq.com/) (asynchronous messaging)

### Post Microservice
- [Express.js](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [amqplib](https://www.npmjs.com/package/amqplib) (RabbitMQ client)

### Comment Microservice
- [Express.js](https://expressjs.com/) *(optional or assumed if not mentioned)*
- [PostgreSQL](https://www.postgresql.org/)
- [amqplib](https://www.npmjs.com/package/amqplib)

---
