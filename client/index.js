/*require.config({ paths: { 'vs': 'E:/software/runcode-main/client/node_modules/monaco-editor/min/vs' }});*/
require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});
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

	var decorations = editor.deltaDecorations(
	[],
	[
		{
			range: new monaco.Range(3, 1, 3, 1),
			options: {
				isWholeLine: true,
				
				className: "myContentClass",
				glyphMarginClassName: "myGlyphMarginClass",
			},
		},
		{
			range: new monaco.Range(4, 1, 4, 1),
			options: {
				isWholeLine: true,
				
				className: "myContentClass",
				glyphMarginClassName: "myGlyphMarginClass1",
			},
		}
	]
	)
})



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
/*	str = str.replaceAll(' ', '&nbsp;')
	str = str.replace(/\n/g,"<br/>")*/
	output.value = str
	alert("保存成功！")

}