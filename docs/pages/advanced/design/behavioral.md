# 3.行为型模式(behavioral 11)

## 3.1 责任链模式(chain-of-resp)

-   使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。

```js
//购物车 商品 添加商品
function ShoppingCart() {
	this.products = []

	this.addProduct = function (p) {
		this.products.push(p)
	}
}
//折扣计算 看是否满足特定的折扣 形成链n->p->none 执行起始的exec 知道有返回
function Discount() {
	this.calc = function (products) {
		var ndiscount = new NumberDiscount()
		var pdiscount = new PriceDiscount()
		var none = new NoneDiscount()

		ndiscount.setNext(pdiscount)
		pdiscount.setNext(none)

		return ndiscount.exec(products)
	}
}

function NumberDiscount() {
	this.next = null
	this.setNext = function (fn) {
		this.next = fn
	}
	this.exec = function (products) {
		var result = 0
		if (products.length > 3) result = 0.05

		return (result += this.next.exec(products))
	}
}

function PriceDiscount() {
	this.next = null
	this.setNext = function (fn) {
		this.next = fn
	}
	this.exec = function (products) {
		var result = 0
		var total = products.reduce(function (a, b) {
			return a + b
		})
		if (total >= 500) {
			result = 0.1
		}
		return result + this.next.exec(products)
	}
}

function NoneDiscount() {
	this.exec = function () {
		return 0
	}
}

module.exports = [ShoppingCart, Discount]
```

```js
const expect = require('chai').expect
const [ShoppingCart, Discount] = require('../tmp')

describe('责任链模式 测试', () => {
	it('购物车金额 > $500', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(1000)
		let resp = discount.calc(sc.products)

		expect(resp).to.equal(0.1)
	})
	it('大于三个商品', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		let resp = discount.calc(sc.products)
		expect(resp).to.equal(0.05)
	})
	it('大于三个商品并且 >$500', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(1000)
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		let resp = discount.calc(sc.products)
		expect(resp.toFixed(2)).to.equal('0.15')
	})
})
```

es6 实现

```js
class ShoppingCart {
	constructor() {
		this.products = []
	}

	addProduct(p) {
		this.products.push(p)
	}
}

class Discount {
	calc(products) {
		let ndiscount = new NumberDiscount()
		let pdiscount = new PriceDiscount()
		let none = new NoneDiscount()
		ndiscount.setNext(pdiscount)
		pdiscount.setNext(none)
		return ndiscount.exec(products)
	}
}

class NumberDiscount {
	constructor() {
		this.next = null
	}

	setNext(fn) {
		this.next = fn
	}

	exec(products) {
		let result = 0
		if (products.length > 3) result = 0.05

		return result + this.next.exec(products)
	}
}

class PriceDiscount {
	constructor() {
		this.next = null
	}

	setNext(fn) {
		this.next = fn
	}

	exec(products) {
		let result = 0
		let total = products.reduce((a, b) => a + b)

		if (total >= 500) result = 0.1

		return result + this.next.exec(products)
	}
}

class NoneDiscount {
	exec() {
		return 0
	}
}

export { ShoppingCart, Discount }
```

```js
const expect = require('chai').expect
import { ShoppingCart, Discount } from '../tmp'

describe('责任链模式 es6测试', () => {
	it('购物车金额 > $500', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(1000)
		let resp = discount.calc(sc.products)

		expect(resp).to.equal(0.1)
	})
	it('大于三个商品', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		let resp = discount.calc(sc.products)
		expect(resp).to.equal(0.05)
	})
	it('大于三个商品并且 >$500', () => {
		const discount = new Discount()
		const sc = new ShoppingCart()
		sc.addProduct(1000)
		sc.addProduct(100)
		sc.addProduct(100)
		sc.addProduct(100)
		let resp = discount.calc(sc.products)
		expect(resp.toFixed(2)).to.equal('0.15')
	})
})
```

## 3.2 命令模式(command)

