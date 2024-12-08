import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './components/UserList';

// Crear el cliente de React-Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserList />
  </QueryClientProvider>
);

export default App;
