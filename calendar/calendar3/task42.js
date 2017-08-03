/**
 * Created by Administrator on 2016/11/23.
 */
//不同浏览器兼容为元素绑定函数
function addEvent(element,event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }else{
        element['on'+event] = listener;
    }
}
//创建日历
function calendar(){
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.date = this.now.getDate();
    this.day = this.now.getDay();
    this.start = '';
    this.end = '';
    this.flag = '';
    this.init();
}
calendar.prototype = {
    //执行函数
    init:function(){
        this.setYearMouth(this.year,this.month);
        this.mySetDate();
        this.addLastNext();
        this.setShowTime();
        this.setButton();
    },
    // 创建日期div
    createDate:function(){
        var date = document.createElement('div');
        date.className = 'date_day';
        return date;
    },
    //设置输入框的日期
    setShowTime:function(){
        var showTime = document.querySelector('.showTime');
        var content = document.querySelector('.content');
        this.now.setMonth(this.month);
        this.now.setYear(this.year);
        this.now.setDate(this.date);
        this.day = this.now.getDay();
        var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        showTime.value = this.year+'年'+(this.month+1)+'月'+this.date+'日'+ " "+week[this.day];
        addEvent(showTime,'click',function(){
            alert('d')
            content.classList.toggle('display')
        })
    },
    //设置日历头的年月
    setYearMouth:function(){
        var year_num = document.querySelector('.year');
        var mouth_num = document.querySelector('.mouth');
        year_num.innerHTML = this.year;
        mouth_num.innerHTML = this.month + 1;
    },
    //创建某年某月对应的日期
    mySetDate:function(){
        var days = document.querySelector('.days');
        this.now.setMonth(this.month);
        this.now.setYear(this.year);
        this.now.setDate(1);
        var lastMonth,startDate;
        var endMonth,endDate;
        var day = this.now.getDay();//获取某年某月的1号是星期几
        var lastMonthDays = new Date(this.year, this.month, 0).getDate();//获取上个月的总数
        var monthDays = new Date(this.year, this.month + 1, 0).getDate();//获取当月的总数
        var n = lastMonthDays-day + 1;//上月最后一天的日期
        var clickDate,clickDate1;
        var _this = this;
        for(var i = 0;i<day;i++){
            //设置前一个月在日历中的显示的几天
            var flagLast = false;
            var date = this.createDate();
            date.style.color = 'gray';
            date.innerHTML = n;
            n++;
            days.appendChild(date);
            //绑定函数，点击后可以显示上个月日历
            addEvent(date,'click',function(){
                _this.month--;
                if(_this.month<0){
                    _this.month = 11;
                    _this.year--;
                }
                _this.date = this.innerHTML;
                _this.now.setDate(_this.date);
                var counts = 0;
                if(clickDate1 == undefined) {
                    counts = parseInt(lastMonthDays)-parseInt(this.innerHTML) + 1 + parseInt(clickDate.innerHTML);
                    if (counts > 2 && counts < 21) {
                        clickDate1 = this;
                        var month = _this.month + 2;
                        var year = _this.year;
                        if(_this.month+2 == 13){
                            month = 1;
                            year = _this.year + 1;
                        }
                        _this.start = _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                        _this.end = year + '.' + month + '.' + clickDate.innerHTML;
                        _this.flag = 'lastMonth';
                        _this.clearCalendar();
                        _this.changeMonth();
                    } else {
                        alert('时间跨度不在范围内');
                    }
                }else if(clickDate != undefined && clickDate1 != undefined){
                    counts = parseInt(lastMonthDays)-parseInt(this.innerHTML) + 1 + parseInt(clickDate1.innerHTML);
                    if (counts > 2 && counts < 21) {
                        clickDate = clickDate1;
                        clickDate1 = this;
                        var month = _this.month + 2;
                        var year = _this.year;
                        if(_this.month+2 == 13){
                            month = 1;
                            year = _this.year + 1;
                        }
                        _this.start = _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                        _this.end = year + '.' + month + '.' + clickDate.innerHTML;
                        _this.flag = 'lastMonth';
                        _this.clearCalendar();
                        _this.changeMonth();
                    } else {
                        alert('时间跨度不在范围内');
                    }
                }
            });

        }
        for(var j = 0;j<monthDays;j++){
            var _this = this;
            var date = this.createDate();
            this.now.setDate(j + 1);
            var week = this.now.getDay();
            date.dataset.week = week;
            //如果日期为周六周天，设置不同格式
            if(week == 0 || week == 6){
                date.style.color = '#C81101';
            }else{
                date.style.color = 'black';
            }
            //为当天日期设置不同格式
            if(this.date == j+1){
                clickDate = date;
                date.style.color = 'white';
                date.style.backgroundColor = '#C81101';
            }
            date.innerHTML = j + 1;
            days.appendChild(date);
            //为当月各个日期绑定函数，点击后格式有所不同
            addEvent(date,'click',function(){
                _this.flag = '';
                var counts = 0;
                if(clickDate1 == undefined ) {
                        counts = Math.abs(parseInt(this.innerHTML)-parseInt(clickDate.innerHTML)) + 1;
                        if (counts > 2 && counts < 21) {
                            this.style.color = 'white';
                            this.style.backgroundColor = '#C81101';
                            clickDate1 = this;
                        } else {
                            alert('时间跨度不在范围内');
                        }
                }else if(clickDate != undefined && clickDate1 != undefined){
                    counts = Math.abs(parseInt(this.innerHTML)-parseInt(clickDate1.innerHTML)) + 1;
                    if (counts > 2 && counts < 21) {
                        this.style.color = 'white';
                        this.style.backgroundColor = '#C81101';
                        if(clickDate.dataset.week == 0 || clickDate.dataset.week == 6){
                            clickDate.style.color = '#C81101';
                            clickDate.style.backgroundColor = 'white';
                        }
                        else{
                            clickDate.style.color = 'black';
                            clickDate.style.backgroundColor = 'white';
                        }
                        clickDate = clickDate1;
                        clickDate1 = this;
                    } else {
                        alert('时间跨度不在范围内');
                    }
                }
                var firstEle = clickDate.parentNode.firstElementChild;
                var lastEle = clickDate.parentNode.lastElementChild;
                if(parseInt(clickDate.innerHTML) < parseInt(clickDate1.innerHTML)){
                    var element = clickDate.nextElementSibling;
                    var element1 = clickDate;
                    var element2 = clickDate1;
                    _this.start = _this.year + '.' + (_this.month+1) + '.' + clickDate.innerHTML;
                    _this.end = _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                    while(element != clickDate1){
                        element.style.backgroundColor = '#EBF4F9';
                        element = element.nextElementSibling;
                    }
                    while(element1 != firstEle){
                        element1 = element1.previousElementSibling;
                        element1.style.backgroundColor = 'white';
                        if(element1.style.color == 'white'){
                            element1.style.color = 'gray';
                        }
                    }
                    while(element2 != lastEle){
                        element2 = element2.nextElementSibling;
                        element2.style.backgroundColor = 'white';
                        if(element2.style.color == 'white'){
                            element2.style.color = 'gray';
                        }
                    }
                }else if(parseInt(clickDate.innerHTML) > parseInt(clickDate1.innerHTML)){
                    var element = clickDate1.nextElementSibling;
                    var element1 = clickDate1.previousElementSibling;
                    var element2 = clickDate.nextElementSibling;
                    _this.start = _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                    _this.end = _this.year + '.' + (_this.month+1) + '.' + clickDate.innerHTML;
                    while(element != clickDate){
                        element.style.backgroundColor = '#EBF4F9';
                        element = element.nextElementSibling;
                    }
                    while(element1 != null){
                        element1.style.backgroundColor = 'white';
                        if(element1.style.color == 'white'){
                            element1.style.color = 'gray';
                        }
                        element1 = element1.previousElementSibling;
                    }
                    while(element2 != null){
                        element2.style.backgroundColor = 'white';
                        if(element2.style.color == 'white'){
                            element2.style.color = 'gray';
                        }
                        element2 = element2.nextElementSibling;
                    }
                }
                _this.date = this.innerHTML;
                _this.now.setDate(_this.date);
            })
        }
        var nextMonthDays = 42 - day - monthDays;//下月显示的天数总数
        for(var k = 0;k < nextMonthDays;k++){
            var date = this.createDate();
            date.style.color = 'gray';
            date.innerHTML = k + 1;
            days.appendChild(date);
            //为下月的天数绑定点击函数，点击后显示下月的日历
            addEvent(date,'click',function(){
                _this.month++;
                if(_this.month>11){
                    _this.month = 0;
                    _this.year++;
                }
                _this.date = this.innerHTML;
                var counts = 0;
                if(clickDate1 == undefined) {
                    counts = parseInt(monthDays)-parseInt(clickDate.innerHTML) + 1 + parseInt(this.innerHTML);
                    if (counts > 2 && counts < 21) {
                        clickDate1 = this;
                        var month = _this.month;
                        var year = _this.year;
                        if(_this.month == 0){
                            month = 12;
                            year = _this.year - 1;
                        }
                        _this.start = year + '.' + month + '.' + clickDate.innerHTML;
                        _this.end =  _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                        _this.flag = 'nextMonth';
                        _this.clearCalendar();
                        _this.changeMonth();
                    } else {
                        alert('时间跨度不在范围内');
                    }
                }else if(clickDate != undefined && clickDate1 != undefined){

                    counts = parseInt(monthDays)-parseInt(clickDate1.innerHTML) + 1 + parseInt(this.innerHTML);
                    if (counts > 2 && counts < 21) {
                        clickDate = clickDate1;
                        clickDate1 = this;
                        var month = _this.month;
                        var year = _this.year;
                        if(_this.month == 0){
                            month = 12;
                            year = _this.year - 1;
                        }
                        _this.start = year + '.' + month + '.' + clickDate.innerHTML;
                        _this.end = _this.year + '.' + (_this.month+1) + '.' + clickDate1.innerHTML;
                        _this.flag = 'nextMonth';
                        _this.clearCalendar();
                        _this.changeMonth();
                    } else {
                        alert('时间跨度不在范围内');
                    }
                }
            });
        }
        startDate = this.start.split('.')[2];
        endDate = this.end.split('.')[2];
        if(this.flag == 'lastMonth'){
            var flagEle = days.firstElementChild;
            while(parseInt(flagEle.innerHTML) != 1){
                flagEle = flagEle.nextElementSibling;
            }
            while(parseInt(flagEle.innerHTML) != parseInt(startDate)){
                flagEle = flagEle.nextElementSibling;
            }
            while(parseInt(flagEle.innerHTML) != parseInt(endDate) && flagEle != null){
                flagEle = flagEle.nextElementSibling;
                flagEle.style.backgroundColor = '#EBF4F9';
            }
           if(parseInt(flagEle.innerHTML) == parseInt(endDate)){
               flagEle.style.color = 'white';
               flagEle.style.backgroundColor = '#C81101';
           }
        }
        else if(this.flag == 'nextMonth'){
            var flagEle = days.firstElementChild;
                while( parseInt(flagEle.innerHTML) != parseInt(endDate)){
                    flagEle = flagEle.nextElementSibling;
                }
                while(parseInt(flagEle.innerHTML) != parseInt(startDate) && flagEle != null){
                    flagEle = flagEle.previousElementSibling;
                    flagEle.style.backgroundColor = '#EBF4F9';
                }
                if(parseInt(flagEle.innerHTML) == parseInt(startDate)){
                    flagEle.style.color = 'white';
                    flagEle.style.backgroundColor = '#C81101';
                    flagEle = flagEle.nextElementSibling;
                }
        }
    },
    setButton:function(){
        var sure = document.querySelector("#sure");
        var cancel = document.querySelector("#cancel");
        var showTime = document.querySelector('.showTime');
        var _this = this;
        var content = document.getElementsByClassName('content')[0];
        addEvent(sure,'click',function(){
            alert("选择的时间段为"+_this.start+'-'+ _this.end);
            showTime.value = _this.start+'-'+ _this.end;
                content.classList.toggle('display');
        })
        addEvent(cancel,'click',function(){
            setTimeout(function(){
                    content.classList.toggle('display');
            },600);
        })
    },
    //点击左右切换，月数增减响应函数
    changeMonth:function(){
        this.setYearMouth();
        this.mySetDate();
    },
    //清空日历
    clearCalendar:function(){
        var days = document.querySelector('.days');
        var parent = days.parentNode;
        days.parentNode.removeChild(days);
        var div_days = document.createElement('div');
        div_days.className = 'days';
        parent.appendChild(div_days);
    },
    //为日历抬头的左右箭头绑定增减月份的函数
    addLastNext:function(){
        var lastMonth = document.querySelector('.last');
        var nextMonth = document.querySelector('.next');
        var _this = this;
        //左边箭头点击后，月份减少，日历显示相应月份的日历
        addEvent(lastMonth,'click',function(){
            _this.month--;
            if(_this.month<0){
                _this.month = 11;
                _this.year--;
            }
            _this.now.setMonth(_this.month);
            _this.now.setYear(_this.year);
            _this.now.setDate(_this.date);
            _this.clearCalendar();
            _this.changeMonth();
        });
        //右边箭头点击后，月份增加，日历显示相应月份的日历
        addEvent(nextMonth,'click',function(){
            _this.month++;
            if(_this.month>11){
                _this.month = 0;
                _this.year++;
            }
            _this.now.setMonth(_this.month);
            _this.now.setYear(_this.year);
            _this.now.setDate(_this.date);
            _this.clearCalendar();
            _this.changeMonth();
        })
    }
};
new calendar();