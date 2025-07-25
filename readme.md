# Event Finder App

A modern mobile app built with **React Native (Expo)** and **NativeWind** for styling, backed by an **Express** server written in **TypeScript** connected to a **Neon Postgres** database. The app allows users to discover nearby and past events, post new events, and features seamless authentication powered by **Expo Clerk** supporting email/password, Google, and GitHub sign-ins.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Event Finder is a mobile-first app designed to help users find local events nearby, browse past events, and post their own events to share with the community. It leverages powerful, modern technologies to provide a smooth, fast, and secure user experience.

- **Seamless authentication** with Expo Clerk, supporting email/password as well as OAuth providers (Google, GitHub).
- **Location-based event discovery** showing nearby events.
- View and search past events.
- Users can **create and manage their own events**.
- Backend API built with Express and TypeScript, connected to Neon Postgres for scalable and reliable data storage.
- Responsive and modern UI styled with NativeWind.

---

## Technologies Used

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| Frontend       | React Native, Expo, NativeWind                    |
| Authentication | Expo Clerk (email/password, Google, GitHub OAuth) |
| Backend        | Node.js, Express, TypeScript                      |
| Database       | Neon Postgres (PostgreSQL on serverless cloud)    |
| ORM/Query Tool | (Optional: Prisma or TypeORM)                     |
| API            | RESTful API                                       |

---

## Features

- User registration and login with email/password, Google, and GitHub.
- View list of **nearby events** based on user's location.
- Browse **past events** history.
- Post new events with title, description, date, location, and images.
- Edit and delete posted events.
- Responsive UI with NativeWind utility-first styling.
- Real-time or near real-time updates (optional, can be added later).

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL database (Neon Postgres account & database ready)
- Expo Clerk account and API keys

---
