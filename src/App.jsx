import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Products from "./components/Products.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
