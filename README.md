# 📦 Embedded Comments App

A lightweight and extensible app for embedding comments into web pages — ideal for blogs, articles, or any content site.

Originally created a while ago and recently updated (2025). The app is currently basic, but it provides a strong foundation with simple customization options that can be expanded on in the future.

---

## 📸 Screenshots / Images

**TODO:** I may add at some point but you can demo the application [here](https://comments-rho.vercel.app/) to see it in action without installation.

---

## 🛠️ Tech Stack

* **Next.js** (React framework)
* **React.js**
* **NextAuth.js** (for authentication)
* **Prisma** (ORM)
* **Tailwind CSS** (utility-first styling)

---

## 🎨 UI & Design Notes

Inspired by **Chakra UI**, but built from scratch due to performance issues experienced at the time with Chakra (specifically from Emotion and Framer Motion running too much client-side code on initial load).

Started by adapting components from **windmill-react-ui**, though the codebase has since diverged significantly and is now fully custom.

---

## 🚀 Getting Started

If you want to develop or run this app locally:

### 🔧 Installation

Using [Bun](https://bun.sh):

```bash
bun install
bun run dev
```

To build and run in production:

```bash
bun run build
bun run start
```

---

## 🧪 Environment Variables

Create a `.env` file with the following variables:

```env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
MONGO_DB=""
```

> **Note:**
>
> * You can leave Google and GitHub credentials empty if you don’t plan to use those login methods.
> * Prisma supports multiple databases; feel free to configure your own as long as it's compatible.
