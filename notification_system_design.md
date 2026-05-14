# Campus Notifications Microservice Architecture

## Architecture
The application follows a client-side rendered Single Page Application (SPA) architecture built with React and Vite. It directly integrates with external evaluation APIs to handle authentication, data fetching, and strict centralized logging.

## Folder Structure
- `logging_middleware/` : Contains the strictly formatted, external-facing logger module.
- `notification_app_fe/src/api/` : Axios configurations and API interceptors.
- `notification_app_fe/src/components/` : Reusable UI components (NoteCard).
- `notification_app_fe/src/pages/` : Core view layers (Login, Priority, AllNotes).
- `notification_app_fe/src/services/` : Encapsulated business logic (Authentication).
- `notification_app_fe/src/utils/` : LocalStorage management for read/unread state.

## Logging Middleware
A custom logger was built to ensure 100% observability. Every API request, response, error, UI mount, and user action is tracked. The logger strictly enforces the required `Log(stack, level, package, message)` constraints and securely transmits logs over HTTPS with Bearer token authentication. 

## Notification Flow
1. User logs in.
2. Tokens are saved securely in `localStorage`.
3. Application fetches raw notification arrays from the API.
4. Data is passed through sorting and storage utilities before hitting the UI.

## Priority Algorithm
The frontend sorts notifications using a weight-based algorithm directly inside the API service:
- Placement = Weight 3 (Highest)
- Result = Weight 2
- Event = Weight 1 (Lowest)
Sorting occurs in `O(N log N)` time prior to component rendering.

## State Management
State is handled locally within pages using React `useState` and `useEffect`. Persistent state (read/unread tracking) uses browser `localStorage`. This prevents over-engineering with Redux while keeping the app fast.

## API Integration
Axios is utilized with Request/Response interceptors. This ensures the Authorization Bearer token is automatically attached to every outgoing request and handles global error catching.

## Error Handling
Errors are caught in try/catch blocks within the `api/` and `services/` layers, immediately logged to the external logging service with `level: "error"`, and graceful fallback UI messages are shown to the user.

## Scalability & Performance Optimization
- Pagination is implemented using `limit` and `page` parameters to prevent loading massive DOM trees.
- Local sorting ensures the frontend doesn't over-burden the API.
- LocalStorage acts as a cache for unread notification states, preventing unnecessary network trips.