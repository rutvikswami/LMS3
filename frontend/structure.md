# LMS v3 Frontend Folder Structure

```
lms_v3/frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── api/
│   │   └── axios.ts
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── navbar.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   └── textarea.tsx
│   │   │
│   │   ├── CourseCard.tsx
│   │   ├── Footer.jsx
│   │   ├── HomeBanner.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── constants/
│   │   └── permissions.ts
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── CourseBuilder.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── CourseLearn.tsx
│   │   ├── CreateCourse.tsx
│   │   ├── Home.tsx
│   │   ├── InstructorDashboard.tsx
│   │   ├── InstructorRequest.tsx
│   │   ├── Login.tsx
│   │   ├── MyCourses.tsx
│   │   ├── MyLearning.tsx
│   │   └── Register.tsx
│   │
│   ├── types/
│   │   └── course.ts
│   │
│   ├── utils/
│   │   └── auth.ts
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── components.json
├── eslint.config.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Directory Overview

### `/public`
Static assets served directly by Vite

### `/src`
Main source code directory

#### `/src/api`
API configuration and axios instance setup

#### `/src/assets`
Static assets like images and icons

#### `/src/components`
Reusable React components
- **`/layout`**: Layout components (navbar, etc.)
- **`/ui`**: Shadcn UI components (accordion, button, card, etc.)
- Root level components for specific features

#### `/src/constants`
Application constants and configuration values

#### `/src/context`
React Context providers for global state management

#### `/src/lib`
Utility libraries and helper functions

#### `/src/pages`
Page components for different routes
- Authentication pages (Login, Register)
- Course pages (CourseBuilder, CourseDetail, CreateCourse, etc.)
- Dashboard pages (InstructorDashboard, MyCourses, MyLearning)

#### `/src/types`
TypeScript type definitions and interfaces

#### `/src/utils`
Utility functions and helpers

### Root Configuration Files
- **`components.json`**: Shadcn UI component configuration
- **`eslint.config.js`**: ESLint configuration
- **`vite.config.ts`**: Vite build tool configuration
- **`tsconfig.*.json`**: TypeScript configuration files
- **`package.json`**: Node.js dependencies and scripts
