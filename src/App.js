import './App.css';
import img from './img/bg3.jpg'
import Header from './components/header/Header';
import Layout from './components/layout/Layout';
import Footer from './components/footer/Footer';


const App = () => {
  return (
    <>
      <Header />
      <Layout 
        title = "This is title"
        descr = "This is Description!"
        urlBg = {img}
      />
      <Layout 
        title = "This is title"
        descr = "This is Description!"
        colorBg = "	#E6E6FA"
      />
      <Layout
        title = "This is title"
        descr = "This is Description!"
        urlBg = {img}
      />
      <Footer />
    </>
  );
}

export default App;
