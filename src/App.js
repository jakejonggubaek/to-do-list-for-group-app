import './styles/App.css';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing/Landing';
import Room from './Room/Room';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <main>
          <Route exact path="/" render={Landing} />
          <Route path="/room/:uniqueKey" component={Room} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