-   将来自客户端的请求传入一个对象，从而使你可用不同的请求对客户进行参数化。用于“行为请求者”与“行为实现者”解耦，可实现二者之间的松耦合，以便适应变化。分离变化与不变的因素。
-   请求以命令的形式包裹在对象中，并传给调用对象。调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。
-   定义三个角色
    -   Command 定义命令的接口，声明执行的方法。
        -   ConcreteCommand 命令接口实现对象，是“虚”的实现；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。
    -   Receiver 接收者，真正执行命令的对象。
    -   Invoker 使用对象命令的入口 调用者 - Client 创建具体的命令对象，并且设置命令对象的接收者。
        **整体流程** 定义三个角色,command 属于驾驶舱 receiver 属于涡轮 invoker 调用实际命令的入口；先创建具体的 receiver 将 receiver 传入到 invoker 调用者,最后 command 调用 invoker 处理对应的命令 执行,具体的状态 receiver 会发生变化

```js
//驾驶舱 接受命令 执行命令 command
function Cockpit(command) {
	this.command = command
}
Cockpit.prototype.execute = function () {
	this.command.execute()
}

//涡轮  操作有开 关 加速 减速 receiver 命令真正执行的对象
function Turbine() {
	this.state = false
	this.speed = 0
}
Turbine.prototype.on = function () {
	this.state = true
	this.speed = 100
}
Turbine.prototype.off = function () {
	this.state = false
	this.speed = 0
}
Turbine.prototype.speedDown = function () {
	if (!this.state) return
	this.speed -= 100
}
Turbine.prototype.speedUp = function () {
	if (!this.state) return
	this.speed += 100
}
//命令 操作开命令 调用turbine实例的开
// invoker 使用命令对象的入口
function OnCommand(turbine) {
	this.turbine = turbine
}
OnCommand.prototype.execute = function () {
	this.turbine.on()
}

function OffCommand(turbine) {
	this.turbine = turbine
}
OffCommand.prototype.execute = function () {
	this.turbine.off()
}

function SpeedUpCommand(turbine) {
	this.turbine = turbine
}
SpeedUpCommand.prototype.execute = function () {
	this.turbine.speedUp()
}

function SpeedDownCommand(turbine) {
	this.turbine = turbine
}
SpeedDownCommand.prototype.execute = function () {
	this.turbine.speedDown()
}

module.exports = [Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand]
```

```js
const expect = require('chai').expect
const [Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand] = require('../tmp')

describe('命令模式 测试', () => {
	it('开/关 测试', () => {
		//receiver 创建命令的具体对象 涡轮  真正命令执行的对象
		var turbine = new Turbine()
		//invoker 调用者 使用命令对象入口
		const onCommand = new OnCommand(turbine)
		//command 驾驶舱
		const cockpit = new Cockpit(onCommand)
		cockpit.execute()
		expect(turbine.state).to.be.true
	})
	it('加减速 测试', () => {
		//先开启后加速
		var turbine = new Turbine()
		const onCommand = new OnCommand(turbine)
		var cockpit = new Cockpit(onCommand)
		cockpit.execute()

		const speedUpCommand = new SpeedUpCommand(turbine)
		cockpit = new Cockpit(speedUpCommand)
		cockpit.execute()
		expect(turbine.speed).to.equal(200)
	})
})
```

es6 实现

```js
class Cockpit {
	constructor(command) {
		this.command = command
	}
	execute() {
		this.command.execute()
	}
}

class Turbine {
	constructor() {
		this.state = false
		this.speed = 0
	}
	on() {
		this.state = true
		this.speed = 100
	}
	off() {
		this.state = false
		this.speed = 0
	}
	speedDown() {
		if (!this.state) return
		this.speed -= 100
	}
	speedUp() {
		if (!this.state) return
		this.speed += 100
	}
}

class OnCommand {
	constructor(turbine) {
		this.turbine = turbine
	}
	execute() {
		this.turbine.on()
	}
}
class OffCommand {
	constructor(turbine) {
		this.turbine = turbine
	}
	execute() {
		this.turbine.off()
	}
}
class SpeedUpCommand {
	constructor(turbine) {
		this.turbine = turbine
	}
	execute() {
		this.turbine.speedUp()
	}
}
class SpeedDownCommand {
	constructor(turbine) {
		this.turbine = turbine
	}
	execute() {
		this.turbine.speedDown()
	}
}

export { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand }
```

