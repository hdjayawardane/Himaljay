import Expo from 'expo';
var languages={
  "en":{
    variant_not_available:"Selected variant is not available",
    no_variant_available:"No variant available",
    cart:"Cart",
    delivery:"Delivery",
    payment:"Payment",
    summary:"Summary",
    price:"Price: ",
    empty_cart: "Your cart is empty.",
    enter_name: "Enter your name",
    enter_address: "Enter your address",
    notification_email: "Notification email",
    contact: "Contact phone",
    about_oreder: "Something special about the order",
    back: "Go Back",
    go_payment:'Go to payment',
    pay: 'Pay',
    status: "Status:",
    approved:"approved",
    canceled: "canceled",
    overview:'Overview',
    thanks:"Thanks!",
    order_processed: "Your order is beeing processed now. You can follow the status of it in the Orders section.",
    no_items: 'There are no items to display',
    ingredients:'Ingredients',
    no_orders: "There are no orders",
    no_categories: "There are no categories",
    next: "Next",
    name: "Name",
    address: "Address",
    email: "Email",
    phone: "Phone",
    notes: "Notes",
    CODselected: "You will pay when goods are delivered to your address",
    choosePayment: "Choose payment method",
    searchBarText: "Type here....",
    event: "Event",
    visitor: "Visitor",
    register: "Register",
    no_notifications: "There are no notifications",
    user: "User:",
    orderID: "Order ID:",
    quantity: "Quantity: "
  },
  "es":{
    variant_not_available:"La variante seleccionada no está disponiblee",
    no_variant_available:"No variante disponiblee",
    cart:"Carrito",
    delivery:"Entrega",
    payment:"Pago",
    summary:"Resumen"
  }
}
exports.expo=languages.en;
Expo.Util.getCurrentLocaleAsync().then(lng => { exports.expo=languages[lng] })