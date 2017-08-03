/**
 * Created by Administrator on 2016/9/2.
 */
var myText = document.getElementById("myText");  //输入框
var searchBtn = document.getElementById("searchBtn");  //搜索框
var delBtn = document.getElementById("delBtn");  //删除框；
var treeRoot = document.getElementById("root");  //根节点
//var changeImg = document.getElementsByClassName("changeImg");
var myArrow = document.getElementsByClassName("arrow");
var addImg = document.getElementsByClassName("addImg");
var delImg = document.getElementsByClassName("delImg");
var changeImg = document.getElementsByClassName("changeImg");
var myWord = document.getElementsByClassName("myWord");
var myDiv = document.getElementsByTagName("div");
//箭头变换，列表展开与收缩
function changeArrow(e){
        if(this.className == "arrow left_arrow"){
            this.className = "arrow bottom_arrow";
//            alert(this.parentNode.children[0].nodeName)
            for(var i = 0;i<this.parentNode.parentNode.children.length;i++){
                if(this.parentNode.parentNode.children[i].nodeName == 'DIV'){
                    this.parentNode.parentNode.children[i].classList.remove("hideNode");
                }
            }
        }else if(this.className == "arrow bottom_arrow") {
            this.className = "arrow left_arrow";
            for (var i = 0; i < this.parentNode.parentNode.children.length; i++) {
                if (this.parentNode.parentNode.children[i].nodeName == 'DIV') {
                    this.parentNode.parentNode.children[i].classList.add("hideNode");
                }
            }
        }
}
//增加节点
function addDiv(){
    var newHtml = document.createElement(div)
}
//加号减号出现
function imgShow(e){
//    alert("dfa")
    for(var i = 0;i<this.children.length;i++){
        if(this.children[i].nodeName == "IMG"){
            this.children[i].classList.remove("hideNode");
        }
    }
    e.stopPropagation();
}
//加号减号消失
function imgHide(e){
//    alert("dfa")
    for(var i = 0;i<this.children.length;i++){
        if(this.children[i].nodeName == "IMG"){
            this.children[i].classList.add("hideNode");
//            alert(this.children[i].className)
        }
    }
    e.stopPropagation();
}
//点击减号后删除此div元素
function delDiv(e){
//    var flag = false;
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
//    for(var i = 0;i < this.parentNode.children.length;i++ ){
//        if(this.parentNode.children[i].nodeName == 'DIV' ){
//            flag = true;
//        }
//    }

}
function delDiv1(e){
//    alert('d')
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}
function s(e){
    for(var i = 0;i<e.children.length;i++){
//        alert('d')
        if(e.children[i].nodeName == "IMG"){
            e.children[i].classList.remove("hideNode");
        }
    }
    e.stopPropagation();
}
function h(e){
    for(var i = 0;i<e.children.length;i++){
//        alert('d')
        if(e.children[i].nodeName == "IMG"){
            e.children[i].classList.add("hideNode");
        }
    }
    e.stopPropagation();
}
function creEle(){
    var newHtml = document.createElement("div");
    var myInner = "<span class='changeImg' onmouseover='s(this)' onmouseout='h(this)'><span class='myWord'>" +myText.value +"</span><img src='add.png' class='addImg hideNode' onclick='addEle1(this)'/><img src='delete.png' onclick='delDiv1(this)' class='delImg hideNode'/></span>";
    newHtml.innerHTML = myInner;
    return newHtml;
}

//function s(){
//    alert('sd')
//}
//点击加号后添加某元素
function addEle(e){
//    alert("sdf")
    if(myText.value == ''){

        alert("输入框为空，请输入要添加的字符");
    }else if(myText.value != ''&& this.parentNode.children[0].className == 'myWord'){

//        var arrowSpan = "<span class='arrow bottom_arrow'></span>";
        var arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow bottom_arrow";
        this.parentNode.insertBefore(arrowSpan,e.parentNode.firstElementChild);
        var myNode = creEle();
//        alert(myNode.innerHTML)
        this.parentNode.parentNode.appendChild(myNode);
    }else{
        var newNode = creEle();
        this.parentNode.parentNode.appendChild(newNode);
    }

}
function addEle1(e){
//    alert("sdf")
    if(myText.value == ''){

        alert("输入框为空，请输入要添加的字符");
    }else if(myText.value != ''&& e.parentNode.children[0].className == 'myWord'){
//        alert("2")
//        var arrowSpan = "<span class='arrow bottom_arrow'></span>";
        var arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow bottom_arrow";
        arrowSpan.onclick = changeArrow;
        e.parentNode.insertBefore(arrowSpan,e.parentNode.firstElementChild);
        var myNode = creEle();
//        alert(myNode.innerHTML)
        e.parentNode.parentNode.appendChild(myNode);
    }else{
//        alert('3')
        var newNode = creEle();
        e.parentNode.parentNode.appendChild(newNode);
    }

}
//查询节点，并标记
function searchNode(){

    var count = 0;
if(myText.value == ''){
    alert("请输入要匹配的字符");
}else{
    for(var i = 0;i<myWord.length;i++){
        var temp = myWord[i].innerHTML.trim();
        if(myText.value == temp){
            myWord[i].classList.add('flag');
            count++;
        }
    }
    if(count == 0){
        alert('没有找到相同的节点');
    }else{
        alert("找到"+count+"个相同的节点");
    }
}
}
//function delArrow(){
//    var flag = 0;
//    for(var i = 0;i<myDiv.length;i++){
//        for(var j = 0;j<myDiv[i].children.length;i++){
//            if(myDiv[i].children[j].className = 'DIV'){
//                flag++;
//            }
//        }
//        if(flag == 0){
//            myDiv[i].removeChild(myDiv[i].firstElementChild);
//        }
//    }
//}
function init(){

    for(var i = 0;i<delImg.length;i++){
//        alert(delImg.length);
        delImg[i].onclick = delDiv;
    }
    for(var i = 0;i<addImg.length;i++){
        addImg[i].onclick = addEle;
    }
    //为箭头绑定函数
    for(var i = 0;i<myArrow.length;i++){
        myArrow[i].onclick = changeArrow;
    }
    //加号减号的显示和隐藏
    for(var j = 0;j<changeImg.length;j++){
        changeImg[j].onmouseover = imgShow;
        changeImg[j].onmouseout = imgHide;
    }
    searchBtn.onclick = searchNode;

}

init();