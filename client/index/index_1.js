var element_num = 0;
var cla_name = []
var id_name = []
var elehtml = []
var gdbnum = 0
var linecon = []    //长度为2
for(var i=0;i<50;i++){
    cla_name[i] = "element".concat(i.toString())
    id_name[i] = "#".concat(cla_name[i])

}
require.config({ paths: { 'vs': '../vs' }});
let editor;
require(['vs/editor/editor.main'], function() {
	 editor = monaco.editor.create(document.getElementById('container'), {
		value: [
			'#include <iostream>',
			'int main() {',
			'\tstd::cout << "hello world" << std::endl;',
			'\treturn 0;',
			'}'
		].join('\n'),
		language: 'cpp',
		glyphMargin: true
	});
});
console.log("sss2")
/*function run(){
	var output = document.getElementById("output");
	
	
	var currentModel = editor.getModel();
	str = currentModel.getValue();
	str = str.replaceAll(' ', '&nbsp;')
	str = str.replace(/\n/g,"<br/>")
	output.innerHTML = str;

	output.style.opacity = 1;


}*/


function $$(id) {
	return document.getElementById(id);
}
//选择上传文件时调用的函数
function fileUpload_ReadTxtFile(f) {
//检测浏览器是否支持FileReader对象
    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var tmpFile = f[0];
    console.log(f[0])
    var reader = new FileReader();
    reader.readAsText(tmpFile);
    reader.onload = function(e) {
    	console.log(e.target.result)
        editor.setValue(e.target.result);
    }
}

function save(){
	var output = document.getElementById("hid")
	var currentModel = editor.getModel()
	str = currentModel.getValue()
/*	str = str.replaceAll(' ', '&nbsp;')
	str = str.replace(/\n/g,"<br/>")*/
	output.value = str
	alert("保存成功！")

}



function savenote(){
	var note = document.getElementById("writenode")
	var output = document.getElementById("hid1")
	var notetext = note.value
	output.value = notetext

	alert("笔记已保存！")
}


$(function() {
	$('#btn1').on('click',function(){
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/watchdb',
		data:{name:'aaa'},
		success:function(res){
			/*var note = document.getElementById("writenode")*/
			
			/*note.innerHTML = JSON.stringify(res)*/
			/*note.innerHTML = res*/
			/*alert(JSON.stringify(res))*/
			if(res[0]){
				for(var i=0;i<res.length;i++){
				alert(res[i])
				}
			}
			else alert("还未创建笔记！")

			
		},
	})
	})


	
})
$(function() {
	$('#get_case').on('click',function(){
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/getcasedb',
		data:{name:'aaa'},
		success:function(res){
			/*var note = document.getElementById("writenode")*/
			
			/*note.innerHTML = JSON.stringify(res)*/
			/*note.innerHTML = res*/
			/*alert(JSON.stringify(res))*/
			if(res[0]){
				for(var i=0;i<res.length;i++){
				alert(res[i])
				}
			}
			else alert("老师还没有发布案例！")

			
		},
	})
	})


	
})

$(function() {
	$('#btn2').on('click',function(){
		var output = document.getElementById("delete_num")
		var num = output.value
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/deletedb',
		data:{num},
		success:function(res){
			alert(res)
		},
	})
	})


	
})


$(function() {
	$('#btn3').on('click',function(){
		var output = document.getElementById("show_num")
		var num = output.value
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/showdb',
		data:{num},
		success:function(res){
			if(res==="没有这种笔记！") alert("没有这种笔记！")
			else{
				var note = document.getElementById("writenode")
				note.value = res
			}
			
			
		},
	})
	})


	
})

$(function() {
	$('#watchtea').on('click',function(){
		/*var ort = document.getElementById('case_order');
        var ort_num = parseInt(ort.value)*/
		var k = $("#teanote_order").val()
		console.log(k)
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/teanotewat',
		data:{k},
		success:function(res){
			var tnote = document.getElementById("teanote")
			tnote.value = res
		},
	})
	})


	
})


