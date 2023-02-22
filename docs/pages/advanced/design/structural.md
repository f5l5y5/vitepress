# 2.结构型模式(structural 7)

## 2.1 适配器模式(adapter)

-   将一个类的接口转换成客户希望的另外一个接口。Adapter 模式使得原本由于接口不兼容而不能一起工作的那些类可以在一起工作。

```js
function Soldier(lvl) {
	this.lvl = lvl
}
//士兵攻击1
Soldier.prototype.attack = function () {
	return this.lvl * 1
}

function Jedi(lvl) {
	this.lvl = lvl
}
//用剑100
Jedi.prototype.attackWithSaber = function () {
	return this.lvl * 100
}

// 创建适配器 传入不同的对象 攻击不同
// 需要将Jedi的attackWithSaber 适配成 attack
function JediAdapter(jedi) {
	this.jedi = jedi
}

JediAdapter.prototype.attack = function () {
	return this.jedi.attackWithSaber()
}

module.exports = [Soldier, Jedi, JediAdapter]
```

```js
const expect = require('chai').expect
const [Soldier, Jedi, JediAdapter] = require('../tmp')

describe('适配器 测试', () => {
	it('攻击', () => {
		var stormrooper = new Soldier(1)
		var yoda = new JediAdapter(new Jedi(10))
		expect(yoda.attack()).to.equal(stormrooper.attack() * 1000)
	})
})
```

es6 实现

```js
class Soldier {
	constructor(level) {
		this.level = level
	}

	attack() {
		return this.level * 1
	}
}

class Jedi {
	constructor(level) {
		this.level = level
	}

	attackWithSaber() {
		return this.level * 100
	}
}

class JediAdapter {
	constructor(jedi) {
		this.jedi = jedi
	}

	attack() {
		return this.jedi.attackWithSaber()
	}
}
export { Soldier, Jedi, JediAdapter }
```

```js
const expect = require('chai').expect
import { Soldier, Jedi, JediAdapter } from '../tmp'

describe('适配器 es6测试', () => {
	it('攻击', () => {
		var stormrooper = new Soldier(1)
		var yoda = new JediAdapter(new Jedi(10))
		expect(yoda.attack()).to.equal(stormrooper.attack() * 1000)
	})
})
```

## 2.2 装饰者模式(decorator)

-   动态给一个对象添加一些额外的职责,就象在墙上刷油漆.使用 Decorator 模式相比用生成子类方式达到功能的扩充显得更为灵活。
-   设计初衷:通常可以使用继承来实现功能的拓展,如果这些需要拓展的功能的种类很繁多,那么势必生成很多子类,增加系统的复杂性,同时,使用继承实现功能拓展,我们必须可预见这些拓展功能,这些功能是编译时就确定了,是静态的。

```js
// 意大利面价格
function Pasta() {
	this.price = 0
}
Pasta.prototype.getPrice = function () {
	return this.price
}
// 意面
function Penne() {
	this.price = 8
}
Penne.prototype = Object.create(Pasta.prototype)

//调味汁
function SauceDecorator(pasta) {
	this.pasta = pasta
}
SauceDecorator.prototype.getPrice = function () {
	return this.pasta.getPrice() + 5
}

//奶酪
function CheeseDecorator(pasta) {
	this.pasta = pasta
}
CheeseDecorator.prototype.getPrice = function () {
	return this.pasta.getPrice() + 3
}

module.exports = [Penne, SauceDecorator, CheeseDecorator]
```

```js
const expect = require('chai').expect
const [Penne, SauceDecorator, CheeseDecorator] = require('../tmp')

describe('装饰模式测试', () => {
	it('装饰', () => {
		//每次new 添加新的装饰
		var penne = new Penne()
		var penneWithSauce = new SauceDecorator(penne)
		var panneWithSauceAndCheese = new CheeseDecorator(penneWithSauce)

		expect(penne.getPrice()).to.equal(8)
		expect(penneWithSauce.getPrice()).to.equal(13)
		expect(panneWithSauceAndCheese.getPrice()).to.equal(16)
	})
})
```

es6 实现

