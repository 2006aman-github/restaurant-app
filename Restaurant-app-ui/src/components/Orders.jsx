import axios from "../axios";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import DotScale from "styled-loaders-react/lib/components/DotScale";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/user/orders/sync", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => res)
      .then((data) => {
        setOrders(data.data);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      })
      .catch((err) => console.log(err.message));

    // checking for user existance
    if (!user) {
      history.replace("/menu");
    }
  }, []);

  return (
    <div className="orders">
      <NavBar />
      <h1>Your Orders</h1>
      {loading ? (
        <DotScale />
      ) : (
        <div className="orders__list">
          {orders.map((order) => (
            <Card className="order__card" variant="contained">
              <CardContent>
                <Typography gutterBottom>{order.status}</Typography>
                <hr />
                <br />
                <Typography gutterBottom>
                  <h4>Order Id</h4>
                  {/* <br /> */}
                  <Typography color="textSecondary">{order._id}</Typography>
                </Typography>
                <Typography gutterBottom>
                  <h4>TOTAL AMOUNT</h4>

                  <Typography color="textSecondary">
                    Rs.{order.totalAmount}
                  </Typography>
                </Typography>
                <Typography gutterBottom>
                  <h4>ITEMS</h4>
                  {/* <br /> */}
                  <Typography color="textSecondary">
                    {order.items.map(
                      (item) => item.qty + " x " + item.name + ", "
                    )}
                  </Typography>
                </Typography>
                <Typography>
                  <h4>DELIVERED TO</h4>
                  {/* <br /> */}
                  <Typography color="textSecondary">
                    {order.location}
                  </Typography>
                </Typography>
                <Typography>
                  <h4>ORDERED ON</h4>
                  {/* <br /> */}
                  <Typography color="textSecondary">
                    {order.timestamp}
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"></Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
