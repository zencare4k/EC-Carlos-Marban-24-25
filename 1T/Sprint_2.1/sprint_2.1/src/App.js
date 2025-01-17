  import './App.css';
  import Footer from './components/Layout/Footer'
  import Header from './components/Layout/NavBar'
  import Herosection from './components/Home/HeroSection';
  function App() {
    return (
      <div>
        <header>
        <Header/>
        </header>
        <main>
        <Herosection/>
        </main>
        <footer>
        <Footer/>
        </footer>
      </div>
    );
  }

  export default App;
