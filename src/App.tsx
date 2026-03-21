import "./App.css";
import RootRoute from "@/root-route.tsx";
import SessionProvider from "@/provider/session-provier.tsx";

function App() {
  return <SessionProvider>
    <RootRoute />;
  </SessionProvider>;

}

export default App;
