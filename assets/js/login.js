$(function () {
    // 点击去注册的事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()


    })
    // 点击去登陆
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()


    })
    // 从layui中获取form对象
    var form = layui.form
    // layui内置对象

    var layer = layui.layer
    form.verify({
        pwd:
            [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
        //   检验再次输入密码
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'

            }

        }
    })

    // 监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', 
        data,
         function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            
            $('#link_login').click()
        })

    })


    // 登陆
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'http://www.liulongbin.top:3007/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')

                localStorage.setItem('token',res.token)

                location.href='/index.html'
            }
        })
    })
    


    


})


