import { AppRoutes } from "./routes"
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
      <AppRoutes />
    </Router>
    </AuthProvider>
    
  )
}

export default App;