import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
