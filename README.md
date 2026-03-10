# NaijaFood (Local Dev)

This workspace contains a simple static front-end (`index.html`, `script.js`, `style.css`) and a minimal Node.js Express backend (`server.js`) that supports:

- User registration (`POST /api/register`)
- Login (`POST /api/login`) — returns a JWT
- Get current user (`GET /api/me`)
- Create order (`POST /api/orders`) — requires Authorization header
- List your orders (`GET /api/orders`)

Data is stored in simple JSON files under `data/` (`users.json`, `orders.json`) for demo purposes.

## Quick start

1. Install dependencies:

   npm install

2. Run the server:

   npm start

   The server will run at `http://localhost:3000` and also serves the static front-end so you can open `http://localhost:3000` in your browser.

3. Use the UI to Register / Login and place an order.

## Notes

- This is a demo backend without production-grade security. Keep `JWT_SECRET` set via environment variable for production.
- To reset data, delete or clear `data/users.json` and `data/orders.json`.

## API Examples (curl)

Register:

curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"name":"John", "email":"john@example.com", "password":"secret"}'

Login:

curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"john@example.com", "password":"secret"}'

Create Order (replace TOKEN):

curl -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d '{ "items": [{"id":1, "name":"Jollof", "price":3500, "quantity":1}], "subtotal":3500, "address":"Ikeja" }'
