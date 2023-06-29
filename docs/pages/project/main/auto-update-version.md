# 自动更新版本信息

## 1. 使用 husky 中的 pre-push

```sh

#!/usr/bin/env sh
echo 'push1'

branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch" = "tag-test" ]; then
  latestTag=$(git describe --tags --abbrev=0)
  version=${latestTag#v}

	sed -i 's|"version": "v[0-9.]*"|"version": "'$latestTag'"|g' ./package.json
  git add package.json
	 git commit -m "feat(package): updated package.json version to $latestTag"
  echo "Updated package.json version to $version"
fi

```

当推送分支时，脚本被触发并执行以下操作：

1. 获取当前所在的分支名：

   ```shell
   branch=$(git symbolic-ref --short HEAD)/ $(git rev-parse --abbrev-ref HEAD)
   ```

   这行代码使用`git symbolic-ref --short HEAD`命令获取当前所在的分支名，并将其存储在变量`branch`中。

- git rev-parse --abbrev-ref HEAD：这个命令在任何情况下都会输出一些内容。如果当前处于一个分支，它会输出分支名；如果当前处于一个没有分支名的提交（比如通过 git checkout \<commit-hash\> 命令检出某个提交），或者在一个初始的、还没有任何提交的仓库中，它会输出 HEAD。

- git symbolic-ref --short -q HEAD：这个命令只在当前处于一个分支时输出分支名。如果当前处于一个没有分支名的提交，或者在一个初始的、还没有任何提交的仓库中，它不会输出任何内容，而且会返回一个非零的退出状态码（可以通过 $? 变量查看）。

2. 检查当前分支是否为 master 分支：

   ```shell
   if [ "$branch" = "master" ]; then
   fi
   ```

   这个条件判断语句检查变量`branch`是否为"master"。如果是，则执行接下来的操作。

3. 获取最新的 tag 版本号：

   ```shell
   latestTag=$(git describe --tags --abbrev=0)
   version=${latestTag#v}
   ```

   这两行代码使用`git tag --sort=-committerdate | head -n 1`命令获取所有 tag，并根据提交日期排序，然后取得最新的一个 tag，并将其存储在变量`latestTag`中。接着，`${latestTag#v}`将从`latestTag`中删除前缀"v"，提取纯粹的版本号，并将其存储在变量`version`中。

4. 更新 package.json 文件中的版本号：

   ```shell
   sed -i 's|"version": "v[0-9.]*"|"version": "'$latestTag'"|g' ./package.json
   ```

   这一行使用`sed`命令，根据正则表达式`"version": "[0-9.]*"`，将 package.json 文件中的版本号替换为变量`version`中的值。

5. 添加修改后的 package.json 文件到提交中：

   ```shell
   git add package.json
   git commit -m "feat(package): updated package.json version to $latestTag"
   ```

   这一行使用`git add`命令将修改后的 package.json 文件添加到暂存区中,进行提交。

6. 打印更新后的版本号信息：

   ```shell
   echo "Updated package.json version to $version"
   ```

   这行代码使用`echo`命令打印出更新后的版本号信息，以供用户查看。

这个脚本的目的是在推送 master 分支时，根据最新的 tag 版本自动更新 package.json 文件中的版本号。请确保您在执行这个脚本之前已经安装了必要的依赖，并且正确设置了相关的 Git 钩子。
