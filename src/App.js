import './App.css';
import { Container, Row } from 'react-bootstrap'
import Header from './components/Header'
import SelectionBar from './components/SelectionBar'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  return (
    <Container fluid className='bg-dark'>
      <Row>
        <Header />
        <SelectionBar />
        <Content />
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
