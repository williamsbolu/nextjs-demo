import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // this props 👆👆 are passes into this myApp component automatically by nextjs, since nextjs is the thing using that specific component
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// component holds d actual page content of our different pages. That should be rendered, (it will different whenever we switch a page)

// pageProps are specific props our pages might be getting

// whenever we have some component or setting that affects all our pages, we can utilize this _app.js file to easily add
// that without diving into dozens of file individually (that is adding the layout component as a parent for our page content)
