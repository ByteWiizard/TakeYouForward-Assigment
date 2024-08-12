# TakeYouForward Assignment: Dynamic Banner Management

![Project Banner](https://via.placeholder.com/1000x300) <!-- Replace with an actual image if available -->

## Overview

This project is a dynamic banner management system built with a React frontend and an Express backend, powered by CockroachDB. The system allows users to create, update, and manage a promotional banner that includes a countdown timer displayed on a web page. The project also includes secure password management to protect sensitive actions like updating the banner.

### Features

- **Dynamic Banner**: Create and update a banner with a customizable description, timer, and link.
- **Countdown Timer**: Real-time countdown timer displayed on the banner.
- **Password Protection**: Secure banner management with password authentication.
- **Responsive Design**: Fully responsive frontend built with Tailwind CSS.
- **API Integration**: Backend APIs built with Express for managing banner details and user authentication.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: CockroachDB
- **Authentication**: bcrypt.js for password hashing
- **Deployment**: Vercel (Frontend and Backend)

> **Note**: The backend is hosted on Vercel's free tier, which may cause the first API call to take 2-3 minutes as the server wakes up from its idle state.

## Project Structure

