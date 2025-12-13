# Gamersology

The AI radar for every gamer. Track stats, improve mechanics, and find the best gear.

## Project Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start development server:**
   ```bash
   yarn dev
   ```

3. **Build for production:**
   ```bash
   yarn build
   ```

## Deployment Guide

### GitHub Configuration
To push this code to your repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/mohamedsaidyekhlef-png/gemersology.git
git push -u origin main
```

### Vercel Deployment
To deploy to production immediately:

```bash
npx vercel --prod
```

### Environment Variables
If you are using Supabase or other APIs, ensure you add the following Environment Variables in your Vercel Project Settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
