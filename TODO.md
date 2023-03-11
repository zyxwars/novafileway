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
- [ ] Progress bar still not on top when file load error
- [ ] Make error text into a component and stretch like loader and change color to white
- [ ] Scroll bar appears for a second after delete

### Functionality

- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [ ] Optimistic update, like in FileCard

## Server:

- [ ] Wrap every function in try catch and report as internal server error
- [ ] Error logging, install proper error logger for production, check if app auto restarts on crash
- [ ] Delete after time docker cron/npm cron
- [ ] Refresh used space on mutation
- [ ] Sharp crashes when .ico is uploaded

## Production

- [ ] Share build between docker files
- [ ] Move server port from constants to .env
