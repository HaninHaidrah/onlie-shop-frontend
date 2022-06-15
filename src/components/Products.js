import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col, Modal, Form, Card } from "react-bootstrap";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import { LoginContext } from "../context/loginContext";
import { FaHeart } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import cookie from "react-cookies";
import { BsFillCartPlusFill } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import ControlledCarousel from "../components/ItemCarousel";
import "../App.css";
let addedCart = [];
let counter = 0;

export default function Products() {
  const [items, setItems] = useState([]);
  const [singleProduce, setSingleProduct] = useState({});
  const [singleProduct, setSingleProducts] = useState({});
  const [show, setShow] = useState(false);
  const { user, token } = useContext(LoginContext);
  const [showAddModal, setAddModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [addedproducts, setAddedProducts] = useState([]);
  const [showDelete, setDelete] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const respond = await axios.get("https://girlish.herokuapp.com/products");
      setItems(respond.data);
      console.log(respond.data);

      let config = {
        method: "get",
        url: `https://girlish.herokuapp.com/addedproducts/${user.username}`,
        headers: { Authorization: `Bearer ${token}` },
      };

      const respond2 = await axios(config);

      if (respond2.data !== null) {
        setAddedProducts(respond2.data);
        console.log(respond2.data, user.username);
      } else {
        setAddedProducts([]);
      }
    }
    getProducts();
  }, [show, showAddModal, showEditModal,showDelete]);

  const handleClick = async (item) => {
    setShow(true);
    console.log(item);

    let respond = await axios.get(
      `https://girlish.herokuapp.com/products/${item.id}`
    );
    console.log(respond.data);
    setSingleProduct(respond.data);
  };

  const handleClick2 = async (item) => {
    setShow(true);
    console.log(item);

    let respond = await axios.get(
      `https://girlish.herokuapp.com/addedproducts/${user.username}/${item.id}`
    );
    console.log(respond.data);
    setSingleProduct(respond.data);
  };

  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();

    const reqBody = {
      username: user.username,
      productName: e.target.name.value,
      img: e.target.img.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      Discription: e.target.desc.value,
    };
    let config = {
      method: "post",
      url: `https://girlish.herokuapp.com/addedproducts/${user.username}`,
      data: reqBody,
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios(config);
    setAddModal(false);

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Your product has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleDeleteProduct = async (item) => {
    const id = item.id;
    console.log(id);

    axios.delete(
      `https://girlish.herokuapp.com/addedproducts/${user.username}/${id}`
    );

    Swal.fire({
      position: "top",
      icon: "success",
      title: `${item.productName} has been deleted succefully`,
      showConfirmButton: false,
      timer: 5000,
    });
    setDelete(!showDelete)
  };
  const handlefavItem = async (item) => {
    const reqBody = {
      productName: item.productName,
      img: item.img,
      price: item.price,
      quantity: item.quantity,
      Discription: item.Discription,
      username: user.username,
    };
    let respond = axios.post(
      `https://girlish.herokuapp.com/fav/${user.username}`,
      reqBody
    );
    Swal.fire({
      position: "top",
      icon: "success",
      title: ` ${item.productName} added to favourite list check dropdown-list `,
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const handleAddToCart = (product) => {
    counter = counter + 1;
    cookie.save("counter", counter);
    addedCart.push(product);
    cookie.save("products", addedCart);

    Swal.fire({
      position: "top",
      icon: "success",
      title: ` refresh & check  your shop-cart`,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();

    const reqBody = {
      productName: e.target.name.value,
      img: e.target.img.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      Discription: e.target.desc.value,
    };

    await axios.put(
      `https://girlish.herokuapp.com/addedproducts/${user.username}/${singleProduct.id}`,
      reqBody
    );

    setEditModal(false);

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Your product has been Edited",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div style={{ heigth: "200px" }}>
              {" "}
              <img
                src="../Girlish Store.png"
                width="100%"
                style={{ marginTop: "2%", marginBottom: "5%" }}
              ></img>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <h2> Shop Now</h2>
          </Col>
          <Col md="auto">
            <h4>or</h4>{" "}
          </Col>
          <Col xs lg="2">
            <h3>
              {" "}
              <GrAddCircle
                onClick={() => {
                  setAddModal(true);
                }}
              />{" "}
              Add your Item
            </h3>
          </Col>
        </Row>
        <Row>
          <div style={{ marginTop: "5%" }}>
            {" "}
            <ControlledCarousel />
          </div>
        </Row>
      </Container>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        {items.map((product, ind) => {
          return (
            <>
              <Card style={{ width: "18rem", backgroundColor: "#fff2df" }}>
                <Card.Img variant="top" src={product.img} />
                <Card.Body>
                  <Card.Title
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontFamily: "sans-serif",
                      fontSize: "25px",
                    }}
                  >
                    {product.productName} {product.price}
                  </Card.Title>
                  <Card.Text>
                    <FaHeart
                      style={{ marginLeft: "20%" }}
                      onClick={() => {
                        handlefavItem(product);
                      }}
                    />{" "}
                    Add to Favourite List
                  </Card.Text>
                  <Card.Text>
                    <BsFillCartPlusFill
                      style={{ marginLeft: "20%" }}
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    />{" "}
                    Add to cart
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "#fdb1d5",
                      padding: "2%",
                      marginLeft: "14%",
                    }}
                    onClick={() => {
                      handleClick(product);
                    }}
                  >
                    show more Details...
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </Grid>

      {addedproducts.length > 0 && (
        <>
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col xs lg="4">
                <h2> Added Products By You </h2>
              </Col>
            </Row>
          </Container>

          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            marginTop={"5%"}
            marginBottom={"5%"}
          >
            {addedproducts.map((product, ind) => {
              return (
                <>
                  <Card
                    style={{ width: "18rem", backgroundColor: "#fff2df" }}
                    key={ind}
                  >
                    <Card.Img variant="top" src={product.img} />
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "center",
                          color: "black",
                          fontFamily: "sans-serif",
                          fontSize: "25px",
                        }}
                      >
                        {product.productName} {product.price}
                      </Card.Title>
                      <Card.Text>
                        <BiEditAlt
                          style={{ marginLeft: "20%" }}
                          onClick={() => {
                            setEditModal(true);
                            setSingleProducts(product);
                          }}
                        />{" "}
                        Edit Your Product
                      </Card.Text>
                      <Card.Text>
                        <RiDeleteBin3Line
                          style={{ marginLeft: "20%" }}
                          onClick={() => handleDeleteProduct(product)}
                        />{" "}
                        Delete from Store
                      </Card.Text>
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: "#fdb1d5",
                          padding: "2%",
                          marginLeft: "14%",
                        }}
                        onClick={() => {
                          handleClick2(product);
                        }}
                      >
                        show more Details...
                      </Button>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
          </Grid>
        </>
      )}

      {show && (
        <Modal
          show={show}
          style={{ width: "100%" }}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton style={{ backgroundColor: "grey" }}>
            <Modal.Title
              style={{
                textAlign: "center",
                color: "pink",
                marginLeft: "auto",
                fontSize: "40px",
                fontFamily: "sans-serif",
              }}
            >
              {singleProduce.productName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#fde7f4" }}>
            <Container>
              <Row>
                <Col>
                  <img width="100%" src={singleProduce.img} />
                </Col>
                <Col
                  style={{ fontFamily: "cursive", marginTop: "3%" }}
                  md="auto"
                >
                  <em>
                    <strong>Details:</strong> {singleProduce.Discription}
                  </em>
                </Col>
              </Row>
              <Row style={{ margin: "5%", color: "grey", fontSize: "17px" }}>
                {" "}
                <Col>
                  <strong>Price : {singleProduce.price}</strong>
                </Col>
                <Col>
                  <strong>Quantity : {singleProduce.quantity}</strong>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#e0d3c1" }}>
            <h6 style={{ marginRight: "33%" }}>www.girlishStore.com</h6>
          </Modal.Footer>
        </Modal>
      )}

      {showAddModal && (
        <Modal show={showAddModal} onHide={() => setAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add A new Product </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                handleSubmitAddProduct(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>product Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of your product"
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Describtion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter some dtails for your product"
                  name="desc"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter some pictures to your product"
                  name="img"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter how  much is your product"
                  name="price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter how many peices?"
                  name="quantity"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
               Close
             </Button>
             <Button variant="primary" onClick={handleClose}>
               Save Changes
             </Button> */}
          </Modal.Footer>
        </Modal>
      )}

      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit The Product </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                handleSubmitEditProduct(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>product Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit the name of your product"
                  name="name"
                  defaultValue={singleProduct.productName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Describtion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit the dtails for your product"
                  name="desc"
                  defaultValue={singleProduct.Discription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit the pictures to your product"
                  name="img"
                  defaultValue={singleProduct.img}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit how  much is your product"
                  name="price"
                  defaultValue={singleProduct.price}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Edit how many peices?"
                  name="quantity"
                  defaultValue={singleProduct.quantity}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </>
  );
}
