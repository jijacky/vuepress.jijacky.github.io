---
title: git操作
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
# star: true
# sticky: true
date: 2024-05-31
---

ffsdfsdf：ghp_eTmDDAphdK P1QJrgy7xuHyj7SxxTIT48maot

## git操作
- worktree
- stash
- assume-valid 假定未变更


## Git Bash输错账号

Git Bash输错账号密码如何重新输入
解决办法：

1. 打开控制面板（快捷打开win+R，输入control）
2. 点击打开用户账户
3. 点击凭据管理器
4. 点击windows凭据删除你的git凭据即可。

## Git 切换账号

1. 打开 Git Bash
```
$  git config --global user.name "用户名"
$  git config --global user.email "邮箱"
$  git config --global user.password= "密码"
```
2. 如果如上语句不起作用，则用下面语句
```
$  git config --global --replace-all user.email "邮箱" 
$  git config --global --replace-all user.name "用户名"
```
3. 修改之后可以通过$ git config --list 查看是否修改成功

4. 如果执行以上修改之后，仍然提示没有权限，取消git的SSL校验
```
git config --global http.sslVerify false  
```

### git 移动文件时的大小写问题

直接用 git mv 没有问题，你可以试试 git mv --force file File
git mv 的时候，ignorecase 必须是 true 才可以，如果是 false 报错
```
git config core.ignorecase false
$ git mv test.txt Test.txt
git config --global core.ignorecase false
```


### 删除保存在本地的git账户
```
git credential-manager uninstall
```
缓存账户
```
git config --global credential.helper wincred
```

## 账户密码问题
git credential manager for windows解决方法
换电脑之后因为git 账号问题修改了git账号密码，但问题出现了，
每次都让输入账号密码，window的一遍，git的一遍。之后git设置
可以保存密码，但window安全中心却每次都让输入密码解决方法。

一，保存 git 的密码
- .gitconfig 文件中添加  `[credential] helper = store`
- 或者在git bash 中执行 `git config --global credential.helper store`

之后只需输入一次密码即可

二、去掉每次window 安全中心验证
```
git credential-manager uninstall
```
执行后安全中心验证不在弹出


## git add 操作时，有时会误添加一些不想提交的文件，如何解决？
1. 误add单个文件
`git reset HEAD` 将file退回到unstage区
2. 误add多个文件，只撤销部分文件
`git reset HEAD` 将file退回到unstage区

git add 添加 多余文件 ，这样的错误是由于， 有的时候 可能`git add .` （空格+ 点） 表示当前目录所有文件，不小心就会提交其他文件 `git add` 如果添加了错误的文件的话，则需要撤销操作

1. git status 先看一下add 中的文件 
2. git reset HEAD 如果后面什么都不跟的话 就是上一次add 里面的全部撤销了 
3. git reset HEAD XXX/XXX/XXX.java 就是对某个文件进行撤销了


## git rm 与 git reset的区别
- git rm：用于从工作区和索引中删除文件
- git reset：用于将当前HEAD复位到指定状态。一般用于撤消之前的一些操作(如：git add,git commit等)。

- git rm file_path 删除暂存区和分支上的文件，同时工作区也不需要
- git rm --cached file_path 删除暂存区或分支上的文件, 但工作区需要使用, 只是不希望被版本控制（适用于已经被git add,但是又想撤销的情况）
- git reset HEAD 回退暂存区里的文件

## 假定未变更
Git/TortoiseGit 查看/取消(no-assume-unchanged)所有假定未变更(assume-valid)文件
查看所有假定未变更：
```
git ls-files -v|grep "^h"
```

取消所有假定已未变更：
```
git update-index --no-assume-unchanged <file>
```

> https://www.cnblogs.com/yehuisir/p/12325717.html

> http://einverne.github.io/post/2019/03/git-worktree.html

## alias
```
alias gs="git status" # to see changes that have been staged and which haven't
alias gac="git add . && git commit -m" # to stage and commit changes
```
## git push and pull
```
alias gp="git push" # + remote & branch names
alias gl="git pull" # + remote & branch names
```
## Pushing/pulling to origin remote
```
alias gpo="git push origin" # + branch name
alias glo="git pull origin" # + branch name
```
## Pushing/pulling to origin remote, master branch
```
alias gpom="git push origin master"
alias glom="git pull origin master"
```
```
alias gcb="git checkout -b" # To create a new branch and checkout into it
alias go="git checkout"
alias gom="git checkout master"
alias gre="git rebase"
alias gd='git diff' 
alias glo="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

我们可以在 ~/.gitconfig 文件里面进行别名设置，即加上下面这几行
```
[alias]  
st = status  
ci = commit  
br = branch  
co = checkout  
df = diff  

co = checkout		//输入git co => git checkout
st = status			//输入git st => git status
cm = commit -m		//输入git cm => git commit -m
br = branch			//输入git br => git branch 
dif = diff			//输入git dif => git diff 
pl = pull			//输入git pl => git pull
ps = push			//输入git ps => git push
```
```
[alias]
br = branch
ci = commit
cl = clone
co = checkout
cp = cherry-pick
cfg = clone
df = diff
fh = fetch
lg = "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
mg = merge
pl = pull
plr = pull --rebase
rb = rebase
ph = push
rmt = remote
rst = reset
sh = stash
st = status
sts = status -s
sbm = submodule
sw = show
swf = "show --name-status"
delb = "push origin --delete"
delt = "push origin :"
mb = merge-base
```
```
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```