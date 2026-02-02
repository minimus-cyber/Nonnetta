# Nonnetta

This repository is the foundation for an accessible neurocognitive stimulation web app hosted on GitHub Pages.

## 🎯 Features

### Accessibility (WCAG 2.1 AA Compliant)
- **High Contrast Theme**: Black background with yellow/orange accents (7:1+ contrast ratio)
- **Large Text**: Extra-large fonts (1.8rem minimum) for easy reading
- **Custom Large Cursor**: Highly visible mouse pointer for elderly users
- **Keyboard Navigation**: Full keyboard support (arrows, space, enter, ESC)
- **Screen Reader Compatible**: Semantic HTML5 and ARIA attributes

### User Features
- **User Registration & Login**: Email-based authentication with secure password hashing (SHA-256)
- **Activity Tracking**: Track daily neurocognitive activities
- **History Management**: View, print, and download activity history as TXT
- **Data Privacy**: All data stored locally in browser (no server transmission)

### Admin Panel
- **Secure Admin Access**: Located at `/admin.html`
- **Default Credentials**:
  - Username: `fraverderosa`
  - Password: `Rosa@5791`
  - ⚠️ **Important**: Change these credentials immediately after first login
- **User Management**: View registered users and their activity statistics
- **Statistics Dashboard**: Monitor user engagement and activities
- **Credential Management**: Update admin username and password

### GDPR Compliance
- **Cookie Consent Banner**: Compliant with EU regulations
- **Privacy Policy**: Complete GDPR-compliant privacy documentation
- **User Rights**: Full data portability, deletion, and access rights
- **Local Data Storage**: No external data transmission
- **Italian & EU Regulations**: Complies with Legge Stanca and EU Directive 2016/2102

## 🚀 Quick Start

1. Open `index.html` in a modern web browser
2. Accept the cookie consent banner
3. Register with your email and password
4. Start tracking your daily activities

## 🎹 Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Arrow Keys** (⬆️⬇️⬅️➡️): Navigate between activities
- **Space**: Select/deselect activities
- **Enter**: Confirm action or complete selected activity
- **ESC**: Go back or exit current section

## 🔐 Security

- **Password Hashing**: All passwords are hashed using SHA-256 before storage
- **Local Storage Only**: No data transmitted to external servers
- **Session Management**: Secure session handling with sessionStorage
- **Admin Access Control**: Protected admin panel with authentication

## 📁 Project Structure

```
├── index.html          # Main application page
├── admin.html          # Admin panel
├── privacy.html        # GDPR privacy policy
├── accessibility.html  # Accessibility statement
├── styles.css          # High-contrast accessible styles
├── app.js             # Main application logic
├── admin.js           # Admin panel logic
└── README.md          # This file
```

## 🌐 Deployment

This site is designed to be hosted on GitHub Pages:

1. Push the repository to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as source
4. Access at: `https://[username].github.io/Nonnetta/`

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties and modern layouts
- **Vanilla JavaScript**: No external dependencies
- **Web Crypto API**: For password hashing
- **localStorage**: For persistent data storage
- **sessionStorage**: For session management

## ♿ Accessibility Features

- WCAG 2.1 Level AA compliance
- High contrast mode (default)
- Keyboard-only navigation
- Screen reader support
- Large touch targets (44x44px minimum)
- Responsive design for all screen sizes
- Print-friendly layouts

## 📱 Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📋 Activity Types

1. **🧠 Esercizi di Memoria**: Memory stimulation exercises
2. **🔢 Calcolo Mentale**: Mental math exercises
3. **📝 Giochi di Parole**: Word games and puzzles
4. **🎯 Puzzle Logici**: Logic and reasoning exercises

## 🔄 Data Management

- **Export**: Download activity history as TXT file
- **Print**: Print activity records for physical copies
- **Delete**: Clear all activity history
- **Local Only**: All data remains on your device

## 📞 Support

For accessibility issues or questions:
- Email: accessibilita@nonnetta.eu

For privacy concerns:
- Email: privacy@nonnetta.eu

## 📜 Legal Compliance

- **GDPR**: Full EU General Data Protection Regulation compliance
- **Legge Stanca**: Italian accessibility law compliance
- **EU Directive 2016/2102**: Web accessibility directive compliance
- **WCAG 2.1**: Web Content Accessibility Guidelines Level AA

## 🤝 Contributing

This is a specialized accessibility project. When contributing:
- Maintain high contrast ratios (7:1+)
- Ensure keyboard navigation works
- Test with screen readers
- Follow WCAG 2.1 AA guidelines
- Keep font sizes large (1.8rem+)

## 📄 License

© 2026 Nonnetta. All rights reserved.

---

**Note**: This application stores all data locally in your browser. Clearing your browser data will delete all stored information. Regular backups via the download feature are recommended.