```js
class Pasta {
	constructor() {
		this.price = 0
	}
	getPrice() {
		return this.price
	}
}

class Penne extends Pasta {
	constructor() {
		super()
		this.price = 8
	}
}

class PastaDecorator extends Pasta {
	constructor(pasta) {
		super()
		this.pasta = pasta
	}
	getPrice() {
		return this.pasta.getPrice()
	}
}

class SauceDecorator extends PastaDecorator {
	constructor(pasta) {
		super(pasta)
	}
	getPrice() {
		return super.getPrice() + 5
	}
}

class CheeseDecorator extends PastaDecorator {
	constructor(pasta) {
		super(pasta)
	}
	getPrice() {
		return super.getPrice() + 3
	}
}

export { Penne, SauceDecorator, CheeseDecorator }
```

```js
const expect = require('chai').expect
import { Penne, SauceDecorator, CheeseDecorator } from '../tmp'

describe('装饰模式 es6测试', () => {
	it('装饰', () => {
		//每次new 添加新的装饰
		var penne = new Penne()
		var penneWithSauce = new SauceDecorator(penne)
		var panneWithSauceAndCheese = new CheeseDecorator(penneWithSauce)

		expect(penne.getPrice()).to.equal(8)
		expect(penneWithSauce.getPrice()).to.equal(13)
		expect(panneWithSauceAndCheese.getPrice()).to.equal(16)
	})
})
```

## 2.3 代理模式(proxy)

-   对一些对象提供代理，以限制那些对象去访问其它对象。

```js
function Car() {
	this.drive = function () {
		return 'driving'
	}
}

function CarProxy(driver) {
	this.driver = driver
	this.drive = function () {
		if (driver.age < 18) return 'too young to drive'
		return new Car().drive()
	}
}

function Driver(age) {
	this.age = age
}

module.exports = [Car, CarProxy, Driver]
```

```js
const expect = require('chai').expect
const [Car, CarProxy, Driver] = require('../tmp')

describe('代理模式测试', () => {
	it('驾驶', () => {
		var driver = new Driver(20)
		var kid = new Driver(16)

		var car = new CarProxy(driver)
		expect(car.drive()).to.equal('driving')

		car = new CarProxy(kid)
		expect(car.drive()).to.equal('too young to drive')
	})
})
```

es6 实现

```js
class Car {
	drive() {
		return 'driving'
	}
}

class CarProxy {
	constructor(driver) {
		this.driver = driver
	}
	drive() {
		return this.driver.age < 18 ? 'too young to drive' : new Car().drive()
	}
}

class Driver {
	constructor(age) {
		this.age = age
	}
}

export { Car, CarProxy, Driver }
```

```js
const expect = require('chai').expect
import { Car, CarProxy, Driver } from '../tmp'

describe('代理模式 es6测试', () => {
	it('驾驶', () => {
		let driver = new Driver(28)
		let kid = new Driver(10)

		let car = new CarProxy(driver)
		expect(car.drive()).to.equal('driving')

		car = new CarProxy(kid)
		expect(car.drive()).to.equal('too young to drive')
	})
})
```

## 2.4 外观模式(facade)

-   设置一个门面,处理各种事务

```js
var shopFacade = {
	calc: function (price) {
		price = discount(price)
		price = fees(price)
		price += shipping()
		return price
	}
}
function discount(value) {
	return value * 0.9
}
function shipping(value) {
	return 5
}
function fees(value) {
	return value * 1.05
}
module.exports = shopFacade
```

```js
const expect = require('chai').expect
const shopFacade = require('../tmp')

describe('外观模式测试', () => {
	it('购物', () => {
		var result = shopFacade.calc(100)

		expect(result).to.equal(99.5)
	})
})
```

es6 实现

```js
class ShopFacade {
	constructor(price) {
		this.discount = new Discount()
		this.shipping = new Shipping()
		this.fees = new Fees()
	}
	calc(price) {
		price = this.discount.calc(price)
		price = this.fees.calc(price)
		price += this.shipping.calc()
		return price
	}
}

class Discount {
	calc(value) {
		return value * 0.9
	}
}

class Shipping {
	calc() {
		return 5
	}
}
class Fees {
	calc(value) {
		return value * 1.05
	}
}
export default ShopFacade
```

