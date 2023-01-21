import {
  ordersService,
  studentService,
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

export const getOrders = async (req, res) => {
  try {
    const orders = await ordersService.find({});
    setResponse(orders, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};

export const postOrders = async (req, res) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    var order = {
      ...req.body,
      orderPlacedDate: today,
    };
    order.orderSummary = [];
    order.orderSummary.push({
      stausHistory: "NEW",
    });
    const orders = await ordersService.postOrder(order);
    const providerId = req.body.providerId;
    const studentId = req.body.studentId; // Need code for linking to student
    const student = await studentService.findOne(studentId);
    const studentOrderList = student.orders;
    studentOrderList.push(orders._id);
    student.orders = studentOrderList;
    await studentService.saveStudent(student);

    const provider = await providerService.findOne(providerId);
    const providerOrderList = provider.orders;
    providerOrderList.push(orders._id);
    provider.orders = providerOrderList;
    await providerService.saveProvider(provider);
    setResponse(orders, res);
  } catch (e) {
    console.log(e);
    setError(e, res);
  }
};
