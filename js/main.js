$(function () {
    var todos=[];
    if(localStorage.tododata){
         todos=JSON.parse(localStorage.tododata);
        render();
    }else{
        localStorage.tododata=JSON.stringify(todos);
    }
    function render(){
        var rom=0;
        $('.content-list').empty();
        $.each(todos,function(i,v) {
            rom++;
            if(rom>4){
                rom=0
            }
            $('<li class="items'+ rom +'"><span class="rong">' + v.title + '</span><div class="creat icon-font icon-duihao"></div></li>')
                .addClass(function () {
                    if (v.state) {
                        return 'done'
                    }
                }).appendTo('.content-list')
        })
    }
    function addTodo(text){
        todos.push({
            title:text,
            state:0,
            isDel:0
        })
        localStorage.tododata=JSON.stringify(todos);
        render();
    }
    var nr=$('.write')
    nr.focus();
    $('.add').on('click',function(){
        nr.addClass('ani fade-in-down')
        nr.css('display','block')

    })
    nr.blur(function () {
        addTodo(nr.val());
        nr.css('display','none');
        $('.write').val('');
        render()

    })


    var left=null;
    $('.content-list').on('touchstart','li',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    });
    $('.content-list').on('touchmove','li',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        $(this).css('transform','translate3d('+x+'px,0,0)')
    });

    $('.content-list').on('touchend','li',function(e){
        $(this).css('transform','translate3d(0,0,0)');
        $(this).css('transition','transform .8s ease');
        var n=e.originalEvent.changedTouches[0].pageX;
        if(n>left&&(n-left>40)){
            $(this).addClass('done');
            todos[$(this).index()].state=1;
            localStorage.tododata=JSON.stringify(todos);
            renderFinish()
        }
    })


    //删除
    $('.content-list').on('touchstart','.creat',function(){
        var i=$(this).closest('li').index();
        todos.splice(i,1);
        localStorage.tododata=JSON.stringify(todos);
        $(this).closest('li').addClass('feichu');
        $(this).closest('li').delay(800).queue(function(){
            $(this).remove().dequeue();
        })
    })


    //修改
    var that;
    var ngai=$('.writegai')
    ngai.focus();
    $('.content-list').on('click','.rong',function(){

        $('.make').removeClass('make')
        $(this).addClass('make')
        that=$(this)
        var oldv=$(this).text();
        ngai.addClass('ani zoom-in')
        ngai.css('display','block')
        ngai.val(oldv);
        $(this).text('');
    })
    ngai.blur(function () {
        $('.make').text($(this).val())
        todos[$('.make').closest('li').index()].title=$(this).val();
        localStorage.tododata=JSON.stringify(todos);
        $(this).css('display','none');
        render()
    })

    //选项卡
    var su=$('.finish span');
    var nei=$('.content-box .content');
    su.on('click',function(){
        nei.removeClass('active').eq($(this).index()).addClass('active')
        su.removeClass('active').eq($(this).index()).addClass('active')
    })



    var fitodo=[]
    $.each(todos,function(i,v){
        if(todos[i].state==1){
            fitodo.push(v)
        }
    })
    function renderFinish(){
        //筛选已完成的
        $.each(fitodo,function(i,v) {
            $('<li class="items'+ i +'"><span class="rong">' + v.title + '</span><div class="creat icon-font icon-duihao"></div></li>')
                .addClass(function () {
                    if (v.state) {
                        return 'done'
                    }
                }).appendTo('.succ ul')
        })
    }
    renderFinish()


    //隐藏导航
    var flag=true;
    $('.nav').on('click',function () {
        if(flag){

            $('.choose').addClass('ani fade-in-left');
            $('.choose').css('left','0');
            $('.big-box').css('left','1.6rem');
            flag=false;
        }else{
            $('.choose').removeClass('ani fade-in-left');
            $('.big-box').css('left','0');
            flag=true;
        }
    })

    // $('.big-box').css('display','none')

})


