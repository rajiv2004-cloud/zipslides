# Zipslides - Presentation Sharing Platform

A modern web application for uploading and sharing presentations with instant public links. Built with Next.js, TypeScript, and Tailwind CSS featuring a beautiful dark theme with violet and space accents.

## ✨ Features

- **File Upload**: Drag and drop support for PPT, PPTX, and PDF files
- **Instant Sharing**: Generate custom public links immediately after upload
- **User Authentication**: Secure login and signup system
- **Dashboard**: Manage your presentations with detailed analytics
- **Modern UI**: Beautiful dark theme with violet and space color scheme
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Feedback**: Toast notifications for user actions

## 🎨 Design Theme

- **Primary Colors**: Violet/Purple gradient (#8b5cf6 to #7c3aed)
- **Space Accents**: Blue tones for cosmic feel
- **Dark Background**: Deep blacks and grays for modern look
- **Animations**: Smooth transitions and micro-interactions

## 📱 Pages

1. **Landing Page** (`/`) - Hero section with features and call-to-action
2. **Login** (`/login`) - User authentication with form validation
3. **Signup** (`/signup`) - Account creation with password confirmation
4. **Upload** (`/upload`) - Drag and drop file upload with progress
5. **Dashboard** (`/dashboard`) - User profile and presentation management
6. **Loading** (`/loading`) - Animated loading screen

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zipslides
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone

## 📁 Project Structure

```
zipslides/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with dark theme
│   ├── page.tsx             # Landing page
│   ├── loading.tsx          # Loading component
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── signup/
│   │   └── page.tsx         # Signup page
│   ├── upload/
│   │   └── page.tsx         # File upload page
│   └── dashboard/
│       └── page.tsx         # User dashboard
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎯 Key Features Explained

### File Upload System
- Supports PPT, PPTX, and PDF formats
- 50MB file size limit
- Drag and drop interface
- Real-time upload progress
- File validation and error handling

### Authentication
- Email and password validation
- Password strength requirements
- Remember me functionality
- Secure form handling

### Dashboard
- Presentation management
- View analytics (views, downloads)
- Copy share links
- Delete presentations
- Profile settings

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Adaptive layouts

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Violet colors
    500: '#8b5cf6',
    600: '#7c3aed',
    // ...
  },
  dark: {
    // Dark theme colors
    800: '#1e293b',
    900: '#0f172a',
    // ...
  },
  space: {
    // Space theme colors
    400: '#38bdf8',
    600: '#0284c7',
    // ...
  }
}
```

### Animations
Framer Motion animations can be customized in individual components. The app uses:
- Fade-in animations
- Slide transitions
- Floating elements
- Loading spinners

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in the `app/` directory
2. Add components in a `components/` folder
3. Update navigation in layout files
4. Add new routes to the routing system

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Zipslides** - Share presentations instantly with style! ✨
