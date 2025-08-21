// import { Authenticator } from '@aws-amplify/ui-react';
import MainScreen from './screen/MainScreen';
import {createBrowserRouter, RouterProvider} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';


function App() {

  const queryClient = new QueryClient();
  const router = createBrowserRouter([{
    path: "/",
    Component: MainScreen,
  }]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
  
}

export default App;