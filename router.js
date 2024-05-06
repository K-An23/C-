import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import mysql from 'mysql2'
import multipart from 'connect-multiparty'
import moment from 'moment'
import id3 from "node-id3"
import pw from './mysql.js'
import cp from 'child_process'

var multipartyMiddleware = multipart();
var gdbarray = []
var gdbact = []
var gdbtimes = []
gdbtimes[0]=0
var reg = /[0-9]/
const router = express.Router()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: pw,
	database: 'my_db_01',
	port: '3306'
})
const db1 = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: pw,
	database: 'my_db_02',
	port: '3306'
})

const sqlstr = 'select * from notes'
const sqlstr01 = 'select * from gdb'
const sqlstr1 = 'INSERT INTO notes SET ?'
const sqlstr11 = 'INSERT INTO gdb SET ?'
const sqlstr2 = 'update notes set status=1 where id=?'
const sqlstr21 = 'update gdb set file=?,note=?,animation=?,title=?,music=? where id=?'
const sqlstr3 = 'select * from notes where id=?'
const sqlstr31 = 'select * from gdb where id=?'
const user = {theme:'default',text:' '}
var cartoon = []
var textpost = []
var notee = []
var anima = []
 

//利用gcc输出结果
router.get("/gccout",urlencodedParser,(req,res)=>{
	
	let compiler = cp.spawn('g++', ['-g',req.query.str1, '-o', req.query.str1.slice(0,-4)]);
	fs.readFile(req.query.str1.slice(0,-4).concat(".exe"),function(err,dataStr){
	  if(err)  res.send("请再点一下按钮给我助力！")
	  else {
	    console.log("sdsda")
	    var compiler1 = cp.spawn(`${req.query.str1.slice(0,-4).concat(".exe")}`);

	    compiler1.stdout.on('data', (data) => {
	      console.log('data=',data);
	      console.log(data.toString('utf8'))
	      res.send(data.toString('utf8'))
	      compiler1.kill();
	    });
	  }
	})

})


//点击调试按钮触发的路由处理，实际上只有生成.exe的功能
router.get("/gdbout",urlencodedParser,(req,res)=>{
	
	var times = parseInt(req.query.str1)
	let compiler = cp.spawn('g++', ['-g',req.query.str1, '-o', req.query.str1.slice(0,-4)]);
	res.send("sss")
})

//点击单步调试按钮后的处理，只执行b main，并锁定第一步调试的行号
router.get("/gdbout1",urlencodedParser,(req,res)=>{
	
	let compiler = cp.spawn('gdb', [`${req.query.str1.slice(0,-4).concat(".exe")}`]);
	var i=0
	var str
	compiler.stdout.on('data', (data) => {
  	i = i+1
  	if(i === 5){
    /*console.log(`stdout: ${data}`);*/
    str = `${data}`.slice(`${data}`.indexOf("line")+5,`${data}`.indexOf(".",`${data}`.indexOf("line")+5,`${data}`))
    console.log(str)
    res.send(str)
  }

  
 
});
	compiler.stdin.write('b main');//4
 



	/*compiler.stdin.write('\n');


  	compiler.stdin.write('run\n');
	compiler.stdin.write('n\n');*/
	compiler.stdin.end();
})


