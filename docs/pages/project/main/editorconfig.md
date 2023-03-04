# editorConfig

## 1、前言

在多人开发的项目中，不能保证团队成员都使用相同的编辑器，那么不同的编辑器之间的格式设置各不相同，无法保证项目代码格式的统一，往往会出现意想不到的问题。

比如编辑器中一个制表符等于的空格数的大小（即缩进大小），各编辑器中及各个开发人员设置的大小是不一致的，那么如何保证团队代码在多人协同开发，使用编辑器格式不一的情况下仍然保证相同的格式呢，这就是 EditorConfig 要做的事情。

## 2、什么是 Editorconfig

```
EditorConfig 有助于为跨各种编辑器和 IDE 处理同一项目的多个开发人员维护一致的编码风格。EditorConfig 项目由用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵循定义的样式。
```

EditorConfig 组成：

1，EditorConfig 插件：

EditorConfig 插件并不是所有的编辑器都默认支持的，需要使用请自行安装。

点击 [EditorConfig](https://editorconfig.org/#pre-installed) 查看编辑器默认支持情况。

2，.editorconfig 自定义文件

.editorconfig 自定义文件是用来定义编辑器的编码格式规范，编辑器的行为会与 .editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高。

EditorConfig 插件会读取 .editorconfig 文件中定义的内容，应用于编辑器。

所以 EditorConfig 是用来帮助我们在不同的编辑器中保持编码风格的统一的。

EditorConfig 个人理解：

- 它是用来设置不同的编辑器保持相同的代码风格的，所以可以让你的代码样子看起来相同，比如设置相同的缩进显示风格，或者处理文件中行尾空格问题等
- 它可以帮助你编写格式相同的代码，可以控制编辑器的缩进大小，让不同的编辑器在按下 tab 键之后能拥有相同的表现，让你能更方便的编写相同格式的代码。

## 3、.editorconfig 文件格式

EditorConfig 文件采用类似 INI 的文件格式。在 EditorConfig 文件中，每行上的所有开头空格都被认为是不相关的。每行必须是以下之一：

空白注释 -- 使用八字 ( #) 或分号 ( ;) 进行注释部分标题键值对 -- 包含一个键和一个值，用=分隔。 EditorConfig 文件应该是 UTF-8 编码的，带有 LF 或 CRLF 行分隔符。

- CRLF 是 carriage return line feed 的缩写，中文意思是回车换行，windows。

- LF 是 line feed 的缩写，中文意思也是换行，linux。

## EditorConfig 文件从上到下读取，最先发现的规则优先。

EditorConfig 通过以下通配符来匹配特殊文件：

- \* 任何字符串，路径分隔符 ( /)除外
- \*\* 任何字符串
- ? 任何单个字符，路径分隔符 ( /)除外
- [name] 匹配名称中的任何单个字符
- [!name] 匹配名称中没有的任何单个字符
- {s1,s2,s3} 匹配任何给定的字符串（以逗号分隔，可以嵌套）
- {num1..num2} num1 和之间的任何整数 num2，其中 num1 和 num2 可以是正数或负数

匹配到的不同的文件类型，可以定义不同的格式化属性。

特殊字符可以用反斜杠转义，这样它们就不会被解释为通配符模式。

## 4、支持的属性

```yml
# 表示是最顶层的配置文件，发现值为true时，才会停止查找.editorconfig文件
root:true
[*] # 表示所有文件适用
# 设置使用那种缩进风格(tab是制表符，space是空格)
indent_style
# 定义用于每个缩进级别的空格数
indent_size
# 用一个整数来设置tab缩进的列数。
tab_width

# 设置换行符，值为lf、cr和crlf
# CR：Carriage Return，对应ASCII中转义字符\r，表示回车
# LF：Linefeed，对应ASCII中转义字符\n，表示换行
# CRLF：Carriage Return & Linefeed，\r\n，表示回车并换行
# Windows操作系统采用两个字符来进行换行，即CRLF；Unix/Linux/Mac OS X操作系统采用单个字符LF来进行换行；另外，MacIntosh操作系统（即早期的Mac操作系统）采用单个字符CR来进行换行
end_of_line

# 设置编码格式，值为latin1、utf-8、utf-8-bom、utf-16be和utf-16le
charset

# 设置为true则删除换行符之前的任何空白字符
# 设置为true会删除每一行后的任何空格  ***
# 去除行首的任意空白字符
trim_trailing_whitespace

# 设置为true以确保文件在保存时以换行符结尾
# 如果设置为true，则文件最后一行也会确保以换行符结尾，会强制换行到下一行
# 始终在文件末尾插入一个新行
insert_final_newline
```

所有的属性和值都不区分大小写。解析时它们是小写的。一般情况下，如果没有指定属性，将使用编辑器设置。

对于任何属性，将其值设为 unset 来删除之前的定义，例如，添加 indent_size = unset 来取消对 indent_size 的定义。

- indent_style 取值 tab 与 space 的区别

![image.png](/project/standard/indent_tab.png)

![image.png](/project/standard/indent_space.png)

- indent_size 与 tab_width 的区别：
  - 如果 indent_style 的值为 tab，缩进的长度优先取 tab_width 设置的值, 如果没有 tab_width， 则取 indent_size 的值，如果值为 space，缩进的长度优先取 indent_size 的值，如果没有 indent_size，则取 tab_width 的值。

## 5、editorConfig 功能：

1，控制编辑器的缩进样式，即使用那种方式缩进，空格还是制表符

2，控制制表符缩进的大小(宽度)，即一个制表符等于的空格数

其他相关的格式化工具会根据 .editorconfig 文件的设置来格式化代码，因为 editorconfig 的设置会覆盖编辑器设置。

插播：

不知道你有没有注意到无论 indent_style 的值取 tab 或者 space ，当 indent_size 的值与 tab_width 的值相同时，取值为 tab 或者 space ，样式是相同的，那么 tab ，space 存在的意义何在呢？

- **使用 space 可以提高代码的压缩率，因为现在的前端项目都在追寻最大的压缩率以减少文件传输占用的带宽，根据压缩原则，信息熵越大的压缩率越低**。很明显，当取值为 tab 的时候，文件中大概率同时存在制表符和空格；而取值为 space，文件就只存在空格了，所以 space 的信息熵就越低，压缩率就越高。

## 6、使用 EditorConfig

1. 安装插件如果你使用 VS Code 开发，那么恭喜你，vscode 默认不支持 EditorConfig，你需要自行安装。

在编辑器扩展商店中搜索 EditorConfig 即 EditorConfig for VS Code，点击了解详情。

2. 配置文件你需要定义一个名为 .editorconfig 的文件，Windows 资源管理器会自动将其重命名为 .editorconfig。

你可以在该文件中配置你想要的属性。

3. 使用打开项目时，EditorConfig 插件会在打开文件的目录和每个父目录中查找 .editorconfig 文件，如果到达根文件路径或 EditorConfig 文件 root = true，则文件搜索将停止。

EditorConfig 文件从上到下读取，最先发现的规则优先。

当你配置好了你需要的文件或者编辑器格式，你就可以正常进行开发使用了。

```yml
# 顶部的EditorConfig文件
root = true
# unix风格的换行符，每个文件都以换行符结尾
[*]
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```
