电信20级zty老师的一个软件课设题目：“源程序交互式演示仿真系统”。简单来说就是写一个系统，完成C++老师的辅助教学，内容需要有一个编辑器（最好还能编译），同时还要有老师和学生两个系统界面，老师界面可以为代码界面进行绘图，以图形化的语言将代码展示出来，然后再保存案例。学生界面则可以看这些案例，然后做一些笔记 

由于是第一次写一个系统，因此有一些地方并没有那么规范，但程序还是能跑起来的。以下是部署和编译说明
# 1.前置条件
node.js  v18.12.1 ,  mysql (mysql)  v8.0.32
# 2.包管理工具 pnpm 安装
输入命令： `npm install pnpm -g`
# 3.修改mysql密码及创建数据库
打开文件包的mysql.js，修改pw为你mysql的密码值
在此说明Mysql的配置：
需要建立两个数据库，一个名为my_db_01，一个名为my_db_02（如果不喜欢这两个名字，可以改，但router.js的数据库配置的database处你需要改为你建立的数据库名字

my_db_01的数据库需要建立一个名为notes的表（同样，如果不喜欢这个名字同样可以改，但router.js中的几个sql语句同样也要改，此处就不提供接口了），配置如下：（请按顺序，如果不按顺序进行添加表项，可能有些sql语句会运行出错）
```
id :int AI PK UQ NN
theme :varchar(45) NN
text :varchar(10000) NN
date :varchar(45) （default:NULL）
status :tinyint(1)  NN (default:0)
```

my_db_02的数据库需要建立一个名为gdb的表（同样，如果不喜欢这个名字同样可以改，但router.js中的几个sql语句同样也要改，此处就不提供接口了），配置如下：（请按顺序，如果不按顺序进行添加表项，可能有些sql语句会运行出错）
```
id :int AI PK NN UK
file :longblob (default:NULL)
gdb_file :varchar(5000)  (default:NULL)
note :varchar(2000)  (default:NULL)
animation :longtext  (default:NULL)
title :varchar(50)  (default:NULL)
music :longblob  (default:NULL)
status :int  NN(default:0)*/
```

# 4.下载包
打开文件包后在有package.json的那一个目录下输入命令:    `pnpm i`

# 5.下载gcc和gdb
下载运行编译C++的配件即可

# 6.启动服务器
在server1.js的目录下启动命令行，输入命令:    `node server1.js`

# 7.打开开始页面
打开test.html（最好不要用IE打开，可以用microsoft edge）,即可启动系统，切换右上角的学生教师端，则可实现功能
