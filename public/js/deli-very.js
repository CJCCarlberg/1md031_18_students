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

    emailBox: null,
    burgerChoice: "Choose a burger!",
    genderPick: null,
    paymentSelect: null,
    foodCheck: null,
    checkOrder: [],
    myOrder: [],
    myMenu: food,

    theCustomer: {
      theName: '',
      theEmail: '',
      theGender: '',
    },
    /*theCustomer: [{this.nameBox}],*/
    myT: "T",
  },

  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },

     computeOrder: function(){
       this.theCustomer.theName = this.nameBox,
       this.theCustomer.theEmail = this.emailBox,
       this.theCustomer.theGender = this.genderPick
     },

    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
                    this.deliveryLocation = { x: event.clientX - 10 - offset.x,
                                    y: event.clientY - 10 - offset.y };
                    /*this.theCustomer: {name: nameBox, email: emailBox,
                                      gender: genderPick, payment: paymentSelect};*/
                              },

    addOrder: function () {
      socket.emit("addOrder", { orderId: this.getNext(),
                                details: {x: this.deliveryLocation.x,
                                          y: this.deliveryLocation.y},
                                orderItems: this.checkOrder,
                              /*  customerInfo: [this.theCustomer.theName,this.theCustomer.theEmail,
                                  this.theCustomer.theGender] */
                                customerInfo: this.theCustomer});
    }
  }
});
