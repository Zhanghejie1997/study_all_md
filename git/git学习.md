# git学习

[可视化在线学习网站](https://learngitbranching.js.org/?locale=zh_CN)

# 安装配置

> 配置用户名（- -global表示此配置适用于计算机的当前用户。如果不加- -global，表示此配置仅适用于当前git仓库）
> `git config - -global user.name "your name"`
>
> 配置邮件地址
> `git config - -global user.email "your email address"`
>
> 为某个命令配置别名（如 git config - -global alias.st status，配置完后就可以使用git st代替git status了）
> `git config - -global alias.xx [command]`
>
> 查看Git配置
> `git config - -list [- -global]`
>
> 编辑Git配置
> `git config - -edit [- -global]`

文件状态：本地、暂存区、本地仓库、远程仓库。

节点类型：节点、分支、HEAD、锚点。

## 简易流程图

| 工作区（展示当前分支内容） |                              | 暂存区 |                              | 本地仓库 |                                                     | 远程仓库 |
| :------------------------: | :--------------------------: | :----: | :--------------------------: | :------: | :-------------------------------------------------: | :------: |
|                            |              =>              |  \|\|  |              =>              |   \|\|   |                         =>                          |   \|\|   |
|                            | git  add  .   //添加到暂存区 |        | git  commit //添加到本地仓库 |          | git push origin   branchName //远程仓库添更新到分支 |          |
|            \|\|            |              <=              |  \|\|  |              <=              |   \|\|   |                         <=                          |          |
|                            |        git reset HEAD        |        | git  reset  --scfl   版本号  |          |   git  freth origin branchName  //更新到本地仓库    |          |
|            \|\|            |              <=              |   <=   |              <=              |          |                                                     |          |
|                            |                              |        |    git  reset -min版本号     |          |                                                     |          |
|                            |                              |        | git merge/rebase origin/分支 |          |                                                     |          |
|            \|\|            |              <=              |   <=   |              <=              |    <=    |                         <=                          |          |
|                            |                              |        |                              |          |                git pull origin  分支                |          |



# 命令

> 列出所有本地分支（前面有星号“*”的为当前工作分支）
> `git branch`
>
> 列出所有远程分支
> `git branch -r`
>
> 列出所有本地和远程分支
> `git branch -a`
>
> 创建名为“name”的新分支
> `git branch [name]`
>
> 切换到“name”分支
> `git checkout [name]`
>
> 创建名为“name”的新分支，并切换到该分支
> `git checkout -b [name]`
>
> 删除名为“name”的分支
> `git branch -d [name]`
>
> 将“name”分支合并到当前分支
> `git merge [name]`
>
> 推送“name”分支到远程（可以使用[:remote-name]指定远程分支的名称，否则远程分支名称与本地“name”分支相同）
> `git push origin [name][:remote-name]`
>
> 删除“name”远程分支（与上一条命令比较，其实就是推了一个空分支到远程，相当于删除远程分支）
> `git push origin :[remote-name]`
>
> 删除“name”远程分支
> `git branch -r -d origin/[remote-name]`

## 日志

> 查看提交历史
> `git log`
>
> -p 选项展开显示每次提交的内容差异，用 -2 则仅显示最近的两次更新
> `git log -p -2`
>
> 显示简要的增改行数统计
> `git log - -stat`



# 提交

> 回滚到某次提交。索引和工作空间的内容是不变的。如果想再次提交，直接commit即可
> git reset - -soft commitId
>
> 回滚到某次提交(git reset默认的模式)。索引的内容会改变，工作空间的内容不变。如果想再次提交，需要先add，再commit
> git reset - - mixed commitId
>
> 回滚到某次提交。索引和工作空间的内容都会变成给定提交时的状态，也就是在给定提交后修改的内容都会丢失，所以需要特别注意
> git reset - - hard commitId

`git  clone  <url>  "newName"`  

step1: 删除本地
rm -rf ai.txt
step2:删除暂存区
git rm ai.txt
git status

查看缓存区

git  status  

两种节点，第一种是固定，第二种事HEAD节点（指当前节点，必须大写）

git init  //初始化   问题   fatal: Not a git repository (or any of the parent directories): .git

git commit      //提交

git commit  --amend  hashname 

git  branch  name //创建name分支

git checkout  name // 转移到name分支角色    可以是节点hash值（输入前4个就可以了）

​		git checkout  name^  //加一个^表示上一级，就不需要输入hash值

​		git checkout name~4 //表示向上找第4个

git  merge  name   //在主分支角色下使用，合并name分支进来。

git rebase hashname //  把自己复制到hashname节点下

git  branch  -f   name    hashname//将目标角色分支强制指向hashname，或者指向

git reset hashname~1  //本地撤回版本就回到上一级，修改就没了

git  revert hashname  //会生产一个新节点，节点就跟hashname内容一样

git cherry-pick  hashname hashname // 把之后的节点复制添加到当前 HEAD	

git rebase -i  hashname~3 //把hashname节点之前一共三个进行排序，重新生成一次

git fast-forward

git  tag  name   hashname   //把hashname设置为锚点name

git describe  hsahname  //  查看最近位置    <tag>_<numCommits>_g<hash> `tag` 表示的是离 `ref` 最近的标签， `numCommits` 是表示这个 `ref` 与 `tag` 相差有多少个提交记录， `hash` 表示的是你所给定的 `ref` 所表示的提交记录哈希值的前几位。

git branch bugWork master~^2~  //可以组合使用

^ ~  都可以是父级，^跟着数字是指横向选择另一个，~跟着数字是上下选择



git  push   //推送

git  clone 

git  pull   ///拿来，从云端拿，但是合并

git  fetch  //拿来，从云端拿，但是不合并



//隐式更新合并，在pull和push种

git checkout -b  name  hashname ;切换一个新节点到name  上 并隐式绑定自动更新对象hashname .

git branch  -u  name  hashname ;隐藏更新完绑定更新对象。隐藏name  跟随hashname

git checkout -b

git push origin  hashName  //从当前HEAD节点到hashname提交  

git push origin  hashName :newHashName //从当前HEAD节点到hashname提交  :跟着新名字

git frech origin  hashName:newName  //一部分并重命名

git frech //全部

git push origin :hashName // 参数为空，删除hashName分支

git  fetch   origin  :hashName  //参数为空，生成HashName分支到当前角色下

git  pull  

等同于 git  fetch  加上  git  merge  两个功能合并

`git pull origin foo` 相当于：

`git fetch origin foo; git merge o/foo`

进行组合

```

```