$(function() {
   
    $('#checkpic').on('click',function(){
        var ort = document.getElementById('case_order');
        var ort_num = parseInt(ort.value)
        var anim = {}
        
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani',
        data:{ort_num},
        success:function(res){
            var num = res._height.length
            var ord1 = document.getElementById("teanote_order")
            ord1.value = "1"

            console.log(num)
            var elename = []
            /*emp()*/
            var pau = element_num
            var sq 
            var icon = document.getElementById('display');
            var but1 = document.getElementById('check_next');
            var but2 = document.getElementById('check_last');
            element_num = element_num + num
            for(var i=0;i<num;i++){
                var sq = document.createElement("div")
                sq.className = cla_name[i]
                sq.id = cla_name[i]
                icon.appendChild(sq)
                sq.setAttribute('style', `width:${res._width[i]};height:${res._height[i]};background-color: ${res._color[i]};left: ${res._left[i]};top:${res._top[i]};position : absolute;border:2px solid grey;font-size: 15px;cursor: move`)
                sq.innerHTML = res._text[i]
            }
            
            console.log(document.getElementById(cla_name[0]))
            but1.removeAttribute("hidden")
            

        },
        

    })
        
        

    })


    
})


$(function() {
    $('#check_next').on('click',function(){
        var ort = document.getElementById('case_order');
        var ort_num = parseInt(ort.value)
        var k = $("#teanote_order").val()
        var ord1 = document.getElementById("teanote_order")
        ord1.value = (parseInt(ord1.value)+1).toString()
        
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani_next',
        data:{k,ort_num},
        success:function(res){
            
            var res1 = res[0]
            var tot = res[1]
            var num = res1._height.length
            
            //num是指当前序号的方块个数
            var elename = []
            emp()
            var pau = element_num
            var sq 
            var icon = document.getElementById('display');
            var but1 = document.getElementById('check_next');
            var but2 = document.getElementById('check_last');
            element_num = element_num + num
            for(var i=0;i<num;i++){
                var sq = document.createElement("div")
                sq.className = cla_name[i]
                sq.id = cla_name[i]
                icon.appendChild(sq)
                sq.setAttribute('style', `width:${res1._width[i]};height:${res1._height[i]};background-color: ${res1._color[i]};left: ${res1._left[i]};top:${res1._top[i]};position : absolute;border:2px solid grey;font-size: 15px;cursor: move`)
                sq.innerHTML = res1._text[i]
            }
            
            
            but2.removeAttribute("hidden")
            if(parseInt(ord1.value)==res[1]){
                but1.hidden = "hidden"
            }
            else but1.removeAttribute("hidden")
        },
    })
    })


    
})

$(function() {
    $('#check_last').on('click',function(){
        var ort = document.getElementById('case_order');
        var ort_num = parseInt(ort.value)
        var k = $("#teanote_order").val()
        var ord1 = document.getElementById("teanote_order")
        ord1.value = (parseInt(ord1.value)-1).toString()
        
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani_last',
        data:{k,ort_num},
        success:function(res){
            var res1 = res[0]
            var tot = res[1]
            var num = res1._height.length
           
            var elename = []
            emp()
            var pau = element_num
            var sq 
            var icon = document.getElementById('display');
            var but1 = document.getElementById('check_next');
            var but2 = document.getElementById('check_last');
            element_num = element_num + num
            for(var i=0;i<num;i++){
                var sq = document.createElement("div")
                sq.className = cla_name[i]
                sq.id = cla_name[i]
                icon.appendChild(sq)
                sq.setAttribute('style', `width:${res1._width[i]};height:${res1._height[i]};background-color: ${res1._color[i]};left: ${res1._left[i]};top:${res1._top[i]};position : absolute;border:2px solid grey;font-size: 15px;cursor: move`)
                sq.innerHTML = res1._text[i]
            }
            
            but1.removeAttribute("hidden")
            
            if(parseInt(ord1.value)== 1){
                but2.hidden = "hidden"
            }
            else but2.removeAttribute("hidden")
        },
    })
    })


    
})





