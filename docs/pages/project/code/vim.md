## 1. 基础知识

Operate ： d c y

motion: $ g G ^

leader key:

比如 ff find f 单词 如果有功能是 find file 也想用 ff 冲突 可以加上 leader ，leader+ ff

## 2. 快速 comment：

gcc

gc【motion】 如 gc3j

整个到下个空行 comment gc}

## 3. EasyMotion:

快速移动 去你目之所及的任何地方

<space><space>[num]s[char]

leader leader + s + 字符

leader leader + 2s + 2 字符

## 4. Vim surround

    [operator]s[motion][symbol]

y s i w )===> yank operator + surround + iw 代表 text object 这个 motion + ）symbol

    )改成] 光标移入文本
    cs ) ] === change operator + surround + old symbol + new symbol

    删除 ds]

    灵活使用surround 后面的加上符号

    ysfr"  ===> yank + surround + fr find r + "

    比如 con|st = try find r string ===> con'st = try find r' string

## 5. Vim sneak

    [num][operator]z[char][char]

    通过两个字符 给你实现更强的motion

    2dzPe ===> 第二个为止 + delete operator + z 代表使用 vim sneak + Pe motion

    从当前位置 到第二个Pe之前的所有东西全部给删除

    可以与surround结合使用

    2 ys z Pe "   第二个Pe前都打上双引号

    ## 窗口 文件移动

    gd 查看定义 go to definition
    C-o C-i 鼠标的后退和前进
    gh 查看说明

    打开文件 CTRL+p

    remap：
    leader tn tp nl nf 窗口切换
    C-n 重构名称
    C-z 终端切换 C-j关闭终端 C-b 关闭侧边栏

    分屏