```js
const expect = require('chai').expect
import { Cockpit, Turbine, OffCommand, OnCommand, SpeedDownCommand, SpeedUpCommand } from '../tmp'

describe('命令模式 es6测试', () => {
	it('开/关 测试', () => {
		//receiver 创建命令的具体对象 涡轮  真正命令执行的对象
		var turbine = new Turbine()
		//invoker 调用者 使用命令对象入口
		const onCommand = new OnCommand(turbine)
		//command 驾驶舱
		const cockpit = new Cockpit(onCommand)
		cockpit.execute()
		expect(turbine.state).to.be.true
	})
	it('加减速 测试', () => {
		//先开启后加速
		var turbine = new Turbine()
		const onCommand = new OnCommand(turbine)
		var cockpit = new Cockpit(onCommand)
		cockpit.execute()

		const speedUpCommand = new SpeedUpCommand(turbine)
		cockpit = new Cockpit(speedUpCommand)
		cockpit.execute()
		expect(turbine.speed).to.equal(200)
	})
})
```

## 3.3 解释器模式(interpreter)

-   给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。

```js
function Sum(left, right) {
	this.left = left
	this.right = right
}
Sum.prototype.interpret = function () {
	return this.left.interpret() + this.right.interpret()
}

function Min(left, right) {
	this.left = left
	this.right = right
}

Min.prototype.interpret = function () {
	return this.left.interpret() - this.right.interpret()
}

function Num(val) {
	this.val = val
}
Num.prototype.interpret = function () {
	return this.val
}

module.exports = [Num, Min, Sum]
```

```js
const expect = require('chai').expect
const [Num, Min, Sum] = require('../tmp')

describe('解释器模式 测试', () => {
	it('加', () => {
		var result = new Sum(new Num(100), new Min(new Num(100), new Num(50)))

		expect(result.interpret()).to.equal(150)
	})
})
```

es6 实现

```js
class Sum {
	constructor(left, right) {
		this.left = left
		this.right = right
	}
	interpret() {
		return this.left.interpret() + this.right.interpret()
	}
}
class Min {
	constructor(left, right) {
		this.left = left
		this.right = right
	}
	interpret() {
		return this.left.interpret() - this.right.interpret()
	}
}
class Num {
	constructor(val) {
		this.val = val
	}
	interpret() {
		return this.val
	}
}

export { Num, Min, Sum }
```

```js
const expect = require('chai').expect
import { Num, Min, Sum } from '../tmp'

describe('解释器模式 es6测试', () => {
	it('加', () => {
		var result = new Sum(new Num(100), new Min(new Num(100), new Num(50)))

		expect(result.interpret()).to.equal(150)
	})
})
```

## 3.4 迭代器模式(iterator)

-   提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示。

```js
function Iterator(el) {
	this.index = 0
	this.elements = el
}

Iterator.prototype = {
	next: function () {
		return this.elements[this.index++]
	},
	hasNext: function () {
		return this.index < this.elements.length
	}
}

module.exports = Iterator
```

```js
const expect = require('chai').expect
const Iterator = require('../tmp')

describe('迭代器模式 测试', () => {
	it('遍历', () => {
		test(Iterator)
	})
})

function test(Iterator) {
	var numbers = new Iterator([1, 2, 3])
	expect(numbers.next()).to.equal(1)
	expect(numbers.next()).to.equal(2)
	expect(numbers.next()).to.equal(3)
	expect(numbers.hasNext()).to.false
}
```

es6 实现

```js
class Iterator {
	constructor(el) {
		this.index = 0
		this.elements = el
	}
	next() {
		return this.elements[this.index++]
	}

	hasNext() {
		return this.index < this.elements.length
	}
}

export { Iterator }
```

```js
const expect = require('chai').expect
import { Iterator } from '../tmp'

describe('迭代器模式 es6测试', () => {
	it('遍历', () => {
		test(Iterator)
	})
})

function test(Iterator) {
	var numbers = new Iterator([1, 2, 3])
	expect(numbers.next()).to.equal(1)
	expect(numbers.next()).to.equal(2)
	expect(numbers.next()).to.equal(3)
	expect(numbers.hasNext()).to.false
}
```

## 3.5 中介者模式(mediator)

-   是用来降低多个对象和类之间的通信复杂性。
-   用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
-   MVC 框架，其中 C（控制器）就是 M（模型）和 V（视图）的中介者。

```js
// 塔台 请求位置
function TrafficTower() {
	this.airplanes = []
}
TrafficTower.prototype.requestPositions = function () {
	return this.airplanes.map(function (airplane) {
		return airplane.position
	})
}
// 飞机 位置 塔台
function Airplane(position, trafficTower) {
	this.position = position
	this.trafficTower = trafficTower
	this.trafficTower.airplanes.push(this)
}
Airplane.prototype.requestPositions = function () {
	return this.trafficTower.requestPositions()
}

module.exports = [TrafficTower, Airplane]
```