function emp(){
    var div = document.getElementById("display");
    var but1 = document.getElementById('check_next');
    var but2 = document.getElementById('check_last');
    // 获取 div 标签下的所有子节点
    var pObjs = div.childNodes;
    for (var i = pObjs.length - 1; i >= 0; i--) { 
    // 一定要倒序，正序是删不干净的，可自行尝试
      div.removeChild(pObjs[i]);
    }
   element_num=0
   but1.hidden = "hidden"
   but2.hidden = "hidden"
}







$(function() {
	$('#download').on('click',function(){
		var caseord = document.getElementById("case_order");


		var num = caseord.value
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/downloaddb',
		data:{num},
		success:function(res){
			console.log(res[1].data)
			var castitle = document.getElementById("casetil");
			var path_name = document.getElementById("place");
			var file_name = document.getElementById("fn");
			let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

			let u8 = new Uint8Array(res[1].data);
			path_name.value = "./test/"
			file_name.value = "test.cpp"

			console.log(utf8decoder.decode(u8)); 
			

			castitle.value = res[0]
			editor.setValue(utf8decoder.decode(u8))


			

		},
	})
	})


	
})

///////////////////////////////////////////////////////////////////////////////////////以下代码为gcc与gdb的相关代码（教师端相同）
$(function() {
	$('#btt').on('click',function(){
		var currentModel = editor.getModel();
		str = currentModel.getValue();
		var path_name = document.getElementById("place");
		var file_name = document.getElementById("fn");
		var str1 = path_name.value.concat(file_name.value)
		
		$.ajax({
		type:'GET',
		url:'http://127.0.0.1:64/gccout',
		data:{str,str1},
		success:function(res){
			var outcome = document.getElementById("output");
			if(res ==="请再点一下按钮给我助力！")
				alert(res)
			else{
				outcome.innerHTML = res
				output.style.opacity = 1;
			}
		},
	})
	})


	
})

//调试
$(function() {
    $('#btd').on('click',function(){
        /*gdbnum = gdbnum + 1*/
        var currentModel = editor.getModel();
		str = currentModel.getValue();
		var path_name = document.getElementById("place");
		var file_name = document.getElementById("fn");
		var str1 = path_name.value.concat(file_name.value)
        $.ajax({
        type:'get',
        url:'http://127.0.0.1:64/gdbout',
        data:{str,str1},
        success:function(res){
        	console.log(res)
            var td1 = document.getElementById("btd1");
            var td2 = document.getElementById("btd2");
            var td3 = document.getElementById("btd3");
            var td = document.getElementById("btd");
            td1.removeAttribute("hidden")
            td2.removeAttribute("hidden")
            td3.removeAttribute("hidden")
            td.hidden = "hidden"
        },
    })
    })


    
})


$(function() {
    $('#btd1').on('click',function(){
        /*gdbnum = gdbnum + 1*/
        
		var path_name = document.getElementById("place");
		var file_name = document.getElementById("fn");
		var str1 = path_name.value.concat(file_name.value)
        $.ajax({
        type:'get',
        url:'http://127.0.0.1:64/gdbout1',
        data:{str1},
        success:function(res){
        	console.log(res)
            var line = parseInt(res)
            linecon[0] = line
            console.log(linecon[0])
            var decorations = editor.deltaDecorations(
			[],
			[
				{
					range: new monaco.Range(line, 1, line, 1),
					options: {
						isWholeLine: true,
						className: "myContentClass",
						glyphMarginClassName: "myGlyphMarginClass",
					},
				},
			]
			)
        },
    })
    })


    
})


