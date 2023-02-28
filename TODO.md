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

### Functionality

- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [ ] Sync files without user reload
- [x] Add attachment download toggle, ?attachment query

## Server:

- [ ] Wrap every function in try catch and report as internal server error
- [ ] Error logging, install proper error logger for production, check if app auto restarts on crash
- [ ] Most used filetypes, average size analytics
- [ ] Show used space, total uploaded, etc
