import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { Card, Modal, Row, Col, Container } from "react-bootstrap";
import { Grid, Button } from "@mui/material";
import { RiDeleteBin3Line } from "react-icons/ri";
import { BsFillCartPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";

import axios from "axios";

export default function FavItem() {
  const { user } = useContext(LoginContext);
  const [favList, setFavList] = useState([]);
  const [singleProduce, setSingleProduct] = useState({});
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    async function getFavList() {
      let respond = await axios.get(
        `https://girlish.herokuapp.com/fav/${user.username}`
      );
      console.log(respond.data);
      setFavList(respond.data);
    }
    getFavList();
  }, [show, showDelete]);

  const handleDeleteProduct = async (item) => {
    const id = item.id;
    console.log(id);

    axios.delete(`https://girlish.herokuapp.com/fav/${user.username}/${id}`);

    Swal.fire({
      position: "top",
      icon: "success",
      title: `${item.productName} has been deleted from list refresh the Page `,
      showConfirmButton: false,
      timer: 5000,
    });
    setShowDelete(!showDelete);
  };

  const handleClick = async (item) => {
    setShow(true);
    console.log(item);
    let respond = await axios.get(
      `https://girlish.herokuapp.com/products/${item.id}`
    );
    console.log(respond.data);
    setSingleProduct(respond.data);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        {favList.length > 0 ? (
          favList.map((product, ind) => {
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
                      <RiDeleteBin3Line
                        style={{ marginLeft: "20%" }}
                        onClick={() => handleDeleteProduct(product)}
                      />{" "}
                      Delete from Favourite List
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
            );
          })
        ) : (
          <h2> The Favourite List is Empty </h2>
        )}
      </Grid>

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
    </>
  );
}