```js
const expect = require('chai').expect
import ShopFacade from '../tmp'

describe('外观模式 es6测试', () => {
	it('购物', () => {
		const shop = new ShopFacade()
		const result = shop.calc(100)

		expect(result).to.equal(99.5)
	})
})
```

## 2.5 桥接模式(bridge)

-   通过组合的方式建立两个类之间的联系,而不是继承。将抽 象和实现解耦，让它们可以独立变化。

```js
// 将基础什么材料生产的进行说明
function EpsonPrinter(ink) {
	this.ink = ink()
}
EpsonPrinter.prototype.print = function () {
	return 'Printer: Epson, Ink: ' + this.ink
}

function HPprinter(ink) {
	this.ink = ink()
}
HPprinter.prototype.print = function () {
	return 'Printer: HP, Ink: ' + this.ink
}
// 基于丙烯酸
function acrylicInk() {
	return 'acrylic-based'
}
//基于活性炭
function alcoholInk() {
	return 'alcohol-based'
}

module.exports = [EpsonPrinter, HPprinter, acrylicInk, alcoholInk]
```

```js
const expect = require('chai').expect
const [EpsonPrinter, HPprinter, acrylicInk, alcoholInk] = require('../tmp')

describe('桥接模式测试', () => {
	it('爱普生打印机', () => {
		const printer = new EpsonPrinter(alcoholInk)
		const result = printer.print()

		expect(result).to.equal('Printer: Epson, Ink: alcohol-based')
	})
	it('惠普打印机', () => {
		const printer = new HPprinter(acrylicInk)
		const result = printer.print()

		expect(result).to.equal('Printer: HP, Ink: acrylic-based')
	})
})
```

es6 实现

```js
class Printer {
	constructor(ink) {
		this.ink = ink
	}
}

class EpsonPrinter extends Printer {
	constructor(ink) {
		super(ink)
	}
	print() {
		return 'Printer: Epson, Ink: ' + this.ink.get()
	}
}

class HPprinter extends Printer {
	constructor(ink) {
		super(ink)
	}
	print() {
		return 'Printer: HP, Ink: ' + this.ink.get()
	}
}

class Ink {
	constructor(type) {
		this.type = type
	}
	get() {
		return this.type
	}
}

class AcrylicInk extends Ink {
	constructor() {
		super('acrylic-based')
	}
}
class AlcoholInk extends Ink {
	constructor() {
		super('alcohol-based')
	}
}

export { EpsonPrinter, HPprinter, AcrylicInk, AlcoholInk }
```

```js
const expect = require('chai').expect
import { EpsonPrinter, HPprinter, AcrylicInk, AlcoholInk } from '../tmp'

describe('桥接模式 es6测试', () => {
	it('爱普生打印机', () => {
		const printer = new EpsonPrinter(new AlcoholInk())
		const result = printer.print()

		expect(result).to.equal('Printer: Epson, Ink: alcohol-based')
	})
	it('惠普打印机', () => {
		const printer = new HPprinter(new AcrylicInk())
		const result = printer.print()

		expect(result).to.equal('Printer: HP, Ink: acrylic-based')
	})
})
```

## 2.6 组合模式(composite)

-   将对象组合成树形结构以表示‘部分-整体’的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。
-   例如 办了一张永辉超市充值卡 它可以在任何门店进行消费 组合抽象类-leaf-composite

```js
//组合抽象类
function EquipmentComposition(name) {
	this.equipments = []
	this.name = name
}

EquipmentComposition.prototype.add = function (equipment) {
	this.equipments.push(equipment)
}

EquipmentComposition.prototype.getPrice = function () {
	return this.equipments
		.map(function (equipment) {
			return equipment.getPrice()
		})
		.reduce(function (a, b) {
			return a + b
		})
}

// 设备
function Equipment() {}
Equipment.prototype.getPrice = function () {
	return this.price
}

// --leaf
//软盘
function FloppyDisk() {
	this.name = 'Floppy Disk'
	this.price = 70
}
FloppyDisk.prototype = Object.create(Equipment.prototype)

//硬盘
function HardDrive() {
	this.name = 'Hard Drive'
	this.price = 250
}
HardDrive.prototype = Object.create(Equipment.prototype)
//内存
function Memory() {
	this.name = '8gb memory'
	this.price = 280
}
Memory.prototype = Object.create(Equipment.prototype)

module.exports = [EquipmentComposition, FloppyDisk, HardDrive, Memory]
```

