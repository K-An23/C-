var element_num = 0;
var cla_name = []
var id_name = []
var elehtml = []
for(var i=0;i<50;i++){
    cla_name[i] = "element".concat(i.toString())
    id_name[i] = "#".concat(cla_name[i])

}
var gdbnum = 0
var linecon = [] 

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
    var reader = new FileReader();
    reader.readAsText(tmpFile);
    reader.onload = function(e) {
        editor.setValue(e.target.result);
    }
}

function save(){
    var output = document.getElementById("hid")
    var currentModel = editor.getModel()
    str = currentModel.getValue()
/*  str = str.replaceAll(' ', '&nbsp;')
    str = str.replace(/\n/g,"<br/>")*/
    output.value = str
    alert("保存成功！")

}





//新建，颜色拖动板块
$(function() {
    $('#new_design').on('click',function(){

        var pau = element_num
        element_num = element_num + 1
        var sq = document.createElement("div")
        var icon = document.getElementById('display_design');
        sq.innerHTML = "nihao"
        sq.className = cla_name[pau]
        console.log(sq.className)
        sq.id = cla_name[pau]
        
        icon.appendChild(sq)
        sq.setAttribute('style', `width:20px;height:20px;background-color: red;left: 20px;top:50px;icon1.style.position = absolute;border:2px solid grey;`)

         var move = false
         var deltaLeft = [],deltaTop = []


    var main = document.getElementById('display_design');
    var icon1 = document.getElementById(cla_name[pau]);
 
    var icon = document.querySelector('.'.concat(cla_name[pau]));
    var set_w = document.getElementById("width_set")
    var set_h = document.getElementById("height_set")
    var set_c = document.getElementById("color_set")
    var set_t = document.getElementById("text_set")
    for(var i=0;i<50;i++){
        deltaLeft[i] = 0
        deltaTop[i] = 0
    }
   
    icon1.style.height = set_h.value? set_h.value : "20px"
    icon1.style.width = set_w.value? set_w.value : "20px"
    icon1.style.backgroundColor = set_c.value? set_c.value : "red"
    icon1.innerHTML = set_t.value? set_t.value : "nihao"
    icon1.style.fontsize = set_h.value? set_h.value : "10px"
    icon1.style.cursor= "move";
    
    icon1.style.position = "absolute"
    /*console.log(icon.style.left)
    console.log(icon.style.top)*/
    icon.addEventListener('mousedown', function (e) {
        /*
        * @des deltaLeft 即移动过程中不变的值
        */
  
        deltaLeft[pau] = e.clientX-e.target.offsetLeft;
        deltaTop[pau] = e.clientY-e.target.offsetTop;
        move = true;
        console.log("mousedown")
        
    })
 


    main.addEventListener('mousemove', function (e) {
        if (move) {
            var cx = e.clientX;
            var cy = e.clientY;
            /** 相减即可得到相对于父元素移动的位置 */   
            var dx = cx - deltaLeft[pau]
            var dy = cy - deltaTop[pau]

            /** 防止超出父元素范围 */
            if (dx < 0) dx = 0
            if (dy < 0) dy = 0
            if (dx > 370) dx = 370
            if (dy > 385) dy = 385
            /*console.log(dx+","+dy)*/
            icon.style.left = dx.toString().concat("px")
            icon.style.top = dy.toString().concat("px")
            /*icon.setAttribute('style', `left:${dx}px;top:${dy}px;position:absolute;border:2px solid grey;height:${pau_hei};width:${pau_wid};`)*/
            

        }
    })

    // 拖动结束触发要放在，区域控制元素上
    main.addEventListener('mouseup', function (e) {
        move = false;
        console.log('mouseup');
    })
    

        })

    
        
})





