$(function() {
    var  layer=layui.layer;


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
                http_code();
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
         var share_value = getQueryVariable("");

        var isnull1 = isnull(phone_value);
        var isnull2=isnull(code_value);
        if(isnull1){
            var is_phone = isPhone(phone_value);
            if(is_phone){
                if(isnull2){
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

        }
    });
}
function http_sumbit(phone,code,msg_id) {

    $.ajax({
        type: "POST",
        url: "https://mlqms.shenghuang365.com/api/wxapp/Public/OneClickLogin",
        data: {
            "mobile": phone,
            "code": code,
            "msg_id": msg_id
        },
        dataType: "json",
        success: function(data){

        },
        error:function (e) {

        }
    });
}