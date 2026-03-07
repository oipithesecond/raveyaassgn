# Rayeva AI Systems: Sustainable Commerce Modules

This repository contains the implementation of **Module 1 (AI Auto-Category & Tag Generator)** and **Module 2 (AI B2B Proposal Generator)**. The project focuses on building production-ready AI modules integrated with real business logic for sustainable commerce.

---

## Architecture Overview

The project follows a **Layered Architecture** to ensure a strict separation of AI logic and business logic

* **Controller Layer:** Manages HTTP requests, data validation using `Zod`, and database interactions.
* **Service Layer (AI Logic):** Handles specialized communication with **Arcee AI (via OpenRouter)**. This layer manages prompt construction and handles structured JSON outputs.
* **Models Layer:** Defines the schemas for persistent storage of categorized products and generated B2B proposals.
* **Configuration:** Environment-based API key management using `dotenv` to ensure security.

---

## AI Prompt Design

The following strategies were used to provide structured AI outputs. :

### **Module 1: Auto-Category & Tag Generator**
* **Objective**: Transform raw product text into structured e-commerce metadata.
* **Strategy**: "Constrained Classification." The system prompt explicitly defines the allowed Primary Categories and Sustainability Filters to ground the AI and prevent hallucinations.
* **Output**: Strictly enforced JSON containing categories, sub-categories, SEO tags, and eco-filters.

### **Module 2: AI B2B Proposal Generator**
* **Objective**: Generate a costed product mix and an impact-driven sales pitch.
* **Strategy**: "Contextual Selection." We pass real products from the database to the AI, forcing it to choose from actual inventory within a provided budget limit.
* **Business Grounding**: The AI calculates budget utilization and cost breakdowns while generating a professional sales pitch tailored to the client's brief.

---

## Implemented Modules

### **1. AI Auto-Category & Tag Generator (Module 1)**
* **Auto-assigns categories**: Automatically maps products to predefined primary categories.
* **SEO Optimization**: Generates 5-10 SEO-optimized tags for better visibility.
* **Sustainability Filtering**: Identifies plastic-free, compostable, vegan, and recycled attributes.

### **2. AI B2B Proposal Generator (Module 2)**
* **Sustainable Mix**: Suggests the best product combination for a client brief.
* **Budget Management**: Ensures the proposal stays within the user-defined budget limit.
* **Impact Positioning**: Provides a summary statement on the sustainability impact of the order.

---

## Setup & Installation

1.  **Clone the repository**: `git clone <repo-url>`
2.  **Install dependencies**: `npm install`
3.  **Configure environment**: Create a `.env` file with your `OPENROUTER_API_KEY` and `MONGODB_URI`.
4.  **Start the server**: `node src/server.js`
5.  **Test the API**: Use Postman or cURL to send POST requests to `/api/products` and `/api/proposals`.

---
