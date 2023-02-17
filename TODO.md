## Functionality:

- Single file upload ✅
- Multi file upload loop ✅
- Upload progress ✅
- Max size
- Used space indicator
- Used space check
- Image thumbnails
- Delete after time, cronjob docker
- Delete stray cron
- Open/Download ✅
- Folder upload, folder navigation 🤔
- Paste text auto upload
- Text field creation ✅
- Peek text
- Note upload size 🤔

## Client:

- [ ] Fix overscroll on iPad
- [ ] Fix grid space between row/cols
- [ ] Fix mobile click selecting blue
- [ ] Undo delete
- [ ] Remove/rework upload during delete, test open file upload when modal auto closed
- [x] Upload not working from other devices
- [ ] Add attachment download toggle, ?attachment query
- [ ] Move styling to tailwind brackets []
- [ ] Add error toasts
- [ ] Sync files without user reload

## Server:

- [ ] More dynamic error catching, without crashing the server
- [ ] Delete files on delete
- [ ] Merge files and notes for the client side
- [x] Server static folder wtih uploads
- [ ] Add images compressor for thumbnails(sharp)
