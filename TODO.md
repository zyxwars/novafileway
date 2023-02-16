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
- Open/Download
- Folder upload, folder navigation 🤔
- Paste text auto upload
- Text field creation ✅
- Peek text

## Client:

- [ ] Fix overscroll on iPad
- [ ] Fix grid space between row/cols
- [ ] Open upload directly
- [ ] Fix mobile click selecting blue
- [x] Upload files to backend
- [ ] Make progress bar less hacky
- [ ] Revalidate on upload modal close/every file upload
- [ ] Style files
- [ ] Delete files
- [ ] Undo delete

## Server:

- [x] File gets uploaded half way on abort? > maybe use checksum
- [ ] More dynamic error catching, without crashing the server
- [ ] Delete files on delete
- [ ] Server static folder wtih uploads