//点击next按钮的结果，执行b main,run,n，最终返回的是输出n之后的输出字符串数组以及每次输出字符串数组的长度数组，用来定位截取数组中的字符串元素，以及定位的行号
router.get("/gdbout2",urlencodedParser,(req,res)=>{
	let compiler = cp.spawn('gdb', [`${req.query.str1.slice(0,-4).concat(".exe")}`]);
	var i=0
	var str
	compiler.stdout.on('data', (data) => {
  	i = i+1
  	if(i >= 8){
    str = `${data}`
  	gdbarray[i-8] = str
  	console.log("sss")
    if(gdbarray[gdbarray.length-1].indexOf("Exception condition detected on fd 0")!= -1){
    	gdbact = gdbarray
    	gdbact.length = gdbact.length-1
    	gdbtimes[req.query.gdbnum] = gdbact.length
    	//gdbact,gdbtimes
    	for(var j=gdbtimes[req.query.gdbnum-1];j<gdbact.length;j++){
    		
    		
    		if(reg.test(gdbact[j].slice(0,gdbact[j].indexOf(" ")))){
    			console.log(gdbact[j].slice(0,gdbact[j].indexOf(" ")))
    			res.send([gdbact,gdbtimes,gdbact[j].slice(0,gdbact[j].indexOf(" "))])
    		}   	
    	}
    	console.log(gdbact)
    }
    	
    }     
 
})

	compiler.stdin.write('b main');//4
	compiler.stdin.write('\n');


  	compiler.stdin.write('run\n');
  	for(var j=0;j<req.query.gdbnum;j++){
  		compiler.stdin.write('n\n');
  	}
	compiler.stdin.end()
	
})



////////////////////////////////////////////////////////////////////////////以下代码无关gcc,gdb
router.post("/user",urlencodedParser,(req,res)=>{
	var data = req.body.hide
	var add = req.body.userplace.concat(req.body.filename)
	fs.writeFile(add,data,function(err){
		console.log(err)
	})
	console.log(add+"  "+req.body.hide)
})

router.post("/option",urlencodedParser,(req,res)=>{
	var sel = req.body.who
	
	if(sel === "教师端"){
		/*fs.readFile('E:/software/runcode-main/client/test/test_teacher.html','utf8',function(err,dataStr){*/
		fs.readFile('./client/test_teacher.html','utf8',function(err,dataStr){
		if(err)
			return console.log('读取文件失败！'+err.message)
		console.log("读取文件成功")
		res.send(dataStr)
		})
		
	}
		
	else if(sel ==="学生端"){
		fs.readFile('./client/test_stu.html','utf8',function(err,dataStr){
		if(err)
			return console.log('读取文件失败！'+err.message)
		console.log("读取文件成功")
		res.send(dataStr)
		})
		
	}
		
	
})

router.post("/savedb",urlencodedParser,(req,res)=>{
	var data = req.body.hid1
	var title = req.body.theme_name
	if(title===""){
		title = "未知标题"
	}
	console.log(data+"yyy")
	user.theme = title
	user.text = data
	user.date = moment().format('YYYY-MM-DD HH:mm:ss')
	console.log(user.date)
	db.query(sqlstr1,user,(err,results)=>{
	if(err) return console.log(err.message);
	if(results.affectedRows === 1){
		console.log("插入成功")
	}
})

})


router.get("/watchdb",urlencodedParser,(req,res)=>{
	db.query(sqlstr,(err,results)=>{
	if(err) return console.log(err.message);
	var str=[]
	var str_num
	var output = []
	var new_result = []
	for(var i=1,j=0;i<=results.length;i++)
	{
		if(results[i-1].status ===0){
			new_result[j] = results[i-1]
			j++
		}
	}

//上述代码解决已删除的表项不出现在目录中
	
	

	for(var j=0;j<Math.ceil(new_result.length/10);j++){
		for(var i=1+j*10;i<=10+j*10 && i<=new_result.length;i++){
			str_num = new_result[i-1].id.toString()
			str[i-j*10-1] = str_num.concat(". ".concat(new_result[i-1].theme).concat("    ").concat(new_result[i-1].date))
			if(i!==1) str[i-j*10-1] = "\n".concat(str[i-j*10-1])
		}
	output[j] = str.toString()
	}

	res.send(output)
	})
	
})//一次只显示10项，显示完后再显示（浏览器的弹窗不能全部显示所有表项，到了一定数目直接一个省略号）

