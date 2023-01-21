import uniqid from "uniqid";
import {
  studentService,
  ordersService,
  providerService,
} from "./../services/index.js";

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

export const getOneStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentService.findOne(studentId);
    setResponse(student, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const getStudents = async (req, res) => {
  try {
    const studentList = await studentService.find();
    setResponse(studentList, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const postStudent = async (req, res) => {
  try {
    const student = req.body;
    const savedStudent = await studentService.save(student);
    setResponse(savedStudent, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

// Add new item to the cart
export const addTocart = async (req, res) => {
  try {
    const newItem = req.body;
    const studentId = req.params.studentId;
    var student = await studentService.findOne(studentId);
    const studentCart = student.cart;
    studentCart.push(newItem);

    // add total cost
    var totalPrice = studentCart.reduce(function (total, cart) {
      return total + cart.offeringQuantity * cart.offeringPrice;
    }, 0);
    student.totalPrice = totalPrice;

    const updatedStudent = await studentService.replace(
      { _id: studentId },
      student
    );
    setResponse(updatedStudent, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

// get Cart Details for student
export const getCartDetail = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentService.findOne(studentId);
    const cartDetail = student.cart;
    var providerId = null;
    if (cartDetail.length > 0) {
      providerId = cartDetail[0].cartProviderId;
    }
    const responseObject = {
      cartItem: cartDetail,
      cartTotal: student.totalPrice,
      providerId: providerId,
    };
    setResponse(responseObject, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

// update Cart Details for student and item
export const updateCart = async (req, res) => {
  try {
    const updatedItem = req.body;
    const studentId = req.params.studentId;
    const itemId = req.params.itemId;
    var student = await studentService.findOne(studentId);
    var studentCart = student.cart;

    var isFound = studentCart.some((cart) => cart._id == itemId);
    if (isFound) {
      var itemIndex = studentCart.findIndex((x) => x._id == itemId);
      studentCart[itemIndex] = updatedItem;

      // Update the cart item total
      var totalPrice = studentCart.reduce(function (total, cart) {
        return total + cart.offeringQuantity * cart.offeringPrice;
      }, 0);
      student.totalPrice = totalPrice;

      const updatedStudent = await studentService.replace(
        { _id: studentId },
        student
      );
      setResponse(updatedStudent, res);
    } else {
      throw "Cart it is not present";
    }
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

// Called for delete of cart item
export const deleteCart = async (req, res) => {
  try {
    const updatedItem = req.body;
    const studentId = req.params.studentId;
    const itemId = req.params.itemId;
    var student = await studentService.findOne(studentId);
    var studentCart = student.cart;

    // delete item from cart
    var updatedCarts = studentCart.filter((cart) => itemId != cart._id);
    student.cart = updatedCarts;
    // Update total cost
    var totalPrice = updatedCarts.reduce(function (total, cart) {
      return total + cart.offeringQuantity * cart.offeringPrice;
    }, 0);
    student.totalPrice = totalPrice;

    const updatedStudent = await studentService.replace(
      { _id: studentId },
      student
    );
    setResponse(updatedStudent, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

// Called for delete of cart item
export const deleteAllCart = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    var student = await studentService.findOne(studentId);

    student.cart = [];
    student.totalPrice = 0;

    const updatedStudent = await studentService.replace(
      { _id: studentId },
      student
    );
    setResponse(updatedStudent, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const updateOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const studentId = req.body.studentId;
    const student = await studentService.findOne(studentId);
    const orderIdList = student.orders;
    if (orderIdList.includes(orderId)) {
      const updatedId = await ordersService.update(orderId, req.body);
      setResponse(updatedId, res);
    } else {
      throw "Order present under selected student";
    }
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const getOrdersByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const orderList = await ordersService.find({ studentId: studentId });

    const responseObject = {
      orderItems: orderList,
    };

    setResponse(responseObject, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

// remove one student by id
export const removeStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const query = {
      _id: studentId,
    };
    const studentdelete = await studentService.remove(query);
    setResponse(studentdelete, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const query = {
      _id: studentId,
    };
    const updatedStudent = await studentService.replace(query, req.body);
    setResponse(updatedStudent, res);
  } catch (e) {
    setError(e, res);
    console.log(e);
  }
};
export const getOrderOfOneStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentService.findOne(studentId);
    const orderList = student.orders;
    if (orderList.includes(req.params.orderId)) {
      const order = await ordersService.findOne(req.params.orderId);
      setResponse(order, res);
    } else {
      throw "Order not present in selected Student";
    }
  } catch (e) {
    setError(e, res);
  }
};

export const removeOrderOfOneStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentService.findOne(studentId);
    const orderList = student.orders;
    const orderId = req.params.orderId;
    if (orderList.includes(req.params.orderId)) {
      const orderRemove = await ordersService.remove(orderId);
      setResponse(orderRemove, res);
    } else {
      throw "Order not present in selected Student";
    }
  } catch (e) {
    setError(e, res);
  }
};
