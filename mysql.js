const pw = "280097460Syn"
export default pw

/*在此说明Mysql的配置：
需要建立两个数据库，一个名为my_db_01，一个名为my_db_02（如果不喜欢这两个名字，可以改，但router.js的数据库配置的database处你需要改为你建立的数据库名字

my_db_01的数据库需要建立一个名为notes的表（同样，如果不喜欢这个名字同样可以改，但router.js中的几个sql语句同样也要改，此处就不提供接口了），配置如下：（请按顺序，如果不按顺序进行添加表项，可能有些sql语句会运行出错）
id :int AI PK UQ NN
theme :varchar(45) NN
text :varchar(10000) NN
date :varchar(45) （default:NULL）
status :tinyint(1)  NN (default:0)

my_db_02的数据库需要建立一个名为gdb的表（同样，如果不喜欢这个名字同样可以改，但router.js中的几个sql语句同样也要改，此处就不提供接口了），配置如下：（请按顺序，如果不按顺序进行添加表项，可能有些sql语句会运行出错）
id :int AI PK NN UK
file :longblob (default:NULL)
gdb_file :varchar(5000)  (default:NULL)
note :varchar(2000)  (default:NULL)
animation :longtext  (default:NULL)
title :varchar(50)  (default:NULL)
music :longblob  (default:NULL)
status :int  NN(default:0)*/