## Functionality:

- Single file upload ✅
- Multi file upload loop ✅
- Upload progress ✅
- Max size check if file system if full
  - Used space check
- Used space indicator ✅
- Image thumbnails ✅
- Delete after time, cronjob docker
- Delete stray files cron
- Open/Download ✅
- Folder upload, folder navigation 🤔
- Paste text auto upload ✅
- Text field creation ✅
- Peek text ✅
- Note upload size 🤔

## Client:

### Bugs:

- [ ] Fix mobile click selecting blue
- [ ] Fix overscroll on iPad

### Features:

- [ ] Hover styling
- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [ ] Show stack trace in toast
- [ ] Make anonymous function into normal functions

## Server:

### Bugs:

- [ ] Properly test upload, other devices, different file types

### Features:

- [ ] Async error handling
- [ ] Wrap every function in try catch and report as internal server error
- [ ] Error logging, install proper error logger for production
- [ ] DeleteAt after time docker cron/npm cron
- [ ] Refresh used space on mutation
- [ ] Show sha256 in details

## Production

- [ ] Share build between docker files
- [ ] Move server port from constants to .env
- [ ] Trpc show stack trace in prod
