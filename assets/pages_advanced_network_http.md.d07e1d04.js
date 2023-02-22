import{_ as t,c as d,o as r,a as e}from"./app.22e2c8b1.js";const T=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"http状态码总结","slug":"http状态码总结","link":"#http状态码总结","children":[]}],"relativePath":"pages/advanced/network/http.md","lastUpdated":1677050717000}'),a={name:"pages/advanced/network/http.md"},h=e('<h2 id="http状态码总结" tabindex="-1">http状态码总结 <a class="header-anchor" href="#http状态码总结" aria-hidden="true">#</a></h2><ol><li>2xx(成功):服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。</li></ol><table><thead><tr><th>状态码</th><th>含义</th></tr></thead><tbody><tr><td>201(已创建)</td><td>请求成功并且服务器创建了新的资源</td></tr><tr><td>202(已接受)</td><td>服务器已接受请求，但尚未处理</td></tr><tr><td>203(非授权信息)</td><td>服务器已成功处理了请求，但返回的信息可能来自另一来源</td></tr><tr><td>204(无内容)</td><td>服务器成功处理了请求，但没有返回任何内容</td></tr><tr><td>205(重置内容)</td><td>服务器成功处理了请求，但没有返回任何内容</td></tr><tr><td>206(部分内容)</td><td>服务器成功处理了部分 GET 请求</td></tr></tbody></table><ol start="2"><li>3xx(重定向):表示要完成请求，需要进一步操作。通常，这些状态码用来重定向。</li></ol><table><thead><tr><th>状态码</th><th>含义</th></tr></thead><tbody><tr><td>300(多种选择)</td><td>针对请求，服务器可执行多种操作。服务器可根据请求者(user agent)选择一项操作，或提供操作列表供请求者选择</td></tr><tr><td>301(永久移动)</td><td>请求的网页已永久移动到新位置。服务器返回到新位置。服务器返回此相应。(对GET或HEAD请求的响应)时，会自动将请求者转到新位置</td></tr><tr><td>302(临时移动)</td><td>服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求</td></tr><tr><td>303(查看其它位置)</td><td>请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码</td></tr><tr><td>304(未修改)</td><td>自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容</td></tr><tr><td>305(使用代理)</td><td>请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理</td></tr><tr><td>307(临时重定向)</td><td>服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求</td></tr></tbody></table><ol start="3"><li>4xx(请求错误)：这些状态代码表示请求可能出错，妨碍了服务器的处理</li></ol><table><thead><tr><th>状态码</th><th>含义</th></tr></thead><tbody><tr><td>400(错误请求)</td><td>服务器不理解请求的语法</td></tr><tr><td>401(未授权)</td><td>请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应</td></tr><tr><td>403(禁止)</td><td>服务器拒绝请求</td></tr><tr><td>404(未找到)</td><td>服务器找不到请求的网页</td></tr><tr><td>405(方法禁用)</td><td>禁用请求中指定的方法</td></tr><tr><td>406(不接受)</td><td>无法使用请求的内容特性响应请求的网页</td></tr><tr><td>407(需要代理授权)</td><td>此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理</td></tr><tr><td>408(请求超时)</td><td>服务器等候请求时发生超时</td></tr><tr><td>409(冲突)</td><td>服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息</td></tr><tr><td>410(已删除)</td><td>如果请求的资源已永久删除，服务器就会返回此响应</td></tr><tr><td>411(需要有效长度)</td><td>服务器不接受不含有效内容长度标头字段的请求</td></tr><tr><td>412(未满足前提条件)</td><td>服务器未满足请求者在请求中设置的其中一个前提条件</td></tr><tr><td>413(请求实体过大)</td><td>服务器无法处理请求，因为请求实体过大，超出服务器的处理能力</td></tr><tr><td>414(请求的URI过长)</td><td>请求的 URI（通常为网址）过长，服务器无法处理</td></tr><tr><td>415(不支持的媒体类型)</td><td>请求的格式不受请求页面的支持</td></tr><tr><td>416(请求范围不符合要求)</td><td>如果页面无法提供请求的范围，则服务器会返回此状态代码</td></tr><tr><td>417(未满足期望值)</td><td>服务器未满足&quot;期望&quot;请求标头字段的要求</td></tr></tbody></table><ol start="4"><li>5xx(服务器错误)：这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错</li></ol><table><thead><tr><th>状态码</th><th>含义</th></tr></thead><tbody><tr><td>500(服务器内部错误)</td><td>服务器遇到错误，无法完成请求</td></tr><tr><td>501(尚未实施)</td><td>服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码</td></tr><tr><td>502(错误网关)</td><td>服务器作为网关或代理，从上游服务器收到无效响应</td></tr><tr><td>503(服务不可用)</td><td>服务器目前无法使用（由于超载或停机维护）。通常，这只是暂时状态</td></tr><tr><td>504 (网关超时)</td><td>服务器作为网关或代理，但是没有及时从上游服务器收到请求</td></tr><tr><td>505(HTTP 版本不受支持)</td><td>服务器不支持请求中所用的 HTTP 协议版</td></tr></tbody></table>',9),o=[h];function l(s,n,i,_,c,p){return r(),d("div",null,o)}const x=t(a,[["render",l]]);export{T as __pageData,x as default};