router.get("/watchcasedb",urlencodedParser,(req,res)=>{
	db1.query(sqlstr01,(err,results)=>{
	if(err) return console.log(err.message);
	var str=[]
	var str_num
	var output = []
	var new_result = []
	for(var i=1,j=0;i<=results.length;i++)
	{
		if(results[i-1].status ===0){
			new_result[j] = results[i-1]
			j++
		}
	}

//上述代码解决已删除的表项不出现在目录中
	
	

	for(var j=0;j<Math.ceil(new_result.length/10);j++){
		for(var i=1+j*10;i<=10+j*10 && i<=new_result.length;i++){
			str_num = new_result[i-1].id.toString()
			str[i-j*10-1] = str_num.concat(". ".concat(new_result[i-1].title))
			if(i!==1) str[i-j*10-1] = "\n".concat(str[i-j*10-1])
		}
	output[j] = str.toString()
	}

	res.send(output)
	})
	
})

router.get("/getcasedb",urlencodedParser,(req,res)=>{
	db1.query(sqlstr01,(err,results)=>{
	if(err) return console.log(err.message);
	var str=[]
	var str_num
	var output = []
	var new_result = []
	for(var i=1,j=0;i<=results.length;i++)
	{
		if(results[i-1].status ===0){
			new_result[j] = results[i-1]
			j++
		}
	}

//上述代码解决已删除的表项不出现在目录中
	
	

	for(var j=0;j<Math.ceil(new_result.length/10);j++){
		for(var i=1+j*10;i<=10+j*10 && i<=new_result.length;i++){
			str_num = new_result[i-1].id.toString()
			str[i-j*10-1] = str_num.concat(". ".concat(new_result[i-1].title))
			if(i!==1) str[i-j*10-1] = "\n".concat(str[i-j*10-1])
		}
	output[j] = str.toString()
	}

	res.send(output)
	})
	
})

router.get("/deletedb",urlencodedParser,(req,res)=>{
	var num = parseInt(req.query.num)
	db.query(sqlstr2,num,(err,results)=>{
		if(err) return console.log(err.message);

	})
	res.send("删除成功")
})

router.get("/showdb",urlencodedParser,(req,res)=>{
	var num = parseInt(req.query.num)
	db.query(sqlstr3,num,(err,results)=>{
		if(results!=false){
			var output = results[0].status? " ":results[0].text
			if(err) return console.log(err.message);
			if(results.affectedRows===1)
				console.log("chengggong")
			res.send(output)
		}
		else res.send("没有这种笔记！")
		
	})
	
})



