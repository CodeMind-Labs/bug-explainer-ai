# 🐞 Bug Explainer AI

Bug Explainer AI is an open-source web application that helps developers understand programming errors in a simple and beginner-friendly way.

Paste any error message and get:

* ✅ Clear explanation
* 🛠️ Suggested fix
* 📘 Learning insight

---

## 🚀 Features

* 🧠 Beginner-friendly explanations
* ⚡ Fast and simple interface
* 🔍 Rule-based error detection (expandable)
* 🌱 Open for contributions

---

## 🏗️ Tech Stack

* Frontend: React
* Backend: FastAPI (Python)
* API: REST

---

## 📂 Project Structure

```
bug-explainer-ai/
│
├── frontend/     # React application
├── backend/      # FastAPI backend
├── README.md
├── CONTRIBUTING.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/CodeMind-Labs/bug-explainer-ai.git
cd bug-explainer-ai
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Example

**Input:**

```
IndexError: list index out of range
```

**Output:**

* Explanation: You are trying to access an index that does not exist
* Fix: Check list length before accessing

---

## 🤝 Contributing

We welcome contributions from everyone!

* Fork the repository
* Create a new branch
* Submit a pull request

👉 See `CONTRIBUTING.md` for detailed steps.

---

## 🌟 Future Improvements

* AI-powered explanations (LLMs)
* Support for more programming languages
* UI/UX enhancements
* Save history feature

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Maintained by

**CodeMind Labs 🚀**
Building simple, open-source developer tools powered by AI.
