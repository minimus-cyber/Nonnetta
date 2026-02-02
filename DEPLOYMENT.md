# 🚀 Deployment Guide for Nonnetta.eu

## Quick Start

This website is a static HTML/CSS/JS application that can be deployed to any static hosting service.

## GitHub Pages Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save changes

2. **Access the site**:
   - URL: `https://minimus-cyber.github.io/Nonnetta/`
   - Or custom domain: `nonnetta.eu` (configure DNS)

3. **Custom Domain Setup** (Optional):
   - Add `CNAME` file with domain name
   - Configure DNS records:
     ```
     CNAME: www.nonnetta.eu → minimus-cyber.github.io
     A: nonnetta.eu → 185.199.108.153
     A: nonnetta.eu → 185.199.109.153
     A: nonnetta.eu → 185.199.110.153
     A: nonnetta.eu → 185.199.111.153
     ```

## Alternative Hosting Options

### Netlify
1. Connect GitHub repository
2. Build command: (none)
3. Publish directory: `/`
4. Deploy!

### Vercel
1. Import GitHub repository
2. Framework: Other
3. Output directory: `./`
4. Deploy!

### Traditional Web Hosting
1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in root directory
3. Files needed:
   - `index.html`
   - `admin.html`
   - `privacy.html`
   - `accessibility.html`
   - `styles.css`
   - `app.js`
   - `admin.js`

## Post-Deployment Checklist

### Immediate Actions
- [ ] Test the site is accessible at your URL
- [ ] Verify all pages load correctly
- [ ] Test user registration and login
- [ ] Test admin panel access with default credentials
- [ ] **IMPORTANT**: Change admin credentials immediately!

### Admin Setup
1. Navigate to `/admin` or `/admin.html`
2. Login with:
   - Username: `fraverderosa`
   - Password: `Rosa@5791`
3. Immediately go to "Cambia Credenziali"
4. Update username and password
5. Logout and test new credentials

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

### Accessibility Testing
- [ ] Test keyboard navigation (Tab, Arrows, Space, Enter, ESC)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify high contrast is working
- [ ] Check cursor visibility
- [ ] Test zoom functionality (Ctrl/Cmd +/-)

### Functionality Testing
- [ ] Cookie consent banner appears
- [ ] Registration works
- [ ] Login works
- [ ] Activities can be selected and completed
- [ ] History displays correctly
- [ ] Print function works
- [ ] Download TXT works
- [ ] Admin panel functions correctly
- [ ] Privacy and Accessibility pages load

## Security Considerations

### Data Storage
- All data is stored **locally** in user's browser
- No server-side database
- No external API calls
- Users should be reminded to:
  - Download backups regularly
  - Not clear browser data if they want to keep history
  - Use modern browsers with localStorage support

### Admin Credentials
⚠️ **CRITICAL**: Default admin credentials are:
- Username: `fraverderosa`
- Password: `Rosa@5791`

**These MUST be changed immediately after deployment!**

The credentials are stored hashed (SHA-256) but the defaults are visible in source code per requirements.

### HTTPS
- Always use HTTPS for deployment
- GitHub Pages provides free SSL
- Most hosting providers offer free SSL/TLS certificates

## Maintenance

### Regular Tasks
- Monitor for browser compatibility issues
- Test accessibility features quarterly
- Review and update privacy policy as needed
- Check for any security advisories

### User Support
If users report issues:
1. Verify they're using a modern browser
2. Check if localStorage is enabled
3. Suggest clearing cache if needed (warn about data loss)
4. Verify JavaScript is enabled

## Legal Compliance

### GDPR Requirements
- ✅ Cookie consent implemented
- ✅ Privacy policy available
- ✅ User data rights documented
- ✅ Local storage only (no external data transfer)

### Italian Law (Legge Stanca)
- ✅ Accessibility statement published
- ✅ WCAG 2.1 AA compliance
- ✅ Contact information provided

### Maintenance Schedule
- Review privacy policy: Annually
- Test accessibility: Quarterly
- Update contact info: As needed
- Security review: Bi-annually

## Backup Strategy

Since data is stored locally:
1. **Users**: Download TXT backups regularly
2. **Admins**: No server backup needed (stateless)
3. **Code**: GitHub repository is the source of truth

## Troubleshooting

### Users Can't Login
- Check browser localStorage is enabled
- Try incognito/private mode
- Clear browser cache (data will be lost)

### Admin Can't Login
- Verify correct credentials
- Check browser console for errors
- localStorage key: `adminCredentials`

### Activities Not Saving
- Verify localStorage is enabled
- Check available storage space
- Try different browser

### Print Not Working
- Use browser's native print (Ctrl/Cmd + P)
- Check print preview
- Verify CSS print styles are loading

## Performance

### Optimization
- No external dependencies = Fast load time
- All resources are local
- No API calls = No latency
- Minimal CSS/JS = Quick rendering

### Browser Requirements
- Modern browser (2020+)
- JavaScript enabled
- localStorage enabled
- Minimum 1MB localStorage space

## Contact & Support

For technical issues:
- GitHub Issues: [Repository Link]

For accessibility concerns:
- Email: accessibilita@nonnetta.eu

For privacy questions:
- Email: privacy@nonnetta.eu

---

**Last Updated**: February 2, 2026
**Version**: 1.0.0