$(function() {
    $('#btd2').on('click',function(){
        gdbnum = gdbnum + 1
        
		var path_name = document.getElementById("place");
		var file_name = document.getElementById("fn");
		var str1 = path_name.value.concat(file_name.value)
        $.ajax({
        type:'get',
        url:'http://127.0.0.1:64/gdbout2',
        data:{str1,gdbnum},
        success:function(res){
        	console.log(res[2].slice(0,res[2].indexOf("\t")))
        	var gdbstr = []
        	var gdbc = []
        	gdbc = res[1]
        	gdbstr = res[0]
        	var output = document.getElementById("output");
        	var str = ""
        	console.log("aaa")
        	for(var j=gdbc[gdbnum-1];j<gdbstr.length;j++){
        		str = str.concat(gdbstr[j].concat("<br>"))
        	}
        	console.log(str)
        	output.innerHTML = str;
			output.style.opacity = 1;
        	line = parseInt(res[2].slice(0,res[2].indexOf("\t")))
        	if(linecon[1] === undefined){
        		linecon[1] = line
        	}
        	else{
        		linecon[0] = linecon[1]
        		linecon[1] = line
        	}
        /*	var arr = []
        	arr[0] = {
					range: new monaco.Range(line, 1, line, 1),
					options: {
						isWholeLine: true,
						glyphMargin: true,
						className: "myContentClass",
						glyphMarginClassName: "myGlyphMarginClass",
					}
				}*/
		/*	for(var j = 0;j<linecon.length-1;j++){
				arr[j+1] = {
					range: new monaco.Range(linecon[j], 1, linecon[j], 1),
					options: {
						isWholeLine: false,
						glyphMargin: false,
						className: "myContentClass",
						glyphMarginClassName: "myGlyphMarginClass",
					}
				}
			}*/
        	console.log(linecon[0])
             var decorations = editor.deltaDecorations(
			[],
			[
				{
					range: new monaco.Range(linecon[0], 1, linecon[0], 1),
					options: {
						isWholeLine: true,
						className: "myContentClass1",
						glyphMarginClassName: "myGlyphMarginClass1",
					},
				},
				{
					range: new monaco.Range(linecon[1], 1, linecon[1], 1),
					options: {
						isWholeLine: true,
						className: "myContentClass",
						glyphMarginClassName: "myGlyphMarginClass",
					},
				},
			]
			)

			
        },
    })
    })


    
})


/*$(function() {
    $('#btd3').on('click',function(){
        
        gdbnum = 0
        $.ajax({
        type:'get',
        url:'http://127.0.0.1:64/gdbout3',
        data:{gdbnum},
        success:function(res){
        	console.log(res)
            var td1 = document.getElementById("btd1");
            var td2 = document.getElementById("btd2");
            var td3 = document.getElementById("btd3");
            var td = document.getElementById("btd");
            td1.removeAttribute("hidden")
            td2.removeAttribute("hidden")
            td3.removeAttribute("hidden")
            td.hidden = "hidden"
        },
    })
    })


    
})*/

function cancel(){
	gdbnum = 0;
	var output = document.getElementById("output");
	console.log("12212")
	output.innerHTML = "输出：";
	output.style.opacity = 0.5;
	var td1 = document.getElementById("btd1");
    var td2 = document.getElementById("btd2");
    var td3 = document.getElementById("btd3");
    var td = document.getElementById("btd");
    var pause = linecon[1]
    td.removeAttribute("hidden")
    td1.hidden = "hidden"
    td2.hidden = "hidden"
    td3.hidden = "hidden"
    var decorations = editor.deltaDecorations(
			[],
			[
				{
					range: new monaco.Range(pause, 1, pause, 1),
					options: {
						isWholeLine: true,
						className: "myContentClass1",
						glyphMarginClassName: "myGlyphMarginClass1",
					},
				},
				
			]
			)
    linecon.length = 0
}