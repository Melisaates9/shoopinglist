import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';  


const shops = [{id:1,name: "Gratis"}, { id:2,name:"Mac"}, {id:3,name:"misha"}] ;
const kategori = [{ id:1,name: "Makyaj"}, {id:2,name: "Cilt Bakım"},{id:3,name: "Saç Bakım"},{id:4,name: "Parfüm & Deodorant"}]
function App() {
  return (
    <> 
      <Container>
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Ürün adı" />
          </Form.Group>
          <Form.Select aria-label="Default select example">
      <option>Chose youre shop </option>
     {shops.map((shop)=>(
      <option key={shop.id} value={shop.id}>{shop.name} </option>
     ))}
    </Form.Select>
    <Form.Select aria-label="Default select example" className="mt-3">
      <option>Categories</option>
      {kategori.map((kategori)=>(
      <option key={kategori.id} value={kategori.id}>{kategori.name} </option>
     ))}
    </Form.Select>
        </Form>
      </Container>
    </>
  );
}

export default App;
