# Opendialer

An open-source phone banking tool for political campaigns.

### Running for local development:

- Open a terminal and run:
  - `make`
- Navigate to http://localhost:3000

### Directory structure:

```
app/ - Frontend
supabase/ - DB runner and migrations
docs/ - Documentation
tests/ - Unit, integration, end-2-end tests
/Makefile - Local development commands
/README.md - Read first
/vercel.json - Vercel deployment config
```

### Deployment

Instructions for Vercel+Supabase, Heroku, Render, Railway, AWS, etc.

### MVP features

Public

- [x] Open dialer page for a campaign
- [x] Enter your name and phone number
- [ ] Call into the dialer
- [ ] See a script while dialer begins
- [ ] Controls for hang up, and disposition

Admin

- [ ] Quick deploy to Vercel/Supabase
- [ ] Vercel env variables:
  - [ ] Supabase API credentials
  - [ ] Twilio API credentials
  - [ ] Admin password
- [x] Create a campaign
- [x] Upload .csv of phone numbers
- [ ] Create basic script
- [ ] Publish to a unique URL
- [ ] Unauthenticated agents can visit the URL and start making calls
