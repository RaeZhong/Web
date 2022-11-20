var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    //初始化函数，让相关元素绑定事件
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    //切换
    toggleTab() {
        //console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'
    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //添加
    addTab() {
        that.clearClass();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">新选项卡</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
        //父元素最后追加
    }
    //删除
    removeTab(e) {
        //event.stopPropagation () 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。
        e.stopPropagation(); //阻止冒泡 防止触发li的点击切换事件
        var index = this.parentNode.index;
        that.lis[index].remove(); //remove()方法可以直接删除指定元素
        that.sections[index].remove();
        that.init();
        if (document.querySelector('.liactive')) return;
        index--;
        that.lis[index].click(); //自动触发点击事件
        that.lis[index] && that.lis[index].click(); //非0为真
    }
    //修改
    editTab() {
        var str = this.innerHTML;
        //双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里文字处于选定状态
        input.onblur = function () { // onblur 事件发生在对象失去焦点时
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup=function(e){//onkeyup 属性在用户（在键盘上）释放按键时触发
            if(e.keyCode===13){//13对应键盘回车
                this.blur();
            }
        }
    }
}

var tab = new Tab('#tab');