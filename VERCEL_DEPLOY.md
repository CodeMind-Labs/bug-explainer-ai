# 🚀 Deploy to Vercel

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodeMind-Labs/bug-explainer-ai)

## Manual Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from project root
```bash
vercel
```

### 4. Answer deployment prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N`
- **Project name?** → `bug-explainer-ai` (or your choice)
- **In which directory is your code located?** → `./`

### 5. Configure Environment Variables (Optional)
If you want to override the default API endpoint:
```bash
vercel env add REACT_APP_API_BASE_URL
```
Value: Leave empty (uses `/api` by default)

---

## How It Works

### Frontend (React)
- Built using `npm run build`
- Served as static files
- Available at your Vercel domain

### Backend (Python Serverless)
- Converted from FastAPI to Vercel serverless function
- Available at `/api/explain`
- Uses Python 3.9 runtime

### File Structure for Vercel
```
bug-explainer-ai/
├── frontend/           # React app
├── backend/
│   ├── api/
│   │   └── index.py    # Vercel serverless function
│   ├── error_rules.py
│   ├── models.py
│   └── requirements.txt
├── vercel.json         # Vercel configuration
└── package.json        # Root package.json for Vercel
```

---

## Testing Locally

### Install Vercel CLI
```bash
npm install -g vercel
```

### Run locally
```bash
vercel dev
```

This will:
- Start the React dev server
- Run the Python serverless function locally
- Simulate the Vercel environment

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_BASE_URL` | `/api` | API endpoint for the backend |

---

## Troubleshooting

### ❌ "Module not found" errors
- Ensure all dependencies are in `backend/requirements.txt`
- Check that `backend/api/index.py` can import all modules

### ❌ "Function failed to execute" 
- Check Vercel function logs in the dashboard
- Ensure Python 3.9 compatibility
- Verify all imports work locally

### ❌ "CORS errors"
- CORS is handled in the serverless function
- Check the `Access-Control-Allow-Origin` header

### ❌ "API not found"
- Ensure `vercel.json` routes are correct
- Check that `/api/explain` endpoint exists

---

## Vercel Dashboard

After deployment:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Check **Functions** tab for backend logs
4. Check **Deployments** tab for build status

---

## Custom Domain (Optional)

To use a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

---

## Costs

- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for teams
- Serverless functions have generous free tiers

---

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Functions](https://vercel.com/docs/concepts/functions/serverless-functions/python)
- Check deployment logs in Vercel dashboard