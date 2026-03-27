# Quickteller Business

A comprehensive business payment management platform for accepting and tracking payments across multiple channels — cards, transfers, USSD, QR codes, and more.

Built for the **Enyata Community x Interswitch Developer Community Buildathon**.

---

## Live URL

**https://demo.swiftagents.org/**

---

## Demo Credentials

| Field    | Value                    |
|----------|--------------------------|
| Email    | `demo@quickteller.com`   |
| Password | `demo1234`               |

---

## Features

- **Dashboard** — Overview of business KPIs, revenue charts, and recent transactions
- **Transactions** — Full transaction history with filtering, search, and export
- **Settlements** — Track and reconcile settlement payouts
- **Customers** — Manage and view customer profiles and activity
- **Checkout Demo** — Interactive payment checkout experience
- **POS Request** — Request a physical POS terminal for your business
- **Storefront** — E-commerce storefront solution for online sales
- **Pricing** — Transparent pricing breakdown for all payment channels
- **FAQs** — Frequently asked questions and support

---

## Tech Stack

| Layer          | Technology                  |
|----------------|-----------------------------|
| Frontend       | HTML5, CSS3, Vanilla JS     |
| Server         | Python 3.11 (HTTP server)   |
| Containerization | Docker                    |
| Fonts          | KumbhSans (custom)          |
| Deployment     | Port 8080                   |

---

## Getting Started

### Prerequisites

- Python 3.x **or** Docker

### Run Locally (Python)

```bash
python3 serve.py
```

The app will be available at `http://localhost:8080`.

### Run with Docker

```bash
docker build -t quickteller-business .
docker run -p 8080:8080 quickteller-business
```

---

## Project Structure

```
├── login.html              # Authentication page
├── dashboard.html          # Main dashboard
├── transactions.html       # Transaction history
├── settlements.html        # Settlement tracking
├── customers.html          # Customer management
├── checkout-demo.html      # Payment checkout demo
├── pos-request.html        # POS terminal request form
├── storefront-offering.html # Storefront features
├── pricing.html            # Pricing page
├── faqs.html               # FAQ page
├── index.html              # Landing page
├── serve.py                # Python SPA server
├── Dockerfile              # Container config
├── styles/                 # CSS stylesheets
├── js/                     # JavaScript modules
├── components/             # Component scripts
├── assets/                 # Images, icons, SVGs
└── fonts/                  # KumbhSans font files
```


## License

This project was built for the Enyata x Interswitch Buildathon 2026.
