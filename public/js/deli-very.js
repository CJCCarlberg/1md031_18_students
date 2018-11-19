/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#vue-container', /*binds my vue instance to HTML*/
  data: {
    orders: {},
    deliveryLocation: {},


    glutenMessage: "Contains gluten", lactoseMessage: "Contains lactose",
    textInput: null,
    nameBox: null,
    /*streetBox: null,
    numberBox: null,*/
    emailBox: null,
    burgerChoice: "Choose a burger!",
    genderPick: null,
    paymentSelect: null,
    foodCheck: null,
    checkOrder: [""],
    myOrder: [""],
    myMenu: food,
    myT: "T",
  },
  /*created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },*/
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },

     getNextNew: function () {
       var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
         return Math.max(last, next);
       }, 0);
       return lastOrder;
     },
    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
                    this.deliveryLocation = { x: event.clientX - 10 - offset.x,
                                    y: event.clientY - 10 - offset.y };
                              }
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getNext(),
                                details: {x: this.deliveryLocation.x,
                                          y: this.deliveryLocation.y},/*
                                details: { x: orders.clientX - 10 - offset.x,
                                           y: orders.clientY - 10 - offset.y },*/
                                orderItems: ["Beans", "Curry"],

                              });
    },
  });
