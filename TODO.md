## Functionality:

- Single file upload ✅
- Multi file upload loop ✅
- Upload progress ✅
- Used space indicator ✅
- Image thumbnails ✅
- Delete after time, cronjob docker
- Delete stray files cron
- Open/Download ✅
- Paste text auto upload ✅
- Text field creation ✅
- Peek text ✅

## Client:

### Bugs:

- [ ] Fix mobile click selecting blue
- [ ] Fix overscroll on iPad

### Features:

- [ ] Hover styling
- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [ ] Show stack trace in toast

## Server:

### Bugs:
- [ ] Note deleteAfter is being set to 3 instead of 7 days 🤔

### Features:

## Production

- [ ] Share build between docker files
- [ ] Move server port from constants to .env
- [ ] Trpc show stack trace in prod
