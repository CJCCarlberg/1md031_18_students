/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#vue-container', /*binds my vue instance to HTML*/
  data: {
    orders: {},

    burgerMenu: [
    {name: "Burger1 ", taste: "Tastes good ", gluten: true, lactose: true, picture: 'https://i2.wp.com/fullofplants.com/wp-content/uploads/2018/01/smoky-tempeh-black-bean-burgers-14.jpg?w=1400&ssl=1'},
    {name: "Burger2 ", taste: "Tastes bad ", gluten: false, lactose: true, picture: "https://www.wearesovegan.com/wp-content/uploads/2018/03/SV_GreenBurger_V1_Header1.jpg"},
    {name: "Burger3 ", taste: "Tastes medium ", gluten: true, lactose: true, picture: "https://mittkok.expressen.se/wp-content/uploads/2017/06/cajunboken-2017-blackeyed-been-burger-700x700.jpg"}],
    glutenMessage: "Contains gluten", lactoseMessage: "Contains lactose",
    hooverTitle: "TEST",
    vueModel: "Write your suggestion here!",
    burgerChoice: "Choose a burger!",
    message: "Burger Hello",
    burgers:
    [{name: "big burger",
       img:100 },
      {name: "small burger",
      img:200 }] /*Array of tow burgers */
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getNext(),
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                              });
    },
    changeText: function () {
      this.burgerChoice = "You clicked";
    }
  }
});
