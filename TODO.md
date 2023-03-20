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

### Style:

- [ ] Fix mobile click selecting blue
- [ ] Fix overscroll on iPad
- [ ] Toast for all errors
- [ ] Make .ico file for favicon
- [ ] Hover styling

### Functionality

- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [ ] Optimistic update, like in FileCard
- [ ] Show stack trace in toast

## Server:

- [ ] Wrap every function in try catch and report as internal server error
- [ ] Error logging, install proper error logger for production, check if app auto restarts on crash
- [ ] Delete after time docker cron/npm cron
- [ ] Refresh used space on mutation
- [ ] Sharp crashes when .ico is uploaded, check sharp compatible types
- [ ] Async error handling

## Production

- [ ] Share build between docker files
- [ ] Move server port from constants to .env
- [ ] Trpc show stack trace in prod
