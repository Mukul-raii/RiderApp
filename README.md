# RiderApp

A real-time ride-hailing mobile application built with React Native and Expo. RiderApp connects riders with drivers through live location tracking, WebSocket-based real-time updates, and Firebase authentication. The app features file-based routing via Expo Router, state management with Zustand, and a Tailwind CSS-powered UI through NativeWind.

## Technical Highlights

### Architecture & Patterns

- **File-based routing** with [Expo Router](https://docs.expo.dev/router/introduction/) using grouped routes `(auth)` and `(main)` for authenticated and unauthenticated flows
- **WebSocket event-driven architecture** using [Socket.IO](https://socket.io/) for real-time ride requests, acceptance notifications, and completion events
- **Zustand state management** with [subscriptions](https://docs.pmnd.rs/zustand/getting-started/introduction) for global stores handling authentication, ride state, socket connections, and map interactions
- **TypeScript path aliases** (`@/*`, `@services/*`, `@stores/*`) configured in [`tsconfig.json`](./tsconfig.json) for cleaner imports
- **Conditional rendering** based on authentication state in the [root layout](./app/_layout.tsx) using Zustand selectors
- **React Native Reanimated** for [declarative animations](https://docs.swmansion.com/react-native-reanimated/) including `FadeInDown` and `FadeInUp` transitions

### Real-Time Features

- **Socket.IO client** implementation with auto-reconnection logic and exponential backoff in [`socket.ts`](./src/utils/socket.ts)
- **Event-driven state updates** through a centralized [`eventHandler`](./src/utils/eventHandler.ts) that processes WebSocket events (`rideAccepted`, `rideRequested`, `ride_completed`)
- **Room-based messaging** where riders join specific rooms (`rider:{riderId}`) for targeted event delivery
- **Connection state management** with lifecycle hooks (`connect`, `disconnect`, `connect_error`) logged for debugging

### Location & Mapping

- **React Native Maps** integration with [MapView](https://github.com/react-native-maps/react-native-maps) components including `Marker`, `Polyline`, and `UrlTile` for custom tile layers
- **Expo Location** for [foreground location tracking](https://docs.expo.dev/versions/latest/sdk/location/) with permission handling
- **Direction coordinates** calculated for route visualization between pickup and dropoff points
- **Debounced region changes** in map components to prevent excessive API calls during pan/zoom gestures

### UI & Styling

- **NativeWind** for [Tailwind CSS in React Native](https://www.nativewind.dev/) with custom Poppins font family configuration in [`tailwind.config.js`](./tailwind.config.js)
- **Linear gradients** using [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) for polished visual effects
- **Safe area handling** with [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) wrapping the root layout
- **Custom loading states** with animated components in [`components/Loader/`](./app/components/Loader/)

### Authentication & Security

- **Firebase Authentication** through [@react-native-firebase/auth](https://rnfirebase.io/auth/usage) for email/password login and signup
- **Secure token storage** using [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) for persistent authentication
- **Environment variable management** with `EXPO_PUBLIC_*` prefixed vars for Firebase config and WebSocket endpoints

## Technologies

- **[Expo SDK 54](https://expo.dev/)** – Managed React Native platform with native modules
- **[React Native 0.81.5](https://reactnative.dev/)** – Cross-platform mobile framework
- **[TypeScript 5.9](https://www.typescriptlang.org/)** – Static type checking
- **[Zustand 5.0](https://docs.pmnd.rs/zustand/getting-started/introduction)** – Lightweight state management
- **[Socket.IO Client 4.8](https://socket.io/docs/v4/client-api/)** – Real-time bidirectional communication
- **[Firebase 12.2](https://firebase.google.com/docs)** – Backend services (Auth, Firestore)
- **[NativeWind 4.1](https://www.nativewind.dev/)** – Tailwind CSS for React Native
- **[Axios 1.11](https://axios-http.com/)** – HTTP client for REST API calls
- **[Zod 4.1](https://zod.dev/)** – TypeScript-first schema validation
- **[React Native Maps 1.20](https://github.com/react-native-maps/react-native-maps)** – Native map components
- **[React Native Reanimated 4.1](https://docs.swmansion.com/react-native-reanimated/)** – Performant animations
- **Fonts:** Poppins (configured in Tailwind), [Space Mono](./assets/fonts/SpaceMono-Regular.ttf) (included)

## Project Structure

```
RiderApp/
├── android/                 # Native Android configuration
├── app/                     # Expo Router file-based routes
│   ├── (auth)/             # Unauthenticated routes (login, signup)
│   ├── (main)/             # Authenticated routes (home, myRides, profile)
│   │   └── home/           # Ride booking flow screens
│   └── components/         # Reusable UI components
│       └── Loader/         # Custom loading animations
├── assets/                  # Static resources
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── hooks/              # Custom React hooks (useAuth, useBack)
│   ├── services/           # API clients (rideService, userService)
│   ├── stores/             # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions and configs
├── app.json                # Expo configuration
├── google-services.json    # Firebase Android config
└── tailwind.config.js      # Tailwind/NativeWind configuration
```

**Key Directories:**

- **[`app/(main)/home/`](<./app/(main)/home/>)** – Core ride booking UI including form input, location selection, and ride preparation screens
- **[`src/stores/`](./src/stores/)** – Global state management with separate stores for auth, rides, socket connections, maps, and user data
- **[`src/utils/`](./src/utils/)** – Socket.IO client class, Firebase config, event handlers, and API wrapper utilities
- **[`app/components/Loader/`](./app/components/Loader/)** – Animated loading indicators (car animation, pulsing dots, location pin, logo)
