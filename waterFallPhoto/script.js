/**
 * Created by Administrator on 2016/12/1.
 */
window.onload = function(){
   new  waterFull(4,30);
    var addColumn = document.getElementById('add');
    var deleteColumn = document.getElementById('delete');
    var num = 4;
    var _this = this;
}

function waterFull(columnNum,columnDistance){
    this.container = document.getElementById('container');
    this.columnHeight = new Array(columnNum);//每一列的最新高度;
    this.columnNum = columnNum;
    this.columnDistance = columnDistance;
    this.init();
}
waterFull.prototype = {
    init:function(){
        this.setSecondLineBox();
        this.setScroll();
        this.setColumnNum();
        this.addBoxClick();
        this.cover();
    },
    setSecondLineBox:function(){
        var boxWidth = this.container.offsetWidth;//整个盒子的宽度
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var num = this.columnNum;
        var minHeight = 0;
        var minColumnIndex;
        for(var i = 0;i<this.container.children.length;i++){
            var oneBoxWidth = Math.floor(boxWidth/num - this.columnDistance);
            this.container.children[i].style.width = oneBoxWidth + 'px';
            this.container.children[i].style.paddingLeft = this.columnDistance + 'px';
            if(i<num){
                this.columnHeight[i] = this.container.children[i].offsetHeight;
                this.container.children[i].style.position = 'static';
            }else if(i >= num){
                minHeight = Math.min.apply(null,this.columnHeight);
                minColumnIndex = this.findMinHeightIndex();
                this.container.children[i].style.position = 'absolute';
                this.container.children[i].style.top = minHeight + 'px';
                this.container.children[i].style.left = (oneBoxWidth+this.columnDistance)*(minColumnIndex) + 'px';
                this.columnHeight[minColumnIndex] += this.container.children[i].offsetHeight;
            }
        }
    },
    setScroll:function(){
        var imgSrc = ['60.jpg','61.jpg','62.jpg','63.jpg','64.jpg','65.jpg',
        '66.jpg','67.jpg','68.jpg','69.jpg','70.jpg'];
        var _this = this;
        window.onscroll = function(){
            var minColumnHeight = Math.min.apply(null,_this.columnHeight);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var minHeightIndex;
            var boxWidth = _this.container.offsetWidth;
            var oneBoxWidth = Math.floor(boxWidth/_this.columnNum - _this.columnDistance);
            if((scrollTop + clientHeight) > (minColumnHeight)){
                for(var i = 0;i<imgSrc.length;i++){
                    var box = document.createElement('div');
                    box.className = 'box';
                    var boxInnerHtml = "<div class='box_img'><img src='images/"+imgSrc[i]+"'></div>";
                    box.innerHTML = boxInnerHtml;
                    _this.container.appendChild(box);
                    minHeightIndex = _this.findMinHeightIndex();
                    box.style.width = oneBoxWidth + 'px';
                    box.style.paddingLeft = _this.columnDistance + 'px';
                    box.style.position = 'absolute';
                    box.style.top = _this.columnHeight[minHeightIndex] + 'px';
                    box.style.left = (oneBoxWidth+_this.columnDistance)*minHeightIndex + 'px';
                    _this.columnHeight[minHeightIndex] += box.offsetHeight;
                }

            }
            _this.cover();
        }
    },
    findMinHeightIndex:function(){
        var minHeight = Math.min.apply(null,this.columnHeight);
        var minColumnIndex;
        for(var j = 0;j<this.columnHeight.length;){
            if(this.columnHeight[j] == minHeight){
                minColumnIndex = j;
                break;
            }else{
                j++;
            }
        }
        return minColumnIndex;
    },
    setColumnNum:function(){
        var addColumn = document.getElementById('add');
        var deleteColumn = document.getElementById('delete');
        var _this = this;
        addColumn.onclick = function(){

          if(_this.columnNum > 19){
              alert('不能再增加列了');
          }else{
              _this.columnNum++;
              _this.columnHeight = new Array(_this.columnNum);
              _this.setSecondLineBox();
          }
        }
        deleteColumn.onclick = function(){

            if(_this.columnNum < 2){

                alert('不能再减少列了');
            }else{
                _this.columnNum--;
                _this.columnHeight = new Array(_this.columnNum);
                _this.setSecondLineBox();
            }
        }
    },
    addBox:function(imgSrc){
            var minColumnHeight = Math.min.apply(null,this.columnHeight);
            var minHeightIndex;
            minHeightIndex = this.findMinHeightIndex();
            var boxWidth = this.container.offsetWidth;
            var oneBoxWidth = Math.floor(boxWidth/this.columnNum - this.columnDistance);
                    var box = document.createElement('div');
                    box.className = 'box';
                    var boxInnerHtml = "<div class='box_img'><img src='images/"+imgSrc+"'></div>";
                    box.innerHTML = boxInnerHtml;
                    this.container.appendChild(box);
                    box.style.width = oneBoxWidth + 'px';
                    box.style.paddingLeft = this.columnDistance + 'px';
                    box.style.position = 'absolute';
                    box.style.top = this.columnHeight[minHeightIndex] + 'px';
                    box.style.left = (oneBoxWidth+this.columnDistance)*minHeightIndex + 'px';
                    this.columnHeight[minHeightIndex] += box.offsetHeight;
        this.cover();

    },
    addBoxClick:function(){
        var addBox = document.getElementById('addBox');
        var _this = this;
        addBox.onclick = function(){
            var img_src;
            img_src = Math.floor(Math.random()*90 + 0) + '.jpg';
            _this.addBox(img_src);
        }
    },
    cover:function(){
        var cover = document.getElementsByClassName('cover')[0];
        cover.onclick = function(e){
            cover.style.display = 'none';
        }
        var box_img = document.getElementsByClassName('box_img');
        for(var i = 0;i<box_img.length;i++){
            box_img[i].onclick = function(){
               var imgBox = this.cloneNode(true);
                imgBox.onclick = function(e){
                    cover.style.display = 'block';
                    e.stopPropagation();
                }
                imgBox.classList.add('imgBox');
                imgBox.style.left = ((document.documentElement.clientWidth || document.body.clientWidth)-300)/2 + 'px';
                imgBox.style.top = ((document.documentElement.clientHeight || document.body.clientHeight)-300)/2 + 'px';
                cover.style.display = 'block';
                if(cover.children.length != 0){
                    cover.removeChild(cover.firstElementChild);
                }
                cover.appendChild(imgBox);
            }
        }
    }
}
