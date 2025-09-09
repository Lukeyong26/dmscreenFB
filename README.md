# D&D Virtual Dungeon Master Screen

A customizable virtual dungeon master screen built with React, Vite, and TypeScript. This application allows users to add, remove, and position different D&D utility modules anywhere on the screen for an enhanced tabletop gaming experience.

## Features

- **Modular Design**: Add and remove different D&D utility modules
- **Drag & Drop Interface**: Position modules anywhere on the screen
- **Persistent Layout**: Your screen layout is saved and restored between sessions
- **Current Modules**:
  - D&D Rules Reference
  - Initiative Tracker
  - Spells List
  - Dice Roller
  - Random Monster Generator
  - Ability Tables
  - Vicious Mockery Generator

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dnd-virtual-dm-screen
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Adding New Modules

Want to add your own custom module to the DM screen? Follow these simple steps:

### Step 1: Create Your Component

1. Create a new folder in the `src/components/` directory for your module
2. Create your React component following standard React patterns

Example structure:
```
src/
  components/
    your-module-name/
      YourModule.tsx
      (optional additional files)
```

### Step 2: Register Your Module

Add your new component to the modules list in `componentRenderer.tsx`:

```typescript
import YourModule from "../components/your-module-name/YourModule";

export const modules = [
    // ... existing modules
    { 
        id: 'yourModuleId', 
        name: 'Your Module Display Name', 
        component: YourModule as React.FC<{id: string}> 
    },
]
```

**Important Notes:**
- Your component should accept an `id` prop of type `string`
- The `id` field must be unique among all modules
- The `name` field will be displayed in the UI when users add modules

### Step 3: Test Your Module

Your new module should now appear in the available modules list and be ready to use!

## State Management

This project uses Zustand for state management with browser persistence. Your layout and module states are automatically saved to localStorage.

### Using Layout State in Your Components

If you need to persist state for your custom module, use the provided `useLayoutState` hook:

```typescript
import { useLayoutState } from '../hooks/useLayoutState';

interface MyComponentState {
  someValue: string;
  anotherValue: number;
}

function MyComponent({ id }: { id: string }) {
  const [state, updateState, setState] = useLayoutState<MyComponentState>(id, {
    someValue: 'default',
    anotherValue: 0
  });

  // Update partial state
  const handleUpdate = () => {
    updateState({ someValue: 'new value' });
  };

  // Replace entire state
  const handleReset = () => {
    setState({ someValue: 'default', anotherValue: 0 });
  };

  return (
    <div>
      <p>Current value: {state.someValue}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
```

### Hook Parameters

- `componentId`: Unique identifier for your component instance (passed as `id` prop)
- `initialState`: Default state object for your component

### Hook Returns

- `currentState`: Current state object
- `updateState`: Function to update partial state
- `setState`: Function to replace entire state

The state is automatically persisted to the browser's localStorage and will be restored when the user returns to the application.

## Project Structure

```
src/
├── components/
│   ├── Your Custom Module/     # Your custom modules
├── screen/                     # Screens
├── store/                      # Zustand store
└── utils/
│   └── componentRenderer.tsx   # Module registration
│   └── useLayoutState.tsx      # State management hook
└── App.tsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your module following the guide above
4. Test your changes
5. Submit a pull request

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Zustand** - State management
- **CSS Modules** - Styling (if applicable)

## License

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Happy dungeon mastering! 🎲