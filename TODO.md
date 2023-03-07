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

- [ ] Dockerize for prod
- [ ] Serve frontend from nginx
- [ ] Serve backend through nginx reverse proxy
- [ ] Check best place for nginx config

## Client:

### Style:

- [ ] Fix mobile click selecting blue
- [ ] Fix overscroll on iPad
- [ ] Toast for all errors
- [ ] Progress bar still not on top when file load error

### Functionality

- [ ] Remove/rework upload during delete, test open file upload when modal auto closed

## Server:

- [ ] Wrap every function in try catch and report as internal server error
- [ ] Error logging, install proper error logger for production, check if app auto restarts on crash
- [ ] Delete after time docker cron/npm cron
