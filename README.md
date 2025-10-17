# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# RiderApp

A modern, real-time ride-hailing mobile application built with React Native and Expo. This app allows users to request rides, track their rides in real-time, and manage their ride history.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Real-time Communication](#real-time-communication)
- [Authentication](#authentication)
- [Styling](#styling)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

RiderApp is a comprehensive ride-hailing solution that connects riders with drivers through a seamless mobile experience. The app features real-time ride tracking, secure authentication, and an intuitive user interface.

## ✨ Features

### Core Features

- **User Authentication**: Secure login/registration with Firebase Auth
- **Ride Booking**: Easy pickup and drop-off location selection
- **Real-time Tracking**: Live ride status updates via WebSocket
- **Ride History**: Complete history of past rides
- **Profile Management**: User profile with personal information

### Technical Features

- **Cross-platform**: iOS and Android support via Expo
- **Real-time Updates**: Socket.IO integration for live ride events
- **Offline Support**: Secure token storage with Expo SecureStore
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: NativeWind (TailwindCSS) for styling

## 🛠 Tech Stack

### Frontend

- **React Native 0.79.6** - Mobile framework
- **Expo 53.0.22** - Development platform
- **TypeScript 5.8.3** - Type safety
- **Expo Router 5.1.5** - File-based routing

### State Management

- **Zustand 5.0.8** - Lightweight state management
- **AsyncStorage** - Local data persistence

### Authentication & Backend

- **Firebase Auth** - User authentication
- **Axios 1.11.0** - HTTP client
- **Socket.IO Client 4.8.1** - Real-time communication

### UI & Styling

- **NativeWind 4.1.23** - TailwindCSS for React Native
- **Expo Vector Icons 14.1.0** - Icon library
- **React Native Reanimated 3.17.4** - Animations

### Maps & Location

- **Mappls Map React Native 2.0.0** - Maps integration

### Development Tools

- **ESLint 9.25.0** - Code linting
- **Prettier 3.4.17** - Code formatting
- **Expo CLI** - Development commands

## 📁 Project Structure

```
riderapp/
├── app/                          # Main application code (Expo Router)
│   ├── _layout.tsx              # Root layout
│   ├── global.css               # Global styles
│   ├── (auth)/                  # Authentication routes
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── (main)/                  # Main app routes
│   │   ├── _layout.tsx          # Tab navigation
│   │   ├── (home)/              # Home screen
│   │   │   └── index.tsx
│   │   ├── (myRides)/           # Ride history
│   │   │   └── index.tsx
│   │   └── (profile)/           # User profile
│   │       └── index.tsx
│   └── components/              # Shared components
│       ├── loadingScreens.tsx
│       └── searchRide.tsx
├── src/                         # Source code
│   ├── services/                # API services
│   │   ├── rideService.ts
│   │   └── userService.ts
│   ├── stores/                  # Zustand stores
│   │   ├── rider.ts
│   │   └── user.ts
│   ├── Types/                   # TypeScript types
│   │   └── user.ts
│   └── utils/                   # Utility functions
│       ├── apicall.ts
│       ├── firebaseConfig.ts
│       ├── socket.ts
│       └── userAuth.ts
├── assets/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── logo.png
├── types/                       # Additional types
├── firebaseConfig.ts            # Firebase configuration
├── google-services.json         # Firebase Android config
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # TailwindCSS config
├── babel.config.js              # Babel config
├── metro.config.js              # Metro bundler config
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- For iOS: Xcode (macOS only)
- For Android: Android Studio

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mukul-raii/RiderApp.git
   cd RiderApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_RIDER_BACKEND_URL=your_backend_api_url
   ```

4. **Configure Firebase**
   - Place your `google-services.json` in the root directory
   - Update Firebase config in `src/utils/firebaseConfig.ts`

5. **Start the development server**

   ```bash
   npm start
   ```

6. **Run on device/emulator**
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For web: `npm run web`

## 🔧 Environment Variables

| Variable                        | Description          | Required |
| ------------------------------- | -------------------- | -------- |
| `EXPO_PUBLIC_RIDER_BACKEND_URL` | Backend API base URL | Yes      |

## 🏗 Architecture

### App Structure

The app follows a modular architecture with clear separation of concerns:

- **Routes**: File-based routing using Expo Router
- **Components**: Reusable UI components
- **Services**: API communication layer
- **Stores**: State management with Zustand
- **Utils**: Helper functions and configurations

### Navigation Flow

```
App Start → Auth Check → (Authenticated) → Main Tabs
                        ↓
                 (Not Authenticated) → Auth Screen → Main Tabs
```

### Data Flow

```
User Action → Component → Store Action → Service Call → API
                                      ↓
                                State Update → UI Re-render
```

## 🔌 API Integration

### Backend Communication

The app communicates with a REST API for ride management and user operations.

#### Key Endpoints

- `POST /user/auth/verify` - User authentication
- `GET /user/profile` - Get user profile
- `POST /ride/find-ride` - Find available rides
- `GET /ride/user-rides` - Get user's ride history
- `GET /ride/live-rides` - Get current live ride
- `PATCH /ride/request-ride` - Request a ride

#### Authentication

All API calls include JWT tokens in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## 📊 State Management

### Zustand Stores

#### User Store (`src/stores/user.ts`)

Manages user authentication and profile data.

#### Rider Store (`src/stores/rider.ts`)

Handles ride-related state including:

- Current ride data
- Ride history
- Loading states
- Real-time updates

### State Structure

```typescript
// User State
{
  user: UserSchema | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

// Rider State
{
  ride: RideData | null;
  rides: RideData[];
  loading: boolean;
  startRide: (from: string, to: string) => Promise<void>;
  fetchRides: () => Promise<void>;
}
```

## 🔄 Real-time Communication

### Socket.IO Integration

The app uses Socket.IO for real-time ride updates.

#### Events

- **joinRiderRoom**: Join user's personal room
- **rideUpdate**: Receive ride status updates
- **rideRequest**: Send ride request to drivers

#### Implementation

```typescript
// Join rider room
socket.emit("joinRiderRoom", userId);

// Listen for updates
socket.on("rideUpdate", (data) => {
  // Update ride state
});
```

## 🔐 Authentication

### Firebase Authentication

- Email/password authentication
- Automatic token refresh
- Secure token storage

### Token Management

- JWT tokens stored securely using Expo SecureStore
- Automatic token refresh on expiration
- Cross-platform storage (SecureStore on mobile, localStorage on web)

## 🎨 Styling

### NativeWind (TailwindCSS)

The app uses NativeWind for styling, providing utility-first CSS classes.

#### Key Features

- Responsive design
- Dark mode support (configured)
- Custom color schemes
- Consistent spacing and typography

#### Example Usage

```tsx
<View className="flex-1 bg-white px-6 py-10">
  <Text className="text-2xl font-bold mb-8 text-gray-900">Welcome back 👋</Text>
</View>
```

## 💻 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
npm run lint       # Run ESLint
npm run reset-project  # Reset to fresh Expo project
```

### Code Quality

- **ESLint**: Configured with Expo's recommended rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting with TailwindCSS plugin

### Development Tips

1. Use Expo Go for quick testing
2. Enable Fast Refresh for instant updates
3. Use React DevTools for debugging
4. Test on both iOS and Android regularly

## 🚀 Deployment

### Expo Build

```bash
# Build for production
expo build:android
expo build:ios

# Submit to stores
expo submit --platform android
expo submit --platform ios
```

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Build
eas build --platform android
eas build --platform ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use proper error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions:

- Create an issue on GitHub
- Contact the development team

---

**Built with ❤️ using React Native & Expo**