```js
const expect = require('chai').expect
const [TrafficTower, Airplane] = require('../tmp')

describe('中介者模式 测试', () => {
	it('塔台', () => {
		var trafficTower = new TrafficTower()
		var boeing1 = new Airplane(10, trafficTower)
		var boeing2 = new Airplane(15, trafficTower)
		var boeing3 = new Airplane(55, trafficTower)
		expect(boeing1.requestPositions()).to.deep.equals([10, 15, 55])
	})
})
```

es6 实现

```js
class TrafficTower {
	constructor() {
		this.airplanes = []
	}

	requestPositions() {
		return this.airplanes.map(airplane => {
			return airplane.position
		})
	}
}

class Airplane {
	constructor(position, trafficTower) {
		this.position = position
		this.trafficTower = trafficTower
		this.trafficTower.airplanes.push(this)
	}

	requestPositions() {
		return this.trafficTower.requestPositions()
	}
}

export { TrafficTower, Airplane }
```

```js
const expect = require('chai').expect
import { TrafficTower, Airplane } from '../tmp'

describe('中介者模式 es6测试', () => {
	it('塔台', () => {
		const trafficTower = new TrafficTower()
		const boeing1 = new Airplane(10, trafficTower)
		const boeing2 = new Airplane(15, trafficTower)
		const boeing3 = new Airplane(55, trafficTower)
		expect(boeing1.requestPositions()).to.deep.equals([10, 15, 55])
	})
})
```

## 3.6 备忘录模式(memento)

-   保存一个对象的某个状态，以便在适当的时候恢复对象。
-   在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。

```js
function Memento(value) {
	this.value = value
}
//创始者
var originator = {
	store: function (val) {
		return new Memento(val)
	},
	restore: function (memento) {
		return memento.value
	}
}
// 守护者看门的
function Caretaker() {
	this.values = []
}

Caretaker.prototype.addMemento = function (memento) {
	this.values.push(memento)
}

Caretaker.prototype.getMemento = function (index) {
	return this.values[index]
}

module.exports = [originator, Caretaker]
```

```js
const expect = require('chai').expect
const [originator, Caretaker] = require('../tmp')

describe('备忘录模式 测试', () => {
	it('看门的', () => {
		var careTaker = new Caretaker()
		careTaker.addMemento(originator.store('hello'))
		careTaker.addMemento(originator.store('hello world'))
		careTaker.addMemento(originator.store('hello world !!!'))
		var result = originator.restore(careTaker.getMemento(1))
		expect(result).to.equal('hello world')
	})
})
```

es6 实现

```js
class Memento {
	constructor(value) {
		this.value = value
	}
}

const originator = {
	store: function (val) {
		return new Memento(val)
	},
	restore: function (memento) {
		return memento.value
	}
}

class Caretaker {
	constructor() {
		this.values = []
	}

	addMemento(memento) {
		this.values.push(memento)
	}

	getMemento(index) {
		return this.values[index]
	}
}

export { originator, Caretaker }
```

```js
const expect = require('chai').expect
import { Caretaker, originator } from '../tmp'

describe('备忘录模式 es6测试', () => {
	it('看门的', () => {
		var careTaker = new Caretaker()
		careTaker.addMemento(originator.store('hello'))
		careTaker.addMemento(originator.store('hello world'))
		careTaker.addMemento(originator.store('hello world !!!'))
		var result = originator.restore(careTaker.getMemento(1))
		expect(result).to.equal('hello world')
	})
})
```

## 3.7 观察者模式(observer)

-   定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

```js
//定义对象价格 收集订阅者
function Product() {
	this.price = 0
	this.actions = []
}
// 每次价格改变 通知订阅者
Product.prototype.setBasePrice = function (val) {
	this.price = val
	this.notifyAll()
}
// 订阅
Product.prototype.register = function (observer) {
	this.actions.push(observer)
}
// 取消订阅
Product.prototype.unregister = function (observer) {
	this.actions = this.actions.filter(function (el) {
		return el !== observer
	})
}
// 通知所有的依赖进行更新
Product.prototype.notifyAll = function () {
	return this.actions.forEach(
		function (el) {
			el.update(this)
		}.bind(this)
	)
}

var fees = {
	update: function (product) {
		product.price = product.price * 1.2
	}
}

var proft = {
	update: function (product) {
		product.price = product.price * 2
	}
}

module.exports = [Product, fees, proft]
```

