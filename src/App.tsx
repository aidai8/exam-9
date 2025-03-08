import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Containers/Home/Home.tsx";
import Categories from "./components/Categories/Categories.tsx";

const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route
              path="/"
              element={(
                  <Home/>)}
          />
          <Route
              path="/categories"
              element={(<Categories/>)}
          />
          <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
      </Layout>
    </>
  )
};

export default App
