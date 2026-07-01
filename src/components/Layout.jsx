// Layout.jsx
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

function Layout({ children }) {
    const { darkMode } = useTheme();
    return (
        <>
            <Header />{/* spacing for fixed navbar */}
            <div

                className={
                    darkMode
                        ? "bg-gray-900 text-white min-h-screen"
                        : "bg-white text-black min-h-screen"
                }
            >
                {children}
            </div>
        </>
    );
}

export default Layout;