$(function() {
    $('#save_pic').on('click',function(){
        var elename = []        //存每个新建方块的节点的数组
        var elehei = []
        var elewid = []
        var elecol = []
        var eleleft = []
        var eletop = []
        var eletext = []
        var trb = {}

        /*var ordert = document.getElementById(ordsetk)
        console.log(ordsetk)*/
        var ordert_num =  $("#ordsetk").val()
        console.log(element_num)
        for(var i=0;i<element_num;i++){
            elename[i] = document.getElementById(cla_name[i]);
            elehei[i] = elename[i].style.height
            elewid[i] = elename[i].style.width
            elecol[i] = elename[i].style.backgroundColor
            eleleft[i] = elename[i].style.left
            eletop[i] = elename[i].style.top
            eletext[i] = elename[i].innerHTML
        }
        /*var test = "1"*/
        
        $.ajax({
        type:'post',
        url:'http://127.0.0.1:64/savepic',
        
        /*data:{test},*/
        /*contentType :  "application/json",*/
        /*processData : false,*/
        data:{height:JSON.stringify(elehei),left: JSON.stringify(eleleft),width:JSON.stringify(elewid),color:JSON.stringify(elecol),top:JSON.stringify(eletop),text:JSON.stringify(eletext),order:ordert_num},
        success:function(res){
            
            /*if(res[0]){
                for(var i=0;i<res.length;i++){
                alert(res[i])
                }
            }
            else alert("还未创建笔记！")*/
            alert(res)

            
        },
    })


    })


    
})



//预览：先清除再重建

$(function() {
   
    $('#preview').on('click',function(){
        
        var anim = {}

        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani',
        data:{name:'aaa'},
        success:function(res){
            var num = res._height.length
            var ord1 = document.getElementById("ordsetk")
            ord1.value = "1"

            console.log(num)
            var elename = []
            emp()
            var pau = element_num
            var sq 
            var icon = document.getElementById('display_design');
            var but1 = document.getElementById('preview_next');
            var but2 = document.getElementById('preview_last');
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
    $('#preview_next').on('click',function(){
        
        var k = $("#ordsetk").val()
        var ord1 = document.getElementById("ordsetk")
        ord1.value = (parseInt(ord1.value)+1).toString()
        
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani_next',
        data:{k},
        success:function(res){
            
            var res1 = res[0]
            var tot = res[1]
            var num = res1._height.length
            
            //num是指当前序号的方块个数
            var elename = []
            emp()
            var pau = element_num
            var sq 
            var icon = document.getElementById('display_design');
            var but1 = document.getElementById('preview_next');
            var but2 = document.getElementById('preview_last');
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
    $('#preview_last').on('click',function(){
        
        var k = $("#ordsetk").val()
        var ord1 = document.getElementById("ordsetk")
        ord1.value = (parseInt(ord1.value)-1).toString()
        
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/viewani_last',
        data:{k},
        success:function(res){
            var res1 = res[0]
            var tot = res[1]
            var num = res1._height.length
           
            var elename = []
            emp()
            var pau = element_num
            var sq 
            var icon = document.getElementById('display_design');
            var but1 = document.getElementById('preview_next');
            var but2 = document.getElementById('preview_last');
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

function postnote(){
    var note = document.getElementById("designnode")
    var output = document.getElementById("hidd1")
    var notetext = note.value
    output.value = notetext

    alert("笔记已发布！")
}



function emp(){
    var div = document.getElementById("display_design");
    var but1 = document.getElementById('preview_next');
    var but2 = document.getElementById('preview_last');
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
    $('#play').on('click',function(){
        var fil_path 
        var cpp_path
        var titlet
        var fil = document.getElementById("path_mus");
        var cpp = document.getElementById("cpp_path");
        var til = document.getElementById("case_title");
        var ord = document.getElementById("case_ord");
        var orderr = ord.value
        fil_path = fil.value
        cpp_path = cpp.value
        titlet = til.value
        $.ajax({
        type:'post',
        url:'http://127.0.0.1:64/musicdb',
        data:{fil_path,cpp_path,titlet,orderr},
        success:function(res){
            console.log(res)
            alert("发布成功！")
        },
    })
    })


    
})


$(function() {
    $('#case_menu').on('click',function(){
        $.ajax({
        type:'GET',
        url:'http://127.0.0.1:64/watchcasedb',
        data:{name:'aaa'},
        success:function(res){
            
            if(res[0]){
                for(var i=0;i<res.length;i++){
                alert(res[i])
                }
            }
            else alert("还未创建案例库！")

            
        },
    })
    })


    
})


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




function cancel(){
    gdbnum = 0;
    var output = document.getElementById("output");
   
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