```js
const expect = require('chai').expect
const [Product, fees, proft] = require('../tmp')
/**
 * @describe 注册变量
 * @param {*} p 商品
 * @param {*} f 费用
 * @param {*} t
 * @returns
 */
function register(p, f, t) {
	p.register(f)
	p.register(t)
	return p
}

describe('观察者模式 测试', () => {
	it('订阅者触发', () => {
		let product = register(new Product(), fees, proft)
		product.setBasePrice(100)
		expect(product.price).to.equal(240)
	})
	it('取消一个订阅', () => {
		let product = register(new Product(), fees, proft)
		product.unregister(proft)

		product.setBasePrice(100)
		expect(product.price).to.equal(120)
	})
})
```

es6 实现

```js
class Product {
	constructor() {
		this.price = 0
		this.actions = []
	}
	setBasePrice(val) {
		this.price = val
		this.notifyAll()
	}
	register(observer) {
		this.actions.push(observer)
	}
	unregister(observer) {
		this.actions = this.actions.filter(el => !(el instanceof observer))
	}
	notifyAll() {
		return this.actions.forEach(el => el.update(this))
	}
}

class Fees {
	update(product) {
		product.price = product.price * 1.2
	}
}

class Proft {
	update(product) {
		product.price = product.price * 2
	}
}

export { Product, Fees, Proft }
```

```js
const expect = require('chai').expect
import { Product, Fees, Proft } from '../tmp'
/**
 * @describe 注册变量
 * @param {*} p 商品
 * @param {*} f 费用
 * @param {*} t
 * @returns
 */
function register(p, f, t) {
	p.register(f)
	p.register(t)
	return p
}

describe('观察者模式 es6测试', () => {
	it('订阅者触发', () => {
		let product = register(new Product(), new Fees(), new Proft())
		product.setBasePrice(100)
		expect(product.price).to.equal(240)
	})
	it('取消一个订阅', () => {
		let product = register(new Product(), new Fees(), new Proft())
		product.unregister(Proft)

		product.setBasePrice(100)
		expect(product.price).to.equal(120)
	})
})
```

## 3.8 状态模式(state)

-   允许对象在内部状态发生改变时改变它的行为，对象看起来好像修改了它的类。
    -   我们创建表示各种状态的对象和一个行为随着状态对象改变而改变的 context 对象。

```js
// 一个行为随着状态改变而改变的context对象
function Order() {
	this.state = new WaitingForPayment()

	this.nextState = function () {
		this.state = this.state.next()
	}
}
//创建各种状态的对象
function WaitingForPayment() {
	this.name = 'waitingForPayment'
	this.next = function () {
		return new Shipping()
	}
}

function Shipping() {
	this.name = 'shipping'
	this.next = function () {
		return new Delivered()
	}
}

function Delivered() {
	this.name = 'delivered'
	this.next = function () {
		return this
	}
}

module.exports = Order
```

```js
const expect = require('chai').expect
const Order = require('../tmp')

describe('状态模式 测试', () => {
	it('订单', () => {
		var order = new Order()
		expect(order.state.name).to.equal('waitingForPayment')
		order.nextState()
		expect(order.state.name).to.equal('shipping')
		order.nextState()
		expect(order.state.name).to.equal('delivered')
	})
})
```

es6 实现

```js
// 一个行为随着状态改变而改变的context对象
class Order {
	constructor() {
		this.state = new WaitingForPayment()
	}
	nextState() {
		this.state = this.state.next()
	}
}

// 抽象类
class OrderStatus {
	constructor(name, nextStatus) {
		this.name = name
		this.nextStatus = nextStatus
	}
	next() {
		return new this.nextStatus()
	}
}

//创建各种状态的对象
class WaitingForPayment extends OrderStatus {
	constructor() {
		super('waitingForPayment', Shipping)
	}
}
class Shipping extends OrderStatus {
	constructor() {
		super('shipping', Delivered)
	}
}
class Delivered extends OrderStatus {
	constructor() {
		super('delivered', Delivered)
	}
}

export { Order }
```

