import React, { useEffect, useState } from 'react'
import API from '../services/api'



function Order() {

  const [orders , setOrders] = useState([]);

  //FETCH ALL ORDERS
  const getOrders = async() => {

    try {
      
   
    const token = localStorage.getItem("token");

    const response = await API.get("/order" , 
      { 
      headers:{
        "auth-token" : token
      }
    })

    setOrders(response.data.orders)
     } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=> {
    getOrders()
  } , [])



  return (
    <>
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {
        orders.length === 0
        ? (
          <h2>No orders found</h2>
        )
        : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="border p-4 rounded-xl"
              >

                <h2 className="text-xl font-bold mb-2">

                  Order ID:
                  {" "}
                  {order._id}

                </h2>

                <p className="mb-2">

                  Status:
                  {" "}
                  {order.status}

                </p>

                <p className="mb-4">

                  Total:
                  {" "}
                  ₹ {order.totalAmount}

                </p>

                {/* items */}
                <div className="space-y-3">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {item.product.title}
                        </h3>

                        <p>
                          Quantity:
                          {" "}
                          {item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>
        )
      }

    </div>
    </>
  )
}

export default Order