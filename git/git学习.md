# git学习

[可视化在线学习网站](https:#learngitbranching.js.org/?locale=zh_CN)

[详细参考](http://www.hechaku.com/git/git_addmingling.html)

# 理论

### 三大区域：

​	**工作区**（已控制文件、新或者有变动文件）、**暂存区**、**本地库**（本地仓库）、**远程仓库**（额外的）。
​	就是git文件所在的状态。

### 节点类型：	

​	(可以使用已下的任意一种成为：nodeName)

​	**节点**（节点，每次提交内容，有一个哈希值）（后续称为:hashName）

​	**分支**（指向节点的一个指针，可以修改，本地分支）（后续称为:branchName）

​	**分支**（指向节点的一个指针，只读，服务器的，更新时候会自动指向它对应绑定的本地指针所指向的节点，名字都带有origin/分支名）（后续称为:branchOriginName）

​	**锚点**（固定一个节点别名，类似于大版本）。（后续称为:TagName）

​	**HEAD**(当前指向节点/分支/锚定的 指针，也是**活动状态**下，大部分命令对应的主题就是HEAD指向的节点)（后续称为:HEAD）

### 线路结构：

​		一个父级可以有多个子节点，但是一个子节点最多有两个父级节点。使用`git merge  nodeName`把nodeName合并到当前节点上。

​		可以使用 `git rebase nodeName` 把当前节点复制到nodeName节点下面。

​		`git rebase -i  nodeName~4`  把当前节点上

## 使用模式：

### git中vi有两种工作模式

一种是命令模式：
接受、执行vi操作命令的模式，打开文件后默认模式

​	命令：

​			 `ZZ`或者`:wq`保存退出`vi`,只保存文件就`:q`。

​			`:q!`放弃并退出，`:e!`放弃并回复初始化重新编辑。

一种是编辑模式：
对文件内容的增删查改操作的模式，按下`esc`键，退到命令模式。

### 流程（简单）

1. 第一步确定仓库：拉取远程项目到本地库(git clone url  newName)或者初始化仓库（git  init)。
2. 第二部确定分支：切换所使用的分支（git checkout  分支）
3. 第三步新建添加：**新建了文件之后**，提交到当前暂存区(git add .)  全部提交 ，对修改的文件不需要再添加。
4. 第四步提交本地：把修改和新建内容提交到本地库中(git  commit  -m  '注释') ，新生成节点，且把分支指针指向最新这个节点。
5. 第五步更新分支：确保是最新，先备份，再拉取，(git pull origin 分支)，解决冲突
6. 第六步提交到远程仓库：由于解决了更新分支问题，直接提交(git  push  origin 分支)
7. 第七步提交到远程仓库：就会把隐式绑定的origin/分支指针更新到对应最新位置。

## 流程图

| 工作区（展示当前分支内容） |                              | 暂存区 |                              | 本地仓库 |                                                     | 远程仓库 |
| :------------------------: | :--------------------------: | :----: | :--------------------------: | :------: | :-------------------------------------------------: | :------: |
|                            |              =>              |  |              =>              |      |                         =>                          |      |
|                            | git  add  .   #添加到暂存区 |        | git  commit #添加到本地仓库 |          | git push origin   branchName #远程仓库添更新到分支 |          |
|                        |              <=              |    |              <=              |      |                         <=                          |          |
|                            |        git reset HEAD        |        | git  reset  --scfl   版本号  |          |   git  freth origin branchName  #更新到本地仓库    |          |
|                        |              <=              |   <=   |              <=              |          |                                                     |          |
|                            |                              |        |    git  reset -min版本号     |          |                                                     |          |
|                            |                              |        | git merge/rebase origin/分支 |          |                                                     |          |
|                        |              <=              |   <=   |              <=              |    <=    |                         <=                          |          |
|                            |                              |        |                              |          |                git pull origin  分支                |          |

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

# 命令分类 功能分类（推荐）

## 查询操作

### log 提交历史

```
git log  #查询提交历史  q 退出
#第一行是提交号，这是该次提交的SHA-1校验和
#第二行是作者的名字
#第三行是提交时间
#最后一行是提交说明
git log -2 #显示最近两条
git -log --stat #详细历史  #根本不想看，我是不想看太多太复杂了
git log --pretty  #定制查询
git log --pretty=format:"%H - %h - %T - %t - %P - %p - %an - %ae - %ar" #见附加1表格
git log --pretty=oneline #一行显示
git log --since=2.weeks  #两周内提交历史
```

<a href="#fn1">附加1表格</a>

```
git describe  hsahname #查询节点所在位置
```



### status工作区和暂存区状态

```
git status  #显示工作区文件和暂存区状态
```

## 区域操作

### add

```
git add . #把工作区全部添加暂存区
git add ./text/test.txt  #详细路径从工作区添加到暂存区
git add -A        #把新增、和修改的、和删除的都加到缓存
```

### rm （针对是暂存区和工作区）

```
git rm [-f | --force] [-n] [-r] [--cached] [--ignore-unmatch] [--quiet] [--] <file>…
git rm . #同时从工作区和索引中删除文件。即本地的文件也被删除了。
git rm --cached . 从索引中删除文件。但是本地文件还存在， 只是不希望这个文件被版本控制。.可以是文件路径
git rm -r --cached .   #主要这个点一定要写，-r是指文件夹 #删除缓存区所有文件命令 对应add操作
```

### commit

```
git commit -m 'xxx' # 提交并条件注释
git commit --amend -m 'xxx' #合并上一次提交（反复修改）
git commit -am 'xxx' #将 add 和 commit 合并为一步
```

### push

```
git push origin hashNAme #提交从本地仓库到服务器仓库 /并合并 ，包括merge
git push -f #强制推送  #不建议	
git push -u origin master #设置默认git push请求，之后就git push就可以提交到master
git push origin --tags #推送本地所有版本

git push origin --delete bug_xzx #删除远程分支
git push --all origin  #所有分支提交到远程仓库

git push A B:C     #其中A和C是分别remote端的一个repository的名字和其branch的名字，B是本地端branch的名字
git push origin :branchName  #删除远程仓库分支
git push origin master     #把本地仓库提交到远程仓库的master分支中
git push origin test:master   #提交本地test分支作为远程的master分支
git push origin test:test    # 提交本地test分支作为远程的test分支

```

### fetch

```
git fetch hashName #从服务器上拉取最新版本到本到本地仓库
git fetch --all hashName 
git fetch --multiple hashName 
```

### pull

```
git pull hashName #从服务器上拉取最新版本到本到本地仓库 #并合并，包括merge
git pull --rebase origin master  #等于 git fetch + git rebase

#冲突   并且会出现   |MERGING
<<<<<<< HEAD
master2   #当前版本
=======
master1   #向上版本
>>>>>>> de442d10c788e5b85cb61a2b5f26e75d38d36cf5

```



## 节点操作

### branch  分支

```
git branch #查询所有分支
git branch 分支名字  #创建分支
git branch -f name hashname #存在的话，强制指向hashname的指针名为name，不存在就新建一个
git branch -u branchOriginName branchName;#隐式绑定更新完绑定更新对象。就等同于让远程仓库的分支名再本地绑定分支。默认是origin/dev，本地就是dev,如果想要本地交org就把branchName改成org，但是branch Name需要存在
git branch -m <oldbranch> <newbranch> #重命名本地分支
git branch -D #删除分支
git branch -d #强制删除分支

git branch -v #查看所有分支最后一次提交
git branch --merged #那些分支合并到当前分支中
```

### cheackout 分支

```
git checkout nodeName #切换到nodeName
git checkout nodeName .#重新暂存区拉取全部内容 ，可以重新拉取对应文件
git checkout nodeName ./text.txt #重新暂存区拉取全部内容 ，可以重新拉取对应文件
git checkout nodeName[^2][~4]  #^表示横向分支第几个（1本身，2另一个merge分支），~向上找第4个
#就是说~是纵轴查询，^是横向查询最大为2
git checkout -b newbranch branchOriginName  #隐式绑定更新完绑定更新对象。就等同于让远程仓库的分支名再本地绑定分支。默认是origin/dev，本地就是dev,如果想要本地交org就
把branchName改成org，不需要存在newBranch
```

### rebase  复制

```
git rebase nodeName #复制当前节点到nodeName 会自动补全不存在的节点
git rebase -i nodeName~4 #选择nodeName开始以上4个，复制并生成到对应第四个节点新叶子上 如果当前是merge节点，则会选择两个父级节点进行，进入vi界面  具体见附录3
#当分支后面跟着|REBASE-i x/x 时候可以选择取消本次操作
git rebase --abort  //取消这次复制
```

<a herf="fn3">附录3</a>

### cherry-pick 复制

```
git cherry-pick  nodeName hashname # 把nodeName 复制接到hashname下
```

### merge 合并

```
git merge nodeName #以自己为主合并nadeName节点生成新节点（本地库）
git merge origin/nodeName #取远程合并到本地。
```

### reset  变基(切换节点指向)（撤销）

实质行为并不是撤销，而是移动 **HEAD**，但是安全，相对于git branch -f nodeName 

```
# 有三种模式  # soft ,mixed ,hard
git reset hashName #本地仓库重新分支指针重新指向一个节点，用于回退版本
git reset --mixed #默认模式，不加参数保留工作目录，并且清空暂存区。
git reset --hard #重置stage区和工作目录,就是没有commit的修改会被全部擦掉。
git reset --soft #保留工作目录，并把重置 HEAD 所带来的新的差异放进暂存区
```

### revert 反向制作

```
git revert hashName
git revert -n hashName #本地仓库操作，反向制作文件rever来抵消之前操作，会生成一个新节点
```

### tag （锚点，版本）

```
git tag #查看所有版本
git tag -l 'v1.4.2.*' #查看以这个开口，最后一位随意的版本
git tag newTagName nodeName #添加一个新版本到某个节点
git tag -a v1.4 -m 'my version 1.4'  #-a 为指定版本  -m为注释 
git show v1.4   #则会显示 注释有 my version 1.4 
git tag -d v1.0  #删除版本v1.0
```



## 跟踪分支

跟踪分支是指，更新某一分支，绑定其对应的服务器只读分支。而origin/分支 会在`git push` 时候更新。

```
git branch -u branchOriginName nodeName   # 让foo跟踪origin/master 需要两个都存在
git checkout -b nodeName branchOriginName  #新建foo并设置为使用状态跟踪origin/master 
```

### 切换指向节点

```
git reset hashNAme #本地仓库重新分支指针重新指向一个节点，用于回退版本
git branch -b newHashName hashName # 可以是新的newHashName ，也可以是存在的
```



## 初始化

```
git clone https:#xxx.git  "newName"    #拷贝到本地，初始化
git clone -b v2.8.1 https:#xxx.git   #拉取版本v2.8.1
git init #本地初始化
```

# 命令 结构分类

## 基础

> git init
>
> /*初始化一个仓库*/
>
> git init --bare project-name.git
>
> /*创建一个祼仓库*/
>
> git clone url
>
> /*从指定地址克隆一个仓库*/
>
> git clone --branch <tag> <repo>
>
> /*克隆特定的标签*/
>
> git clone -depth=1 <repo> 
>
> /*浅克隆最近一次提交记录的给定仓库*/
>
> git clone -branch new_feature <repo>
>
> /*克隆远程仓库的某个分支*/
>
> git status
>
> /*查看当前工作区状态*/
>
> git add .
>
> /*将当前目录下的所有文件添加到暂存区*/
>
> git commit -m 'xxx'
>
> /*提交并条件注释*/
>
> git commit --amend -m 'xxx'
>
> /*合并上一次提交（反复修改）*/
>
> git commit -am 'xxx'
>
> /*将 add 和 commit 合并为一步*/
>
> git rm path/to/filename
>
> /*删除暂存中指定的文件*/
>
> git remote add origin <user>@<host>:/path/to/repository/<project-name>.git
>
> /*将本地与远程分支关联起来*/
>
> git push -u github master
>
> /*初次提交*/
>
> git branch --set-upstream-to=origin/<branch> <branch> 
>
> /*设置让本地某个分支跟踪远程的某个分支*/
>
> git rm --cached filename
>
> /*从暂存区将文件移除*/
>
> git checkout -- filename
>
> /*将文件彻底从暂存区放弃*/
>
> git checkout --track hotfix/fix-menu
>
> /*检出远程分支hotfix/fix-menu并创建本地跟踪分支*/
>
> git stash list
>
> /*显示进度列表*/
>
> git stash save <message> 
>
> /*给当前存储的修改起个名字*/
>
> git stash apply stash@{X} 
>
> /*取出给定的暂存*/
>
> git stash drop stash@{X}
>
> /*将记录列表中取出的给定暂存记录删除*/

## 分支

> git branch
>
> /*显示本地分支*/
>
> git branch -a
>
> /*显示所有分支*/
>
> git branch -D
>
> /*删除未曾合并过的分支*/
>
> git branch -d
>
> /*删除已经合并过的分支*/
>
> git branch -m oldName newName
>
> /*本地分支重命名*/
>
> git push --delete origin <branch-name> 
>
> /*删除远程分支*/
>
> git branch --set-upstream-to origin/newName 
>
> /*把本地分支与远程分支关联起来*/
>
> git branch -v
>
> /*查看当前的本地分支与远程分支的关联关系*/
>
> git diff origin/develop
>
> /*查看本地当前分支与远程某一分支的差异*/
>
> git diff master origin/master
>
> /*查看本地 master 分支与远程 master 分支的差异*/

## 合并

> git merge origin/master
>
> /*将远程 master 分支合并到本地 master*/
>
> git merge --no-ff develop
>
> /*将 develop 分支合并到当前分支（不使用 Fast-forward）*/
>
> git cherry-pick <commit-id>
>
> /*将其它分支上的合适提交挑选到当前分支*/
>
> git rebase -i HEAD~~~
>
> /*汇合提交：将之前的三次提交合并到一处（squash）*/
>
> git rebase -i HEAD~3
>
> /*修改提交（edit）*/

## 标签（锚定）

> git tag
>
> /*查看所有标签*/
>
> git tag -l 'v2.6.*' 
>
> /*搜索某个标签*/
>
> git tag -a v1.0.2 -m ": ) Project v1.0.2 Released" 
>
> /*新建某个标签*/
>
> git push origin v1.0.1 
>
> /*推送某个标签到远程*/
>
> git push origin --tags 
>
> /*推送所有标签到远程*/
>
> git show v1.0.2 
>
> /*查看某个标签的版本信息*/
>
> git tag -d v1.0.1 
>
> /*删除本地标签*/
>
> git push origin --delete tag <tag-name> 
>
> /*删除远程标签*/
>
> git push origin -d <tag-name> 
>
> /*删除远程标签*/
>
> git push origin :refs/tags/<tag-name> 
>
> /*删除远程标签*/

## 回滚

> git reset --hard <commit-id> 
>
> /*将本地版本退回到某次提交上*/
>
> 本地文件回滚
>
> git log filename.*
>
> git reset <commit-id> filename.*
>
> git commit -m "Rollback filename.*"
>
> git checkout filename.*
>
> git reset HEAD <文件名> 
>
> /*把暂存区的修改撤销掉，重新放回工作区*/
>
> git revert HEAD 
>
> /*撤销上一个提交*/
>
> git reset --hard ORIG_HEAD 
>
> /*回退到上一次 reset 之前*/

## 日志

> git log 
>
> /*显示简略的提交日志*/
>
> git log -- filename 
>
> /*查看某个文件变动的具体日志信息*/
>
> git log -p -2 
>
> /*查看最近两次更新的内容差异*/
>
> git log --stat
>
> /*显示简要的增改行数统计*/
>
> git log -1 HEAD 
>
> /*显示最后一次提交信息*/
>
> git log --pretty=oneline 
>
> /*单行显示日志信息*/
>
> git log --pretty=oneline --graph --abbrev-commit 
>
> /*查看图文格式日志*/
>
> git log --graph --oneline --decorate --all 
>
> /*通过 ASCII 艺术的树形结构来展示所有的分支，每个分支都标示了它的名字和标签*/
>
> git log --name-status 
>
> /*查看文件改变信息*/
>
> git reflog 
>
> /*显示所有提交，包括孤立节点*/

## 远程

> git remote 
>
> /*查看远程分支名称，默认为 origin*/
>
> git remote -v 
>
> /*查看远程仓库的 URL，可能有多个*/
>
> git remote show <origin> 
>
> /*查看某个远程仓库的详细信息，默认为 origin*/
>
> git remote add <origin> <地址> 
>
> /*添加远程分支*/
>
> git remote rename <old-name> <new-name> 
>
> /*修改远程分支的名称*/
>
> git remote rm <name> 
>
> /*删除远程分支*/
>
> git push gitee master 
>
> /*将当前名称为 gitee 的仓库推送到远程 master 分支*/
>
> git checkout -b <branch-name> origin/<branch-name> 
>
> /*检出远程分支到本地分支*/
>
> git remote rename master xiaohe 
>
> /*重命名远程分支的名称*/
>
> git push origin --delete <branch-name> 
>
> /*删除远程某个分支*/
>
> git remote update origin --prune 
>
> /*更新远程分支列表*/
>
> git push origin -f 
>
> /*强制将本地当前分支推送到远程仓库对应的分支*/
>
> git push origin develop 
>
> /*将本地 develop 分支推送到远程仓库对应的 remotes/origin/develop 分支*/
>
> git push origin --all 
>
> /*将本地所有分支推送到远程仓库对应的分支*/



# 整理常用集合命令

## 还原

```
#从本地库拉取到暂存区
git reset nodeName
#从暂存区拉取到工作区
git checkout nodeName .
```

记得，git reset --hard 目标版本号 拉到原来的版本之后，和覆盖的对比 再提交，之前是这么操作的

### 冲突

```
git add .
git commit -m 'add'
git push  #失败
git pull  #冲突
#修改冲突
git commit #重新提交冲突部分
git push #提交到远程
```



# 问题补充

```
git fast-forrward  #补
```



# 附件

<div name="fn1">附加1表格</div>

| 选项 | 说明                                   |
| ---- | -------------------------------------- |
| %H   | 提交对象（commit）的**完整**哈希值     |
| %h   | 提交对象（commit）的**简短**哈希值     |
| %T   | 树对象（tree）的**完整**哈希值         |
| %t   | 树对象（tree）的**简短**哈希值         |
| %P   | 父对象（parent）的**完整**哈希值       |
| %p   | 父对象（parent）的**简短**哈希值       |
| %an  | 作者（author）名字                     |
| %ae  | 作者邮箱                               |
| %ad  | 作者修订日期，可以用 --date = 选项格式 |
| %ar  | 作者修订日期，按多久之前的方式显示     |
| %cn  | 提交者（committer）名字                |
| %ce  | 提交者名单邮箱                         |
| %cd  | 提交日期                               |
| %cr  | 提交日期，按多久之前的方式显示         |
| %s   | 提交说明                               |

<div name="fn3">附录三</div>

> 修改位置就真修改内容位置。
>
> pick：保留该commit（缩写:p）
> reword：保留该commit，但我需要修改该commit的注释（缩写:r）
> edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
> squash：将该commit和前一个commit合并（缩写:s）
> fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
> exec：执行shell命令（缩写:x）
> drop：我要丢弃该commit（缩写:d）