```js
const expect = require('chai').expect
const [EquipmentComposition, FloppyDisk, HardDrive, Memory] = require('../tmp')

describe('组合模式 测试', () => {
	it('机箱添加硬件 获取总价', () => {
		var cabinet = new EquipmentComposition('cabinet')
		cabinet.add(new FloppyDisk())
		cabinet.add(new HardDrive())
		cabinet.add(new Memory())

		expect(cabinet.getPrice()).to.equal(600)
	})
})
```

es6 实现

```js
//组合抽象类
class Equipment {
	getPrice() {
		return this.price || 0
	}
	getName() {
		return this.name
	}
	setName(name) {
		this.name = name
	}
}

// composite
class Composite extends Equipment {
	constructor() {
		super()
		this.equipments = []
	}
	add(equipment) {
		this.equipments.push(equipment)
	}
	getPrice() {
		return this.equipments
			.map(equipment => {
				return equipment.getPrice()
			})
			.reduce((a, b) => {
				return a + b
			})
	}
}

class Cabinet extends Composite {
	constructor() {
		super()
		this.setName('cabinet')
	}
}

// --leaf
class FloppyDisk extends Equipment {
	constructor() {
		super()
		this.setName('Floppy Disk')
		this.price = 70
	}
}

class HardDrive extends Equipment {
	constructor() {
		super()
		this.setName('Hard Drive')
		this.price = 250
	}
}

class Memory extends Equipment {
	constructor() {
		super()
		this.setName('Memory')
		this.price = 280
	}
}
export { Cabinet, FloppyDisk, HardDrive, Memory }
```

```js
const expect = require('chai').expect
import { Cabinet, FloppyDisk, HardDrive, Memory } from '../tmp'

describe('组合模式 es6测试', () => {
	it('设备添加硬件 获取总价', () => {
		var cabinet = new Cabinet('cabinet')
		cabinet.add(new FloppyDisk())
		cabinet.add(new HardDrive())
		cabinet.add(new Memory())

		expect(cabinet.getPrice()).to.equal(600)
	})
})
```

## 2.7 享元模式(flyweight)

-   一个系统中如果有多个相同的对象，那么只共享一份就可以了，不必每个都去实例化一个对象。
    -   比如说一个文本系统，每个字母定一个对象，那么大小写字母一共就是 52 个，那么就要定义 52 个对象。如果有一个 1M 的文本，那么字母是何其的多，如果每个字母都定义一个对象那么内存早就爆了。那么如果要是每个字母都共享一个对象，那么就大大节约了资源。

```js
function Color(name) {
	this.name = name
}
//使用对象池存放内部的状态对象，如果存在直接返回没有则创建
var colorFactory = {
	colors: {},
	create: function (name) {
		var color = this.colors[name]
		if (color) return color
		this.colors[name] = new Color(name)
		return this.colors[name]
	}
}
module.exports = colorFactory
```

```js
const expect = require('chai').expect
const colorFactory = require('../tmp')

describe('享元模式 测试', () => {
	it('重复颜色', () => {
		colorFactory.create('RED')
		colorFactory.create('RED')
		colorFactory.create('RED')
		colorFactory.create('YELLOW')
		colorFactory.create('YELLOW')

		expect(Object.keys(colorFactory.colors)).to.have.lengthOf(2)
	})
})
```

es6 实现

```js
class Color {
	constructor(name) {
		this.name = name
	}
}

class colorFactory {
	constructor(name) {
		this.colors = {}
	}
	create(name) {
		let color = this.colors[name]
		if (color) return color
		this.colors[name] = new Color(name)
		return this.colors[name]
	}
}

export { colorFactory }
```

```js
const expect = require('chai').expect
import { colorFactory } from '../tmp'

describe('享元模式 es6测试', () => {
	it('重复颜色', () => {
		const cf = new colorFactory()
		cf.create('RED')
		cf.create('RED')
		cf.create('YELLOW')
		cf.create('YELLOW')

		expect(Object.keys(cf.colors)).to.have.lengthOf(2)
	})
})
```

