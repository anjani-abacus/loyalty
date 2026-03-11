import { ThemeProvider } from "./utils/ThemeProvider.jsx"
import { ToastContainer } from 'react-toastify';
import AppRoutes from "./routes/index.jsx";
import 'react-photo-view/dist/react-photo-view.css';

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
      <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        theme="dark"
        />
      <QueryClientProvider client={queryClient} >
        <AppRoutes />
      </QueryClientProvider>

    </ThemeProvider>
  );
} 

export default App;
