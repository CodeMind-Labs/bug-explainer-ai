# 🚀 Deployment Guide

## Frontend (GitHub Pages) ✅

The frontend is now configured to deploy automatically to GitHub Pages on every push to `main`.

### To fix the deployment:

1. **Deploy your FastAPI backend** (see options below)
2. **Add API URL to GitHub Secrets:**
   - Go to: `https://github.com/CodeMind-Labs/bug-explainer-ai/settings/secrets/actions`
   - Click "New repository secret"
   - Name: `REACT_APP_API_BASE_URL`
   - Value: `https://your-deployed-backend-url.com`

3. **Push changes to trigger deployment:**
   ```bash
   git add .github/workflows/deploy.yml frontend/.env.example
   git commit -m "Add GitHub Pages deployment workflow"
   git push origin main
   ```

---

## Backend Deployment Options 🎯

Your FastAPI backend needs to be deployed. Here are recommended options:

### Option 1: **Railway** (Recommended for Python) 🚂
- Easy Flask/FastAPI deployment
- Free tier available
- [Deploy to Railway](https://railway.app/)

### Option 2: **Render** 
- Free tier with auto-deploy from GitHub
- [Deploy to Render](https://render.com/)

### Option 3: **Heroku** (requires credit card)
- Classic option for Python apps
- [Deploy to Heroku](https://www.heroku.com/)

### Option 4: **Vercel** (advanced)
- Can run Python serverless functions
- [Vercel Python Support](https://vercel.com/docs/concepts/functions/serverless-functions/python)

---

## Backend Deployment Steps

### For Railway/Render:

1. Create account and connect GitHub repository
2. Set environment variables if needed
3. Deploy button automatically detects `requirements.txt` in `backend/` folder
4. Get the deployed URL (e.g., `https://bug-explainer-api.railway.app`)
5. Add this URL to GitHub Secrets as `REACT_APP_API_BASE_URL`

### Important: CORS Configuration

Your current backend has:
```python
allow_origins=["*"]
```

For production, update [backend/main.py](../backend/main.py) to:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://codemind-labs.github.io",
        "https://codemind-labs.github.io/bug-explainer-ai"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Testing Locally

Before deploying, test both frontend and backend together:

```bash
# Terminal 1: Start Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Terminal 2: Start Frontend
cd frontend
REACT_APP_API_BASE_URL=http://localhost:8000 npm start
```

---

## Deployment Checklist

- [ ] Deploy FastAPI backend to Railway/Render/Heroku
- [ ] Get backend URL
- [ ] Add `REACT_APP_API_BASE_URL` secret to GitHub
- [ ] Update CORS origins in `backend/main.py`
- [ ] Push changes to main branch
- [ ] Verify GitHub Actions workflow runs successfully
- [ ] Check [Deployments](https://github.com/CodeMind-Labs/bug-explainer-ai/deployments) page
- [ ] Visit `https://codemind-labs.github.io/bug-explainer-ai` to test

---

## Troubleshooting

**❌ "Failed to fetch at frontend"**
- Backend URL is wrong or not deployed
- Backend is down
- CORS is not configured properly

**❌ "GitHub Actions workflow failed"**
- Check workflow logs: Settings → Actions → Workflows
- Ensure `REACT_APP_API_BASE_URL` secret is set correctly

**❌ "API returns 404 errors"**
- Your `/explain` endpoint might not match
- Backend needs to be running on the deployed URL
