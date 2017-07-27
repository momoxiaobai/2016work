/**
 * Created by Administrator on 2016/11/18.
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
    this.init();
}
calendar.prototype = {
    //执行函数
    init:function(){
        this.setYearMouth(this.year,this.month);
        this.mySetDate();
        this.addLastNext();
    },
    // 创建日期div
    createDate:function(){
        var date = document.createElement('div');
        date.className = 'date_day';
        return date;
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
        var day = this.now.getDay();//获取某年某月的1号是星期几
        var lastMonthDays = new Date(this.year, this.month, 0).getDate();//获取上个月的总数
        var monthDays = new Date(this.year, this.month + 1, 0).getDate();//获取当月的总数
        var n = lastMonthDays-day + 1;//上月最后一天的日期
        for(var i = 0;i<day;i++){
            //设置前一个月在日历中的显示的几天
            var _this = this;
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
                _this.now.setMonth(_this.month);
                _this.now.setYear(_this.year);
                _this.clearCalendar();
                _this.changeMonth();
            });

        }
        for(var j = 0;j<monthDays;j++){
            var _this = this;
            var date = this.createDate();
            var clickDate;
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
                if(clickDate.dataset.week == 0 || clickDate.dataset.week == 6){
                    clickDate.style.color = '#C81101';
                    clickDate.style.backgroundColor = 'white';
                }else{
                    clickDate.style.color = 'black';
                    clickDate.style.backgroundColor = 'white';
                }
                this.style.color = 'white';
                this.style.backgroundColor = '#C81101';
                clickDate = this;
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
                _this.now.setMonth(_this.month);
                _this.now.setYear(_this.year);
                _this.clearCalendar();
                _this.changeMonth();
            });
        }
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
            _this.clearCalendar();
            _this.changeMonth();
        })
    }
};
new calendar();
