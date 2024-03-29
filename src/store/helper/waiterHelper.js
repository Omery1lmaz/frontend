import axios from "axios";

// GET WAITER HELPER
const getWaiter = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/api/waiters/${id}`, {
    withCredentials: true,
  });
  return data;
};

// GET WAITERS HELPER
const getWaitersHelper = async () => {
  const { data } = await axios.get("http://localhost:4000/api/waiters/", {
    withCredentials: true,
  });
  return data;
};


// GET WAITERS BY SELLER HELPER
const getWaitersBySellerIdHelper = async (id) => {
  const { data } = await axios.get(`http://localhost:4000/api/waiters/seller/${id}`, {
    withCredentials: true,
  });
  return data;
};

// ADD WAITER HELPER
const addWaiterHelper = async (waiter) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/waiters/`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// UPDATE WAITER HELPER
const updateWaiterHelper = async (waiter) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/waiters/${waiter._id}`,
    { waiter },
    {
      withCredentials: true,
    }
  );
  return data;
};

// DELETE WAITER HELPER
const deleteWaiterHelper = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/waiters/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

const waiterService = {
  getWaitersHelper,
  deleteWaiterHelper,
  addWaiterHelper,
  getWaiter,
  updateWaiterHelper,
  getWaitersBySellerIdHelper
};
export default waiterService;
