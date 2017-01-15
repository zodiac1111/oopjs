/*global console*/

// ===========父类
function Animal(args) {
    "use strict";
    var self = this,
        isLive = true;
    self.who = args.name || "animal";
    console.log("create Animal");
    self.run = function () {
        console.log("Animal run");
    };
}

function foo() {
    "use strict";
    console.log("foo");
}

//  方法1 构造的子类
function Cat(args) {
    "use strict";
    /// 私有属性
    var self = this;
    /// 公有属性
    this.name = "unmane";

    /// 私有方法
    (function constructor() {
        self.name = args.name;
        // constructor
        Animal.call(self, args); // call super constructor.
        console.log("create new cat " + self.name);
    }(args));

    /// 公有方法
    self.say = function () {
        self.name = "new name";
        console.log(" cat say" + self.name);
    };
}

/// 原型法 构造的子类
function Dog(args) {
    "use strict";
    var self = this;
    (function constructor() {
        self.name = args.name;
        // constructor
        Animal.call(self, args); // call super constructor.
        console.log("create new dog " + self.name);
    }(args));
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

/// 实例公有属性
Dog.prototype.pname = "dog pname";
/// 实例公有方法
Dog.prototype.say = function () {
    "use strict";
    this.name = "new name";
    console.log("dog say :" + this.name);
};


/// ============ Douglas Crockford 有一个模式叫“Module Pattern”可以解决以上两个问题

// 公有
function Pig(args) {
    "use strict";

    var private_name2 = 2;
    var self = this;
    /// 公有方法
    self.say = function () {
        self.name = "new name";
        console.log(" cat say" + self.name);
    };
}

Pig.prototype = Object.create(Animal.prototype);
Pig.prototype.constructor = function (args) {
    "use strict";
    Animal.call(this, args);
    Object.create(Animal.prototype); //继承
    console.log("create new pig:");
};



var kitty = new Cat({ "name": "kitty" });
var kitty2 = new Cat({ "name": "kitty2" });

var hachikou = new Dog({ "name": "hachikou" });
var hachikou2 = new Dog({ "name": "hachikou2" });

var PigA = new Pig({ "name": "pigA" });

console.log("Cat.say: " + (kitty.say === kitty2.say)); /// false
console.log("Dog.say: " + (hachikou.say === hachikou2.say)); /// true

console.log(hachikou.pname);
hachikou.pname = "hachikou2 pname";
console.log(hachikou.pname);
console.log(hachikou.pname === hachikou2.pname);

console.log("kitty instanceof Cat: " + (kitty instanceof Cat));
console.log("kitty2 instanceof Cat: " + (kitty2 instanceof Cat));
console.log("kitty instanceof Animal: " + (kitty instanceof Animal));
console.log("hachikou instanceof Dog: " + (hachikou instanceof Dog));
console.log("hachikou2 instanceof Dog: " + (hachikou2 instanceof Dog));
console.log("hachikou instanceof Animal: " + (hachikou instanceof Animal));
console.log("over");

/**
 * @ref： 
 * http://javascript.crockford.com/zh/private.html 私有
 * https://www.zhihu.com/question/23588490 weakmap?
 * http://metaduck.com/08-module-pattern-inheritance.html
 * 
 * http://www.objectplayground.com/
 */


/**
 * 面向对象的js,需要以下特性 ES5
 * 类
 * 私有属性
 * 私有方法
 * 公有属性
 * 公有方法
 * (静态方法)
 * 继承(单继承)
 * 构造函数（带参数）
 */