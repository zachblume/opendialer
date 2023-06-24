# Opendialer

An open-source phone banking tool for political campaigns.

### Running for local development:

- Open a terminal and run:
  - `make`
- Navigate to http://localhost:3000

### Directory structure:

```
app/ - Frontend
db/ - Prisma migrations for Postgres
docs/ - Documentation
tests/ - Unit and integration tests
/Makefile - Local development commands
/docker-compose.yml - Don't run directly, use Makefile.
/README.md - Read before docs/
```

### Deployment

Instructions for Heroku, Render, Railway, etc.

### MVP features

Public

- [ ] Open dialer page for a campaign
- [ ] Enter your name and phone number
- [ ] Call into the dialer
- [ ] See a script while dialer begins
- [ ] Controls for hang up, and disposition

Admin

- [ ] Onboarding flow: Sign up
- [ ] Onboarding flow: Twilio API credentials
- [ ] Create a campaign
- [ ] Upload .csv of phone numbers
- [ ] Create basic script
- [ ] Publish to a unique URL
- [ ] Unauthenticated agents can visit the URL and start making calls
