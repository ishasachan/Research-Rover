import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "./screens/welcome_screen";
import SingUpScreen from "./screens/signup_screen";
import LoginScreen from "./screens/login_screen";
import PreferencesScreen from "./screens/preferences_screen";
import HomeScreen from "./screens/home_screen";

export default function App() {
  return (
    <main className="main">
      <div>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SingUpScreen />} />
          <Route path="/preferences" element={<PreferencesScreen />} />
        </Routes>
      </div>
    </main>
  );
}