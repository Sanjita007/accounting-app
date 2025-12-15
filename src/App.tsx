import { RouterProvider } from "react-router";
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import router from "./routes/Router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
    <ToastContainer 
          position="top-right" // You can choose any position
          autoClose={5000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      
      <ThemeModeScript />
      <ThemeProvider theme={customTheme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
