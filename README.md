# Overview

This is a Snake and Ladder board game built as a full-stack web application. The project implements a classic Snake and Ladder game with a modern web interface, featuring a React frontend with interactive gameplay, sound effects, and a clean user interface built with Tailwind CSS and Radix UI components. The backend is set up with Express.js and includes database configuration with Drizzle ORM for PostgreSQL, though the current implementation uses in-memory storage for user data.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React and TypeScript, using Vite as the build tool. The application follows a component-based architecture with:

- **State Management**: Zustand is used for global state management, with separate stores for game logic (`useSnakeLadder`), audio controls (`useAudio`), and general game phases (`useGame`)
- **UI Components**: Built with Radix UI primitives and styled with Tailwind CSS for a consistent design system
- **Game Logic**: Core game mechanics are separated into utility functions, handling snake and ladder positions, player movement, and dice rolling
- **Audio System**: Integrated audio support for background music and sound effects with mute/unmute functionality

## Backend Architecture
The backend uses Express.js with TypeScript in an ESM module setup:

- **API Structure**: RESTful API design with routes prefixed with `/api`
- **Storage Interface**: Abstracted storage layer with `IStorage` interface, currently implemented as in-memory storage (`MemStorage`) but designed to be easily replaceable with database storage
- **Middleware**: Request logging, error handling, and JSON parsing middleware
- **Development Setup**: Vite integration for development with HMR support

## Data Storage Solutions
The application is configured for PostgreSQL using Drizzle ORM:

- **Schema Definition**: User schema defined in shared directory for type safety across frontend and backend
- **Migration System**: Drizzle Kit configured for database migrations
- **Current Implementation**: In-memory storage for development, with database schema ready for production deployment
- **Database Connection**: Neon Database serverless PostgreSQL connection configured

## Authentication and Authorization
Basic user management structure is in place with:

- **User Schema**: Username and password fields defined
- **Validation**: Zod schemas for input validation
- **Storage Methods**: CRUD operations defined in storage interface for user management

## External Dependencies

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect
- **Drizzle Kit**: Database migration and schema management tool

### Frontend Libraries
- **React**: Core UI library with TypeScript support
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI component primitives
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching
- **React Three Fiber**: 3D graphics support (Three.js wrapper)
- **Class Variance Authority**: Component variant styling

### Backend Libraries
- **Express.js**: Web application framework
- **TSX**: TypeScript execution environment
- **ESBuild**: Build tool for production bundling

### Development Tools
- **TypeScript**: Type safety across the entire application
- **PostCSS**: CSS processing with Autoprefixer
- **GLSL Plugin**: Shader support for 3D graphics
