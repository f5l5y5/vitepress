import{_ as e,c as t,o as l,a as i}from"./app.43223be6.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"面向对象三大特征","slug":"面向对象三大特征","link":"#面向对象三大特征","children":[]},{"level":2,"title":"OOP编程6大原则","slug":"oop编程6大原则","link":"#oop编程6大原则","children":[{"level":3,"title":"1. 单一职责原则SRP","slug":"_1-单一职责原则srp","link":"#_1-单一职责原则srp","children":[]},{"level":3,"title":"2. 开放封闭原则OCP","slug":"_2-开放封闭原则ocp","link":"#_2-开放封闭原则ocp","children":[]},{"level":3,"title":"3. 里式替换原则LSP","slug":"_3-里式替换原则lsp","link":"#_3-里式替换原则lsp","children":[]},{"level":3,"title":"4. 接口分离原则ISP","slug":"_4-接口分离原则isp","link":"#_4-接口分离原则isp","children":[]},{"level":3,"title":"5. 依赖倒置原则DIP","slug":"_5-依赖倒置原则dip","link":"#_5-依赖倒置原则dip","children":[]},{"level":3,"title":"6. 迪米特法则-最少知识原则","slug":"_6-迪米特法则-最少知识原则","link":"#_6-迪米特法则-最少知识原则","children":[]},{"level":3,"title":"7.合成复用原则（Composite Reuse Principle）","slug":"_7-合成复用原则-composite-reuse-principle","link":"#_7-合成复用原则-composite-reuse-principle","children":[]}]}],"relativePath":"pages/advanced/refactoring/index.md"}'),r={name:"pages/advanced/refactoring/index.md"},n=i('<h2 id="面向对象三大特征" tabindex="-1">面向对象三大特征 <a class="header-anchor" href="#面向对象三大特征" aria-hidden="true">#</a></h2><ol><li>继承</li><li>封装</li><li>多态</li></ol><h2 id="oop编程6大原则" tabindex="-1">OOP编程6大原则 <a class="header-anchor" href="#oop编程6大原则" aria-hidden="true">#</a></h2><table><thead><tr><th style="text-align:center;">缩写</th><th style="text-align:center;">全称</th><th style="text-align:center;">中文</th></tr></thead><tbody><tr><td style="text-align:center;">S</td><td style="text-align:center;">Single Responsibility Principle</td><td style="text-align:center;">单一职责原则</td></tr><tr><td style="text-align:center;">O</td><td style="text-align:center;">Open－Close Principle</td><td style="text-align:center;">开放封闭原则</td></tr><tr><td style="text-align:center;">L</td><td style="text-align:center;">Liskov Substitution Principle</td><td style="text-align:center;">里式替换原则</td></tr><tr><td style="text-align:center;">I</td><td style="text-align:center;">The Interface Segregation Principle</td><td style="text-align:center;">接口分离原则</td></tr><tr><td style="text-align:center;">D</td><td style="text-align:center;">The Dependency Inversion Principle</td><td style="text-align:center;">依赖倒置原则</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;">Law of Demeter</td><td style="text-align:center;">迪米特法则-最少知识原则</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;">Composite Reuse Principle</td><td style="text-align:center;">合成复用原则</td></tr></tbody></table><h3 id="_1-单一职责原则srp" tabindex="-1">1. 单一职责原则SRP <a class="header-anchor" href="#_1-单一职责原则srp" aria-hidden="true">#</a></h3><ul><li>一个类或者一个模块只负责完成一个职责或者功能，不要设计大而全的类， 要设计粒度小，功能单一的类， 单一职责是为了实现代码高内聚，低耦合，提高代码的复用性，可读性，可维护性。</li></ul><h3 id="_2-开放封闭原则ocp" tabindex="-1">2. 开放封闭原则OCP <a class="header-anchor" href="#_2-开放封闭原则ocp" aria-hidden="true">#</a></h3><ul><li>添加一个新功能，应该是通过现有共扩展代码（新增模块，类，方法，属性等）, 而非修改已有代码的方式来完成。</li></ul><h3 id="_3-里式替换原则lsp" tabindex="-1">3. 里式替换原则LSP <a class="header-anchor" href="#_3-里式替换原则lsp" aria-hidden="true">#</a></h3><ul><li>所有引用基类的地方必须能透明的使用其子类的对象。 class A 和class B, a的类型上有b,那么所有用到b的地方都可以用a进行替换</li></ul><h3 id="_4-接口分离原则isp" tabindex="-1">4. 接口分离原则ISP <a class="header-anchor" href="#_4-接口分离原则isp" aria-hidden="true">#</a></h3><ul><li>定义是：客户端不应该依赖它不需要的接口。另一种定义是：类间的依赖关系应该建立在最小的接口上。接口隔离原则将非常庞大，臃肿的接口拆分成更小的接口和更具体的接口，这样客户只需要知道他们感兴趣的方法。接口隔离原则的目的是系统解开耦合，从而容易重构、更改和重新部署。</li></ul><h3 id="_5-依赖倒置原则dip" tabindex="-1">5. 依赖倒置原则DIP <a class="header-anchor" href="#_5-依赖倒置原则dip" aria-hidden="true">#</a></h3><ul><li>主要用来指导框架层面的设计。高层模块不依赖低层模块，它们共同依赖同一个抽象。抽象不要依赖具体实现细节，具体实现细节依赖抽象。</li></ul><h3 id="_6-迪米特法则-最少知识原则" tabindex="-1">6. 迪米特法则-最少知识原则 <a class="header-anchor" href="#_6-迪米特法则-最少知识原则" aria-hidden="true">#</a></h3><ul><li>一个对象应该对其他对象有最少的了解。</li></ul><h3 id="_7-合成复用原则-composite-reuse-principle" tabindex="-1">7.合成复用原则（Composite Reuse Principle） <a class="header-anchor" href="#_7-合成复用原则-composite-reuse-principle" aria-hidden="true">#</a></h3><ul><li>尽量首先使用合成/聚合的方式，而不是使用继承。</li></ul>',18),a=[n];function d(s,c,h,o,p,_){return l(),t("div",null,a)}const x=e(r,[["render",d]]);export{g as __pageData,x as default};