```js
const expect = require('chai').expect
import { Order } from '../tmp'

describe('状态模式 es6测试', () => {
	it('订单', () => {
		var order = new Order()
		expect(order.state.name).to.equal('waitingForPayment')
		order.nextState()
		expect(order.state.name).to.equal('shipping')
		order.nextState()
		expect(order.state.name).to.equal('delivered')
	})
})
```

## 3.9 策略模式(strategy)

-   一个类的行为或其算法可以在运行时更改。
    -   创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法。
    -   定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。

```js
// 策略对象 discount对应不同的折扣算法
function ShoppingCart(discount) {
	this.discount = discount
	this.amount = 0
}
ShoppingCart.prototype.setAmount = function (amount) {
	this.amount = amount
}
ShoppingCart.prototype.checkout = function () {
	return this.discount(this.amount)
}
// 策略算法
function guestStrategy(amount) {
	return amount
}

function regularStrategy(amount) {
	return amount * 0.9
}

function premiumStrategy(amount) {
	return amount * 0.8
}

module.exports = [ShoppingCart, guestStrategy, regularStrategy, premiumStrategy]
```

```js
const expect = require('chai').expect
const [ShoppingCart, guestStrategy, regularStrategy, premiumStrategy] = require('../tmp')

describe('策略模式 测试', () => {
	it('客人购物折扣', () => {
		var guestCart = new ShoppingCart(guestStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(100)
	})
	it('常规折扣', () => {
		var guestCart = new ShoppingCart(regularStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(90)
	})
	it('赠品折扣', () => {
		var guestCart = new ShoppingCart(premiumStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(80)
	})
})
```

es6 实现

```js
// 策略对象 discount对应不同的折扣算法
class ShoppingCart {
	constructor(discount) {
		this.discount = discount
		this.amount = 0
	}
	setAmount(amount) {
		this.amount = amount
	}
	checkout() {
		return this.discount(this.amount)
	}
}

// 策略算法

function guestStrategy(amount) {
	return amount
}

function regularStrategy(amount) {
	return amount * 0.9
}

function premiumStrategy(amount) {
	return amount * 0.8
}

export { ShoppingCart, guestStrategy, regularStrategy, premiumStrategy }
```

```js
const expect = require('chai').expect
import { ShoppingCart, guestStrategy, regularStrategy, premiumStrategy } from '../tmp'

describe('策略模式 es6测试', () => {
	it('客人购物折扣', () => {
		var guestCart = new ShoppingCart(guestStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(100)
	})
	it('常规折扣', () => {
		var guestCart = new ShoppingCart(regularStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(90)
	})
	it('赠品折扣', () => {
		var guestCart = new ShoppingCart(premiumStrategy)
		guestCart.setAmount(100)
		expect(guestCart.checkout()).to.equal(80)
	})
})
```

## 3.10 模板方法模式(template)

-   一个抽象类公开定义了执行它的方法的方式/模板。它的子类可以按需要重写方法实现，但调用将以抽象类中定义的方式进行。
    -   定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
    -   解决一些方法通用，却在每一个子类都重新写了这一方法。

```js
// 定义一个抽象类
function Tax() {}
Tax.prototype.calc = function (value) {
	if (value >= 1000) value = this.overThousand(value)
	return this.complementaryFee(value)
}
Tax.prototype.complementaryFee = function (value) {
	return value + 10
}

// 子类重写方法 针对value>=1000的值 每个子类需要重写overThousand方法
function Tax1() {}
Tax1.prototype = Object.create(Tax.prototype)
Tax1.prototype.overThousand = function (value) {
	return value * 1.1
}

function Tax2() {}
Tax2.prototype = Object.create(Tax.prototype)
Tax2.prototype.overThousand = function (value) {
	return value * 1.2
}

module.exports = [Tax1, Tax2]
```

```js
const expect = require('chai').expect
const [Tax1, Tax2] = require('../tmp')

describe('模板模式 测试', () => {
	it('税', () => {
		var tax1 = new Tax1()
		var tax2 = new Tax2()

		expect(tax1.calc(1000)).to.equal(1110)
		expect(tax2.calc(1000)).to.equal(1210)
		expect(tax2.calc(100)).to.equal(110)
	})
})
```

es6 实现

