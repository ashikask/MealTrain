import uniqid from "uniqid";
import { ordersService } from "./../services/index.js";
import { providerService, authService } from "./../services/index.js";
import {
  sendOrderReadyEmail,
  sendOrderCompleteEmail,
} from "./../helpers/providerEmailHelper.js";
import { userDetailsService } from "./../services/index.js";

//function to setResponse
export const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//function to setError
export const setError = (error, response) => {
  response.status(500);
  response.json(error);
};

export const getProviders = async (req, res) => {
  try {
    var providersList = await providerService.find();
    for (let i = 0; i < providersList.length; i++) {
      var providerDetails = await userDetailsService.search({
        providerId: providersList[i]._id,
      });
      // console.log(providerDetails);
      const providerItem = {
        provider: providersList[i],
        providerDetails: providerDetails[0],
      };
      providersList[i] = providerItem;
    }
    setResponse(providersList, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const postProviders = async (req, res) => {
  try {
    const provider = req.body;
    const savedProvider = await providerService.save(provider);
    setResponse(savedProvider, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const getOneProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    setResponse(provider, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const updateOneProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const providerReplacement = req.body;
    const query = {
      _id: providerId,
    };
    const updatedProvider = await providerService.replace(
      query,
      providerReplacement
    );

    setResponse(updatedProvider, res); // Changes updated here
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const removeProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const query = {
      _id: providerId,
    };
    const deleteStatus = await providerService.remove(query);
    setResponse(deleteStatus, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const getOrders = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    const orderIdList = provider.orders;
    const orderList = orderIdList.map((orderId) => {
      return ordersService.findOne(orderId);
    });

    setResponse(orderList, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const getOrder = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const orders = await ordersService.find({ providerId: providerId });
    setResponse(orders, res);
  } catch (e) {
    setError(e, res);
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    const orderIdList = provider.orders;
    if (orderIdList.includes(req.params.orderId)) {
      const order = await ordersService.findOne(req.params.orderId);
      setResponse(order, res);
    } else {
      throw "Order not present in selected provider orders";
    }
  } catch (e) {
    setError(e, res);
  }
};

export const updateOneOrder = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    const orderIdList = provider.orders;
    if (orderIdList.includes(req.params.orderId)) {
      const updatedOrder = await ordersService.update(
        req.params.orderId,
        req.body
      );
      const studentId = req.body.studentId;
      var userDetailsO = await userDetailsService.search({ studentId }); //will return the User details of the student
      const userDetailsId = userDetailsO[0]._id;
      var authDetailsO = await authService.search({ userDetailsId });
      console.log(userDetailsO);
      console.log(userDetailsO[0].firstname);
      const userDetails = {
        firstName: userDetailsO[0].firstname,
        lastName: userDetailsO[0].lastname,
        email: authDetailsO.email,
        orderDetails: req.body,
      };

      if (req.body.status == "DELIVERED") {
        sendOrderCompleteEmail(userDetails);
      } else if (req.body.status == "ORDER_COMPLETE") {
        sendOrderReadyEmail(userDetails);
      }
      setResponse(updatedOrder, res);
    } else {
      throw "Order not present in selected provider orders";
    }
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const deleteOneOrder = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    const orderIdList = provider.orders;
    const orderId = req.params.orderId;

    if (orderIdList.includes(req.params.orderId)) {
      const orderDeleteStatus = await ordersService.remove(orderId);
      const newOrderList = orderIdList.remove(orderId);
      provider.orders = newOrderList;
      setResponse(orderDeleteStatus, res);
    } else {
      throw "Order not present in selected provider orders";
    }
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const getOffering = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const provider = await providerService.findOne(providerId);
    const offerings = provider.offerings;
    setResponse(offerings, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const postOffering = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const newoffering = req.body;

    newoffering._id = uniqid();
    const provider = await providerService.findOne(providerId);
    const offerings = provider.offerings;
    const newOfferings = offerings.push(newoffering);
    const updatedProvider = await providerService.replace(
      { _id: providerId },
      provider
    );
    setResponse(newoffering, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const deleteOffering = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const offeringToBeRemoved = req.body;
    const provider = await providerService.findOne(providerId);
    const offerings = provider.offerings;
    const updatedOfferings = offerings.filter(
      (offering) => offeringToBeRemoved._id != offering._id
    );
    provider.offerings = updatedOfferings;
    const updatedProvider = await providerService.replace(
      {
        _id: providerId,
      },
      provider
    );

    setResponse(updatedProvider, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const updateOneOffering = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const offeringId = req.params.offeringId;
    const updatedOffering = req.body;
    const provider = await providerService.findOne(providerId);
    const offeringList = provider.offerings;
    provider.offerings = offeringList.map((offering) => {
      if (offering._id == offeringId) {
        return updatedOffering;
      }
      return offering;
    });
    const updated = providerService.replace({ _id: providerId }, provider);
    setResponse(updatedOffering, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const sendEmail = async (req, res) => {
  try {
    sendOrderStatusEmail();
    setResponse("success", res);
  } catch (e) {}
};
