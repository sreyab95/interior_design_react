
// import Authform from "../src/components/AuthForm"
// import Home from "../src/components/Home"
import { BrowserRouter, Routes, Route } from "react-router";
// import DesignShowcase from "../src/components/KitchenDesign";
// import Layout from "../src/components/Layout";
// import SearchDetails from "../src/components/SearchDetails";
// import DesignPage from "../src/components/DesignPage";
// import Favorites from "../src/components/Favorites"
// import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout";
const Home = lazy(() => import("./components/Home"));
const Authform = lazy(() => {
  console.log("Downloading AuthForm Chunk");
  return import("./components/AuthForm")
});
const DesignPage = lazy(() => import("./components/DesignPage"));
const Favorites = lazy(() => import("./components/Favorites"));
const DesignShowcase = lazy(() => import("./components/KitchenDesign"));
const SearchDetails = lazy(() => import("./components/SearchDetails"));

const User = lazy(() => import("./components/User"));
import ProtectedRoute from "./protectedroute/ProtectedRoute";

const CartPage = lazy(() => import("./components/CartPage"));
import { Toaster } from "react-hot-toast";

function App() {
  return (

    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#e0d5d5",
            color: "#0d0101",
            // borderRadius: "12px",
            padding: "16px",

          },
        }}
      />

      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/authform"
            element={
              <Layout>
                <Authform />
              </Layout>
            }
          />

          <Route
            path="/modularkitchen"
            element={
              <Layout>
                <DesignShowcase />
              </Layout>
            }
          />

          <Route
            path="/searchdetails"
            element={
              <Layout>
                <SearchDetails />
              </Layout>
            }
          />

          <Route
            path="/design"
            element={
              <Layout>
                <DesignPage />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/favorites"
            element={
              <Layout>
                <Favorites />
              </Layout>
            }
          />

          <Route
            path="/user"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />


        </Routes>



      </Suspense>

    </>


  );
}

export default App
