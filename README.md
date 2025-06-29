# CoinChange Service - Frontend

This is the frontend web application for the Coin Change project, built using **React.js** and **Vite**. It provides a user-friendly interface to input a target amount and denominations, and displays the calculated coin breakdown using the backend REST API.

---

## Tech Stack

- React.js  
- Vite  
- JavaScript (ES6+)  
- Bootstrap 

---

## Project Setup (Local Development)

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the development server

```bash
npm run dev
```

This will start the app at `http://localhost:5173` (or another available port).

---

## Building for Production

To generate the optimized production build:

```bash
npm run build
```

This will generate the `dist/` folder.

---

## Serving the Production Build

Install the `serve` package globally (use `sudo` if needed):

```bash
npm install -g serve
```

Then serve the build on a specified port:

```bash
serve -s dist -l 5173
```

---

## Public IP for Testing Frontend

Example (replace with your actual IP):

```
http:/54.169.133.117:5173/
```

---

## Backend Endpoint Configuration

Make sure your frontend fetches data from the correct backend API endpoint. For example:

```javascript
fetch("http://<BACKEND_PUBLIC_IP>:8080/api/v1/coin-change", { ... })
```


```env
VITE_API_URL=http://<BACKEND_PUBLIC_IP>:8080/api/v1
```


```js
const BASE_URL = import.meta.env.VITE_API_URL;
```

---

