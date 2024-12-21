import { Button, Container, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { IconButton } from "./ components/IconButton";
import Fuse from "fuse.js";

const shops = [
  { id: 1, name: "Gratis" },
  { id: 2, name: "Mac" },
  { id: 3, name: "misha" },
];
const kategori = [
  { id: 1, name: "Makyaj" },
  { id: 2, name: "Cilt Bakım" },
  { id: 3, name: "Saç Bakım" },
  { id: 4, name: "Parfüm & Deodorant" },
];
function App() {
  //([]) usestatetin parantezi ve içindeki arayi belirtten parantez
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productkatagori, setProductkategori] = useState("");
  // konfeti yeniden bakılcak halldemedik
  const { width, height } = useWindowSize();
  const [filterName, setFilterName] = useState("");
  const [shopFilter, setFiltershop] = useState("");
  const [katagoriFilter, setkatagoriFilter] = useState("");
  const [radioFilter, setradioFilter] = useState("resetall");
  function addProduct() {
    if (productName && productShop && productkatagori) {
      const product = {
        id: nanoid(),
        name: productName,
        shop: productShop,
        kategori: productkatagori,
      };
      setProducts([...products, product]);
      console.log(products);
    } else {
      alert("Lütfen ürünü ekleyin...");
    }
    setProductName("");
    setProductShop("");
    setProductkategori("");
  }
  const filteredProducts = products.filter((product) => {
    let result = true;
    const fuse = new Fuse(products, {
      keys: ["name"],
    });
    const search = fuse.search(filterName);
    if (filterName !== "" && !search.find((r) => r.item.id === product.id)) {
      result = false;
    }
    if (shopFilter !== "" && product.shop !== shopFilter) {
      result = false;
    }
    if (katagoriFilter !== "" && product.kategori !== katagoriFilter) {
      result = false;
    }
    if (
      radioFilter!=="resetall"&& (product.isBought||false)!==(radioFilter===true)
    
    )
    {result=false}
    return result;
    
  });

  function lineProduct(id) {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          isBought: true,
        };
      } else {
        return product;
      }
    });

    setProducts(updatedProducts);
  }
  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Ürün adı"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            value={productShop}
            onChange={(e) => {
              setProductShop(e.target.value);
            }}
          >
            <option>Chose youre shop </option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            className="mt-3"
            value={productkatagori}
            onChange={(e) => {
              setProductkategori(e.target.value);
            }}
          >
            <option>Categories</option>
            {kategori.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.name}
              </option>
            ))}
          </Form.Select>
          <div className="justify-content-end d-flex">
            {" "}
            <Button
              className="mt-5 btn-light border-2 border-black "
              onClick={addProduct}
            >
              Ürünü Ekle
            </Button>
          </div>
        </Form>
      </Container>

      <Container>
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Filtrele"
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            value={shopFilter}
            onChange={(e) => {
              setFiltershop(e.target.value);
            }}
          >
            <option>Chose youre shop </option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            className="mt-3"
            value={katagoriFilter}
            onChange={(e) => {
              setkatagoriFilter(e.target.value);
            }}
          >
            <option>Categories</option>
            {kategori.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.name}
              </option>
            ))}
          </Form.Select>
          <Form.Group
            onChange={(e) => {
              const value = e.target.value;
              setradioFilter(
                value === "resetall" ? value : value === "true" ? true : false
              );
            }}
          >
            <Form.Check
              inline
              type="radio"
              label="Tümü"
              name="Group"
              value="resetall"
              id="all"
            />
            <Form.Check
              inline
              type="radio"
              label="Satın alınanlar"
              name="Group"
              value="true"
              id="bought"
            />
            <Form.Check
              inline
              type="radio"
              label="Satın alınmayanlar"
              name="Group"
              id="unpurchased"
              value="false"
            />
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Ürün ismi</th>
              <th>Mağaza</th>
              <th>Kategori</th>
              <th>Durum</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                style={{
                  textDecoration: product.isBought ? "line-through" : "none",
                }}
                onClick={() => lineProduct(product.id)}
              >
                <td>{product.name}</td>
                <td>
                  {
                    shops.find((shop) => shop.id === parseInt(product.shop))
                      ?.name
                  }
                </td>
                <td>
                  {
                    kategori.find(
                      (kategori) => kategori.id === parseInt(product.kategori)
                    )?.name
                  }
                </td>
                <td>{product.id}</td>
                <td>
                  <IconButton handleclick={() => deleteProduct(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
