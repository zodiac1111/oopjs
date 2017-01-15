function Animal(args) {
    var self = this;
    var isLive = true;
    self.who = args.name || "animal";
    console.log("create Animal");
    self.run = function() {
        console.log("Animal run");
    }
}

function foo() {
    console.log("foo");
}

function Cat(args) {
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
    self.say = function() {
        self.name = "new name";
        console.log(" cat say" + self.name);
    };
}

/// 原型法
function Dog(args) {
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
Dog.prototype.say = function() {
    this.name = "new name";
    console.log("dog say :" + this.name);
}


/// ============ Douglas Crockford 有一个模式叫“Module Pattern”可以解决以上两个问题

// 构造函数
function Pig(args) {
    Animal.call(this, args);
    Object.create(Animal.prototype); //继承
    console.log("create new pig:" + args.name);

    private_name = 2;
}
Pig.prototype = function() {
    // private variables
    var private_name = "uname pig";

    // private method
    function jump() {
        console.log("pig jump:");
    }

    // public
    return {
        // public variables
        myname: private_name,
        // public  method
        say: function(args) {
            myname = args || private_name;
            console.log("dog say :" + myname);
            console.log("dog say  private_name :" + private_name);
        }
    };
}();


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
console.log(hachikou.pname == hachikou2.pname)
console.log("over");

/**
 * @ref： 
 * http://javascript.crockford.com/zh/private.html 私有
 * https://www.zhihu.com/question/23588490 weakmap?
 * http://metaduck.com/08-module-pattern-inheritance.html
 */


/**
 * 面向对象的js,需要以下特性 ES5
 * 类
 * 私有属性
 * 私有方法
 * 公有属性
 * 公有方法
 * (静态方法)
 * 继承
 * 构造函数（带参数）
 */