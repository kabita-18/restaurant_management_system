import axios from "axios";

export const BASE_URL = "http://localhost:9090";
export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const registerUsers = async (user) => {
  console.log("Register payload:", user);
  try {
    const response = await myAxios.post("/deliciousbyte/register", user);
    return response.data;
  } catch (error) {
    console.error("Sign-up error:", error);

    if (error.response && error.response.data) {
      return error.response.data;
    } else {
     
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }
};

export const register = async (user) => {
  console.log(user);
  const response = await myAxios.post(
    "/deliciousbyte/owner/manager/addmanager",
    user
  );
  return response.data;
};

export const AddMenuItems = async (menu) => {
  try {
    const response = await myAxios.post("/deliciousbyte/owner/menu/add", menu);
    console.log("Success!", response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.error("Error adding menu!", error);
    }
  }
};

export const updatePassword = async (log) => {
  const token = localStorage.getItem("token");

  const response = await myAxios.put(
    "/deliciousbyte/updatepassword",
    log,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const UpdateMenuItemsOwners = async (menu) => {
  const response = await myAxios.put("/deliciousbyte/owner/menu/update", menu);
  return response.data;
};

export const UpdateMenuItemsManager = async (menu) => {
  const response = await myAxios.put("/deliciousbyte/update/menu/manager", menu);
  return response.data;
};
export const checklogin = async (log) => {
  const response = await myAxios.post("/deliciousbyte/login", log, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const UpdateManagerDetails = async (manager) => {
  const response = await myAxios.put(
    "deliciousbyte/owner/manager/updatemanager",
    manager
  );
  return response.data;
};

export const AddManagerDetails = async (manager) => {
  const response = await myAxios.post(
    "deliciousbyte/owner/manager/addmanager",
    manager
  );
  return response.data;
};

export const fetchAllManagers = async () => {
  const response = await myAxios.get("/deliciousbyte/view/manager");
  return response.data;
};

export const getAvailableMenuItems = () => {
  return myAxios.get("/deliciousbyte/view/menu");
};


export const AddOrderDetails = async (order) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    console.log("Payload being sent to backend:", order);
    const response = await myAxios.post("deliciousbyte/order/addorder", order, {
      headers: {
        Authorization: `Bearer${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
};

export const createPaymentIntent = async (request) => {
  try {
    console.log("Received in createPaymentIntent:", request);
    const response = await myAxios.post("/deliciousbyte/createpayment", {
      orderId: request.orderid,
      amount: request.amount,
      currency: "inr",
      description: `Payment for Order #${request.orderid}`,
    });

    console.log("Success!", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const downloadInvoice = async (paymentId) => {
  const res = await myAxios.get(`/deliciousbyte/invoice/${paymentId}`, {
    responseType: "blob",
  });
  const url_2 = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url_2;
  link.setAttribute("download", `invoice_${paymentId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getAllOrders = async () => {
  try {
    const response = await myAxios.get("deliciousbyte/view/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};