router.post("/savepic",urlencodedParser,(req,res)=>{
	/*const obj = Object.assign({},req.body)*/
	 
	var hei = JSON.parse(req.body.height.replace(/'/g, '"'));
	var wid = JSON.parse(req.body.width.replace(/'/g, '"'));
	var lef = JSON.parse(req.body.left.replace(/'/g, '"'));
	var col = JSON.parse(req.body.color.replace(/'/g, '"'));
	var to = JSON.parse(req.body.top.replace(/'/g, '"'));
	var tex = JSON.parse(req.body.text.replace(/'/g, '"'));
	var ord = parseInt(req.body.order)
	var ani ={}
	ani["_height"] = hei
	ani["_width"] = wid
	ani["_left"] = lef
	ani["_top"] = to
	ani["_text"] = tex
	ani["_color"] = col
	ani["_order"] = ord
	
	cartoon[ord-1]=ani
	res.send("保存动画帧成功！")
	
	
})

/*router.get("/viewani_stu",urlencodedParser,(req,res)=>{
	console.log(anima)
	
	
	var num = parseInt(req.query.ort_num) - 1
	console.log(num)
	console.log(anima[num])
	var k = anima[num][0]
	res.send(k)
})*/
router.get("/viewani",urlencodedParser,(req,res)=>{
	
	res.send(cartoon[0])
})

router.post("/postdb",urlencodedParser,(req,res)=>{
	var data = req.body.hidd1
	var teorder = parseInt(req.body.note_order)
	textpost[teorder-1] = data
})

router.get("/teanotewat",urlencodedParser,(req,res)=>{
	
	var k1 = parseInt(req.query.k)
	/*var data = parseInt(req.body.ort_num) - 1*/
	
	res.send(textpost[k1-1])
})


router.get("/viewani_next",urlencodedParser,(req,res)=>{
	var k1 = parseInt(req.query.k)
	
	k1 = k1 + 1
	res.send([cartoon[k1-1],cartoon.length])
})



router.get("/viewani_last",urlencodedParser,(req,res)=>{
	var k1 = parseInt(req.query.k)
	
	k1 = k1 - 1
	res.send([cartoon[k1-1],cartoon.length])
})

router.post("/picpost",urlencodedParser,(req,res)=>{
	//可进行数据库的处理
})



router.post("/musicdb",urlencodedParser,(req,res)=>{

		var path1 = req.body.fil_path
		var path2 = req.body.cpp_path
		var title1 = req.body.titlet
		var ordt = parseInt(req.body.orderr)
		var cli = {}
		var lastorder//找数据库最后存储的id
		notee[ordt-1] = new Array()
		anima[ordt-1] = new Array()

		for(var i=0;i<cartoon.length;i++){
			notee[ordt-1][i] = textpost[i]
		anima[ordt-1][i] = cartoon[i]
		}
		
		cli.id =  ordt
		
		fs.readFile(path2,function(err,dataStr){
			if (err) {
        		return console.log(err.message)
      		}
      		cli.file = dataStr
      		console.log(dataStr)
		})

		cli.note = JSON.stringify(textpost)
		cli.animation = JSON.stringify(cartoon)

		/*console.log(cartoon)
		console.log(JSON.stringify(cartoon))
		console.log(typeof(JSON.stringify(cartoon)))
		console.log(JSON.parse(JSON.stringify(cartoon)))
		console.log(typeof(JSON.parse(JSON.stringify(cartoon))))*/

		/*cli.note = textpost
		cli.animation = cartoon*/
		cli.title = title1
		fs.readFile(path1,function(err,dataStr){
	      if (err) {
	        return console.log(err.message)
	      }
      	/*fs.writeFile('E:/software/runcode-main/client/test/test.mp3',dataStr,function(err){
		console.log(err)
		})*/
      	cli.music = dataStr
      
	})//读入music文件
		
		//E:/software/runcode-main/client/test/20230103_153528.mp3
		//E:/kkk.cpp
		db1.query(sqlstr01,(err,results)=>{
			if(err) return console.log(err.message);
			lastorder = results[results.length-1].id
		})

		db1.query(sqlstr31,ordt,(err,results)=>{
			
			if(results!=false){
				db1.query(sqlstr21,[cli.file,cli.note,cli.animation,cli.title,cli.music,ordt],(err,results)=>{
				if(err) return console.log(err.message);

				})
			}//更新数据

			else {
				db1.query(sqlstr11,cli,(err,results)=>{
				if(err) return console.log(err.message);
				if(results.affectedRows === 1){
				console.log(results)
				}
			})
			}//添加数据，
		

	})//找是否有这种id的数据
		res.send("nnd")

		
})


router.get("/downloaddb",urlencodedParser,(req,res)=>{
	var caseord = parseInt(req.query.num)
	var them 
	var str
	
	db1.query(sqlstr31,caseord,(err,results)=>{
		if(results!=false){
			var output = results[0].status? " ":results[0].music
			var output1 = results[0].status? " ":results[0].file
			var them = results[0].status? " ":results[0].title
			var output2 = results[0].status? " ":results[0].note
			var output3 = results[0].status? " ":results[0].animation
			if(err) return console.log(err.message);
			if(results.affectedRows===1)
				console.log("chengggong")
			fs.writeFile('./client/test.mp3',output,function(err){
			console.log(err)
			})
			fs.writeFile('./client/test.cpp',output1,function(err){
			console.log(err)
			})
			them = results[0].title
			str = output1
			textpost = JSON.parse(output2)
			cartoon = JSON.parse(output3)
		}

		console.log(str)	
		res.send([them,str])
	})


})




export default router


