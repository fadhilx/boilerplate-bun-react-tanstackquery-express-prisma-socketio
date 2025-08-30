# Boilerplate Bun React TanStack Query Express Prisma Socket.IO - Real-time Counter Project

A real-time project counter application with WebSocket synchronization, built with modern web technologies.

## Features

- 🚀 **Real-time Updates**: Multiple clients sync in real-time using WebSocket
- 💾 **Persistent Storage**: Counter value saved to database using Prisma
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui and Tailwind CSS
- 🔌 **WebSocket**: Socket.IO for real-time communication
- 📱 **Responsive**: Works on all device sizes
- 🎯 **TypeScript**: Full type safety across the stack

## Tech Stack

### Server
- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Real-time**: Socket.IO
- **Validation**: Built-in TypeScript types

### Client
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: TanStack Query
- **Real-time**: Socket.IO Client
- **Build Tool**: Vite

## Project Structure

```
boilerplate-bun-react-tanstackquery-express-prisma-socketio/
├── client/                 # React frontend
├── server/                 # Express backend
├── package.json            # Root monorepo config
├── .cursorrules           # Development guidelines
├── README.md              # Comprehensive documentation
├── package.json            # Root monorepo config
└── .gitignore            # Git ignore rules
```

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for some tooling compatibility)

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd boilerplate-bun-react-tanstackquery-express-prisma-socketio
   ```

2. **Install dependencies:**
   ```bash
   bun i
   ```

3. **Create environment file:**
   ```bash
   cd server
   cp env.example .env
   cd ..
   ```

4. **Setup the project:**
   ```bash
   bun setup
   ```

5. **Start development servers:**
   ```bash
   bun dev
   ```

   This will start:
   - Server on http://localhost:3001
   - Client on http://localhost:5173

## Development

### Running Individual Services

```bash
# Server only
bun run dev:server

# Client only  
bun run dev:client

# Both (recommended)
bun run dev
```

### Database Operations

```bash
cd server

# Generate Prisma client
bun run db:generate

# Push schema changes
bun run db:push

# Open Prisma Studio
bun run db:studio
```

**Note**: The `bun setup` command handles initial database setup automatically.

### Building for Production

```bash
# Build both
bun run build

# Build individual services
bun run build:server
bun run build:client
```

## API Endpoints

### REST API
- `GET /health` - Health check
- `GET /api/counter` - Get current counter value

### WebSocket Events
- `connect` - Client connects
- `disconnect` - Client disconnects
- `increment` - Increment counter
- `decrement` - Decrement counter
- `reset` - Reset counter to 0
- `counterUpdate` - Counter value updated (broadcast)
- `error` - Error occurred

## Real-time Features

The application uses Socket.IO to provide real-time synchronization:

1. **Connection Management**: Automatic reconnection handling
2. **State Synchronization**: All clients receive updates instantly
3. **Optimistic Updates**: UI updates immediately for better UX
4. **Error Handling**: Graceful fallbacks for connection issues

## Database Schema

```prisma
model Counter {
  id        String   @id @default(cuid())
  value     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Customization

### Styling
- Modify `client/src/index.css` for global styles
- Update `client/tailwind.config.js` for theme customization
- Use shadcn/ui components for consistent design

### Server Configuration
- Update `server/.env` for environment variables
- Modify `server/src/utils/socket.ts` for custom WebSocket logic
- Update Prisma schema in `server/prisma/schema.prisma`

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3001 and 5173 are available
2. **Database errors**: Run `bun setup` or manually run `bun run db:generate` and `bun run db:push`
3. **Socket connection issues**: Check server is running and CORS settings
4. **Build errors**: Clear node_modules and reinstall with `bun install`

### Debug Mode

Enable debug logging by setting environment variables:
```bash
DEBUG=socket.io:* bun run dev:server
```

## Contributing

1. Follow the `.cursorrules` guidelines
2. Use conventional commit messages
3. Test changes thoroughly
4. Update documentation as needed

## License

This project is open source and available under the [MIT License](LICENSE).
