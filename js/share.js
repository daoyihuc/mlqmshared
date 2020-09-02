
var msg_id;
var  share_value;
$(function() {
    var  layer=layui.layer;
    share_value= getQueryVariable("id")
    $("#code_shar").val(share_value);
    $('#codes').click(function () {
        // alert("dsds");
        var  phone_value = $("#phone").val();
        var  code_value = $("#code_e").val();
        var  share_value = getQueryVariable("");
        console.log("dsd");

        var isnull1 = isnull(phone_value);
        if(isnull1){
            var is_phone = isPhone(phone_value);
            if(is_phone){
                code_ud();
                http_code(phone_value);
            }else{
                layer.msg("请输入正确的手机号");
            }
        }else {
            layer.msg("手机号不能为空");
        }

    });
    $("#sumbit").click(function () {
         var phone_value = $("#phone").val();
         var code_value = $("#code_e").val();
         var share_value = getQueryVariable("id");

        var isnull1 = isnull(phone_value);
        var isnull2=isnull(code_value);
        if(isnull1){
            var is_phone = isPhone(phone_value);
            if(is_phone){
                if(isnull2){
                    http_sumbit(phone_value,code_value,msg_id,share_value);
                    console.log("ddds");
                }else{
                    layer.msg("验证码不能为空");
                }
            }else{
                layer.msg("请输入正确的手机号");
            }
        }else {
            layer.msg("手机号不能为空");
        }


    })
});
var number=60;
var css_code_en={
    "padding": "0",
    "outline": "none",
    "background-color": "#32A4FE",
    "color": "white",
    "padding": "0px 10px 0px 10px",
    "box-shadow": "0px 2px 24px 0px #32A4FE",
    "border-radius": "45px",
    "height": "30px!important",
    /*line-height: 30px!important;*/
    "font-size": "14px",
    "font-weight": "500",
    "color":" #FFFFFF",
    "justify-items": "center",
}
var css_code_en_n={
    "padding": "0",
    "outline": "none",
    "background-color": "#9498a1",
    "color": "white",
    "padding": "0px 10px 0px 10px",
    "box-shadow": "0px 2px 24px 0px #32A4FE",
    "border-radius": "45px",
    "height": "30px!important",
    /*line-height: 30px!important;*/
    "font-size": "14px",
    "font-weight": "500",
    "color":" #FFFFFF",
    "justify-items": "center",
}
//验证码
function code_ud() {
    var code_up=setInterval(function () {
        if(number===0){
            clearInterval(code_up);
            $("#codes").val("验证码");
            $("#codes").attr("disabled","false");
            $("#codes").css(css_code_en);
            number=60;
        }else{
            $("#codes").val("验证码("+number+")")
            $("#codes").attr("disabled","true");
            $("#codes").css(css_code_en_n);
            number--;
        }


    },1000);

}




function isnull(v) {
    if(v==null||v==""){
        return false;
    }else{
        return true;
    }
}
function isPhone(v) {
    if(!(/^1[3456789]\d{9}$/.test(v))){
        // alert("手机号码有误，请重填");
        return false;
    }else{
        return true;
    }
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            return pair[1];
        }
    }
    return(false);
}
function http_code(phone) {

    $.ajax({
        type: "GET",
        url: "https://mlqms.shenghuang365.com/api/wxapp/Public/SendSms",
        data: {
            "mobile": phone
        },
        dataType: "json",
        success: function(data){
            console.log(data.data.msg_id);
            // data.getData().msg_id;
            msg_id=data.data.msg_id;
        }
    });
}
function http_sumbit(phone,code,msg_id,share_value) {

    $.ajax({
        type: "POST",
        url: "https://mlqms.shenghuang365.com/api/wxapp/Public/OneClickLogin",
        data: {
            "mobile": phone,
            "code": code,
            "msg_id": msg_id,
            "inviteall": share_value
        },
        dataType: "json",
        success: function(data){
            console.log(data.msg);
            window.location.href="https://mlqms.shenghuang365.com/mlqm.apk";
        },
        error:function (e) {

        }
    });
}