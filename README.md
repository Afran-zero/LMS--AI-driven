<h1 align="center">📚 Lernen — AI-Powered LMS Content Generator</h1>

<p align="center">
  <i>An intelligent platform that helps you generate educational content effortlessly from just a topic.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/Afran-zero/LMS--AI-driven?color=blue" />
  <img src="https://img.shields.io/github/license/Afran-zero/LMS--AI-driven" />
  <img src="https://img.shields.io/github/last-commit/Afran-zero/LMS--AI-driven" />
</p>

---

## 🚀 Overview

**Lernen** is an AI-driven Learning Management System (LMS) content generator that streamlines the process of creating learning materials. Just enter a topic, and Lernen will automatically generate:

- 📖 Chapter breakdowns  
- 📋 Course outlines  
- 🧠 Flashcards  
- ❓ Quizzes  
- 💬 Q&A pairs  

Perfect for educators, content creators, and e-learning platforms.

---

## ✨ Key Features

- ✅ **Topic-to-Course AI Generation** using Generative AI (Gemini)
- ✅ **Full-stack Web App** built with modern technologies
- ✅ **Interactive UI** using Radix UI & TailwindCSS
- ✅ **Authentication** via Clerk
- ✅ **Flashcard Flip Animation**
- ✅ **Quiz and Q&A Generator**
- ✅ **Progress UI, Toasts & Notifications**

---

## 🧠 Powered By

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React-based frontend framework |
| **Clerk** | User authentication |
| **Tailwind CSS v4** | Utility-first UI design |
| **Google Generative AI** | Content generation |
| **Drizzle ORM + Neon** | Scalable Postgres-based serverless DB |
| **Framer Motion** | Smooth UI animations |
| **Embla Carousel** | Sliding cards/flashcards |
| **Inngest** | Background jobs / serverless workflows |
| **Lucide Icons** | Clean UI icons |

---

## 🖼️ UI Preview

<!-- Replace with real image or GIF -->
<p align="center">
  <img src="https://github.com/Afran-zero/LMS--AI-driven/assets/demo-preview.gif" alt="Lernen preview" width="600"/>
</p>

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Afran-zero/LMS--AI-driven.git
cd LMS--AI-driven
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file and add the following:

```env
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
GOOGLE_API_KEY=your_gemini_api_key
DATABASE_URL=your_neon_postgres_url
```

### 4. Run the Dev Server

```bash
npm run dev
```

Now visit `http://localhost:3000` to explore Lernen!

---

## 📂 Project Structure

```
/app
  /(auth)
  /dashboard
  /components
  /lib
  /utils
  /api
.env.local
tailwind.config.js
next.config.js
```

---

## 🧩 Sample Use Case

1. User logs in with Clerk
2. Enters a topic: **"Introduction to Machine Learning"**
3. Lernen generates:

   * A full course outline  
   * Chapters with summaries  
   * Interactive flashcards  
   * Multiple-choice quizzes  
   * Q&A for understanding  

---

## 📌 Todo / Future Improvements

* [ ] Add PDF Export
* [ ] Enable Content Sharing
* [ ] Teacher & Admin Roles
* [ ] LMS Plugin Integration
* [ ] Bangla Content Support 🇧🇩

---

## 🙋‍♂️ Author

**Md Kaif Afran Khan**  
Undergrad CSE Student, North South University  
📫 [kaif.khan@northsouth.edu](mailto:kaif.khan@northsouth.edu)  
🌐 [GitHub](https://github.com/Afran-zero)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

> The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.  
>  
> Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
