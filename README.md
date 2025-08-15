# My Portfolio  
🚀 **From Resume to Stunning Portfolio — in Seconds**  

**Live Demo:** [my-portfolio-one-sand-30.vercel.app](https://my-portfolio-one-sand-30.vercel.app)  
**GitHub:** [github.com/Jaya-Rohith-Vemula/my-portfolio](https://github.com/Jaya-Rohith-Vemula/my-portfolio)  

---

## ✨ Features  

- **Drop your PDF → Get a Portfolio**  
  Upload your resume and we instantly generate a beautiful, shareable portfolio.  

- **No code? No problem.**  
  Just upload or fill out a simple form — we’ll take care of the rest.  

- **Dev-friendly.**  
  Edit portfolio source code directly in the browser with live preview and real-time updates.  

- **Unique shareable links.**  
  Each portfolio has its own URL. Share on LinkedIn, job applications, or anywhere else.  

- **Form-based creation.**  
  No resume? Fill out a quick form and we’ll build your portfolio from scratch.  

- **Security-focused.**  
  Passwords are hashed — no plaintext storage. Your data stays in your control.  

---

## 🛠 Stack  

**Frontend:**  
- React + TypeScript  
- TailwindCSS (Gray-themed UI)  
- Vite  

**Backend:**  
- Hono (Cloudflare Workers)  
- Prisma ORM  

**Database:**  
- PostgreSQL on Neon  

**Hosting:**  
- Frontend → Vercel  
- Backend → Cloudflare Workers  

---

## 📂 Project Structure  

### **Frontend** (`/frontend`)
```
src/
  components/       # Reusable UI components
  layout/           # App shell & routing
  pages/            # Feature pages (Create, ViewPortfolio, etc.)
  services/         # API service calls
  types/            # TypeScript types
  utils/            # Helper utilities
```

### **Backend** (`/backend`)
```
prisma/             # Database schema & migrations
src/
  routes/           # API routes (portfolio, quote, user)
  utils/            # Utility functions (Groq AI, validations, etc.)
```

---

## 🚀 Getting Started  

### Clone the repository
```bash
git clone https://github.com/Jaya-Rohith-Vemula/my-portfolio.git
cd my-portfolio
```

### Install dependencies  
**Frontend:**
```bash
cd frontend
npm install
```
**Backend:**
```bash
cd backend
npm install
```

### Set up environment variables  
Create a `.env` file in both `frontend` and `backend` folders. Add:
```
# Example for backend
DATABASE_URL=your_neon_postgres_url
JWT_SECRET=your_secret
```

### Run the app locally  
**Frontend:**
```bash
npm run dev
```
**Backend:**
```bash
npm run dev
```

---

## 🖼 How It Works  

1. **Upload Resume (PDF)**  
   → FE extracts data & sends it to BE.  
2. **AI Processing**  
   → Generates portfolio content.  
3. **Live Editing**  
   → Tweak your portfolio with instant preview.  
4. **Publish & Share**  
   → Get a unique URL to share anywhere.  

