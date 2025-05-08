# Crypto Tracker

A cryptocurrency tracking application that allows users to search, filter, and sort cryptocurrencies based on various parameters like market cap, price, and 24-hour percentage change. The app also supports marking cryptocurrencies as favorites.

---

## Features

- Search cryptocurrencies by name or symbol.
- Filter cryptocurrencies by top gainers, top losers, or favorites.
- Sort cryptocurrencies by market cap, price, 24-hour percentage change, or volume.
- Responsive design for mobile and desktop devices.

---

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling and responsive design.
- **Lucide Icons**: For modern and customizable icons.



---

## Architecture

The project follows a modular architecture with the following structure:

crypto-tracker/ ├── components/ # Reusable React components │ ├── ui/ # UI components (e.g., Button, Input, Tabs) │ └── crypto-filters/ # Crypto filter and sorting components ├── lib/ # Utility functions and Redux slices │ ├── features/ # Redux slices for state management │ └── types/ # TypeScript types and interfaces ├── pages/ # Next.js pages (if applicable) ├── public/ # Static assets (e.g., images, icons) ├── styles/ # Global styles (e.g., Tailwind CSS configuration) └── README.md # Project documentation

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn** (package manager)

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker

2. **Install Dependencies**
    ```bash
    npm install
# or
    yarn install

3. **Start the Development Server**
    ```bash
    npm run dev
# or
    yarn dev

-- 
# Future Enhancements
Integrate live cryptocurrency data using APIs like CoinGecko or CoinMarketCap.
Add user authentication for personalized features.
Implement advanced filtering and sorting options.
Add dark mode support.

---

### Instructions
1. Replace `your-username` with your GitHub username in the repository URL and contributors section.
2. Add any additional details specific to your project as needed.

Let me know if you need further customization!