```js
// 定义一个抽象类
class Tax {
	calc(value) {
		if (value >= 1000) value = this.overThousand(value)
		return this.complementaryFee(value)
	}
	complementaryFee(value) {
		return value + 10
	}
}

// 子类重写方法 针对value>=1000的值 每个子类需要重写overThousand方法
class Tax1 extends Tax {
	constructor() {
		super()
	}
	overThousand(value) {
		return value * 1.1
	}
}
class Tax2 extends Tax {
	constructor() {
		super()
	}
	overThousand(value) {
		return value * 1.2
	}
}
export { Tax1, Tax2 }
```

```js
const expect = require('chai').expect
import { Tax1, Tax2 } from '../tmp'

describe('模板模式 es6测试', () => {
	it('税', () => {
		const tax1 = new Tax1()
		const tax2 = new Tax2()

		expect(tax1.calc(1000)).to.equal(1110)
		expect(tax2.calc(1000)).to.equal(1210)
		expect(tax2.calc(100)).to.equal(110)
	})
})
```

## 3.11 访问者模式(visitor)

-   使用了一个访问者类，它改变了元素类的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。
    -   根据模式，元素对象已接受访问者对象，这样访问者对象就可以处理元素对象上的操作。
    -   主要将数据结构与数据操作分离。

```js
//定义一个访问者类  内部改变元素类的执行方法 奖励访问者 员工
function bonusVisitor(employee) {
	if (employee instanceof Manager) {
		employee.bonus = employee.salary * 2
	}
	if (employee instanceof Developer) {
		employee.bonus = employee.salary
	}
}
//在数据基础类里面有一个方法接受访问者，将自身引用传入访问者。
function Employee() {
	this.bonus = 0
}
Employee.prototype.accept = function (visitor) {
	visitor(this)
}

// 被访问者
function Manager(salary) {
	this.salary = salary
}
Manager.prototype = Object.create(Employee.prototype)

function Developer(salary) {
	this.salary = salary
}
Developer.prototype = Object.create(Employee.prototype)

module.exports = [Developer, Manager, bonusVisitor]
```

```js
const expect = require('chai').expect
const [Developer, Manager, bonusVisitor] = require('../tmp')

describe('访问者模式 测试', () => {
	it('奖金', () => {
		//流程 就是定义一个基础类 Employee 定义奖金和accept方法
		//-> 被访问者继承基础类 自身有薪水
		//-> 访问者通过 被访问者传入的信息，判断对应的奖金
		var employees = []

		var john = new Developer(4000)
		var maria = new Developer(4000)
		var christian = new Manager(10000)

		employees.push(john)
		employees.push(maria)
		employees.push(christian)

		employees.forEach(e => {
			e.accept(bonusVisitor)
		})
		expect(john.bonus).to.equal(4000)
		expect(christian.bonus).to.equal(20000)
	})
})
```

es6 实现

```js
//定义一个访问者类  内部改变元素类的执行方法 奖励访问者 员工
function bonusVisitor(employee) {
	if (employee instanceof Manager) {
		employee.bonus = employee.salary * 2
	}
	if (employee instanceof Developer) {
		employee.bonus = employee.salary
	}
}
//在数据基础类里面有一个方法接受访问者，将自身引用传入访问者。
class Employee {
	constructor(salary) {
		this.bonus = 0
		this.salary = salary
	}
	accept(visitor) {
		visitor(this)
	}
}
// 被访问者
class Manager extends Employee {
	constructor(salary) {
		super(salary)
	}
}

class Developer extends Employee {
	constructor(salary) {
		super(salary)
	}
}
export { Developer, Manager, bonusVisitor }
```

```js
const expect = require('chai').expect
import { Developer, Manager, bonusVisitor } from '../tmp'

describe('访问者模式 es6测试', () => {
	it('奖金', () => {
		//流程 就是定义一个基础类 Employee 定义奖金和accept方法
		//-> 被访问者继承基础类 自身有薪水
		//-> 访问者通过 被访问者传入的信息，判断对应的奖金
		let employees = []

		const john = new Developer(4000)
		const maria = new Developer(4000)
		const christian = new Manager(10000)

		employees.push(john)
		employees.push(maria)
		employees.push(christian)

		employees.forEach(e => {
			e.accept(bonusVisitor)
		})

		expect(john.bonus).to.equal(4000)
		expect(christian.bonus).to.equal(20000)
	})
})
```
