jQuery(function($){
    //番号セレクトボックス生成
    var create_bkm_nm = function(e) {
        for(var i=1; i<=20; i++) {
            e.append(`<option value="${i}">${i}</option>`);
        }
    };
    create_bkm_nm($("#bkm_nm_1"));
    
    //判定セレクトボックス生成
    var create_bkm_sv = function(e) {
        e.append(`<option value="0"></option>`);
        e.append(`<option value="1">はい</option>`);
        e.append(`<option value="9">はい(注記)</option>`);
        e.append(`<option value="2">いいえ</option>`);
        e.append(`<option value="3">なし</option>`);
    };
    create_bkm_sv($("#bkm_sv_1"));
    
    //追記箇所セレクトボックスを生成
    var create_bkm_comment_add_point = function(e) {
        e.append(`<option value="front">前</option>`);
        e.append(`<option value="back">後</option>`);
    };
    create_bkm_comment_add_point($("#bkm_comment_add_point_1"));
    
    //行を追加をクリック
    $("#bkm_formgroup_add").on("click", function(){
        //下処理
        var nx = $("#bookmarklet-ui li").length + 1;
        $("#bookmarklet-ui").append("<li>");
        var line = "#bookmarklet-ui li:nth-child(" + nx + ")";
        $(line).attr("class", "form-line");
        $(line).append("<div>");
        $(line + " div").attr("class", "form-group");
        var line_inner = line + " div";
        $(line_inner).append("<div>").append("<div>").append("<div>").append("<div>").append("<div>");
        
        //番号グループ
        var nm_div = line_inner + " div:nth-child(1)";
        $(nm_div).append("<label>");
        $(nm_div + " label").text("番号");
        $(nm_div + " label").attr("for", "bkm_nm_" + nx);
        $(nm_div).append("<select>");
        $(nm_div + " select").attr({
            id: "bkm_nm_" + nx,
            class: "form-control"
        });
        create_bkm_nm($(nm_div + " select"));
        document.getElementById("bkm_nm_" + nx).selectedIndex = (nx-1);
        
        //検査結果グループ
        var sv_div = line_inner + " div:nth-child(2)";
        $(sv_div).append("<label>");
        $(sv_div + " label").text("検査結果");
        $(sv_div + " label").attr("for", "bkm_sv_" + nx);
        $(sv_div).append("<select>");
        $(sv_div + " select").attr({
            id: "bkm_sv_" + nx,
            class: "form-control"
        });
        create_bkm_sv($(sv_div + " select"));
        
        //判定コメントグループ
        var comment_div = line_inner + " div:nth-child(3)";
        $(comment_div).append("<label>");
        $(comment_div + " label").text("判定コメント");
        $(comment_div + " label").attr("for", "bkm_comment_" + nx);
        $(comment_div).append("<div>");
        $(comment_div + " div").attr("class", "form-check form-check-inline");
        var comment_opt_div = comment_div + " div";
        $(comment_opt_div).append("<input>");
        $(comment_opt_div).append("<label>");
        $(comment_opt_div).append("<input>");
        $(comment_opt_div).append("<label>");        
        $(comment_opt_div).append("<input>");        
        $(comment_opt_div).append("<label>");        
        $(comment_opt_div).append("<select>");
        $(comment_opt_div + " input").each(function(idx){
            switch(idx) {
                case 0:
                case 1:
                    $(this).attr({type: "radio", name: "bkm_comment_yes_no_" + nx});
                    break;
                case 2:
                    $(this).attr({type: "checkbox", id: "bkm_comment_add_check_" + nx});
                    break;
            }
        });
        $(comment_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }else {
                $(this).text("追記有効");
                $(this).attr({for: "bkm_comment_add_check_" + nx});
            }
        });
        create_bkm_comment_add_point($(comment_opt_div + " select"));
        $(comment_div).append("<textarea>");
        $(comment_div + " textarea").attr({id: "bkm_comment_" + nx, class: "form-control"});
        
        //対象ソースコードグループ
        var description_div = line_inner + " div:nth-child(4)";
        $(description_div).append("<label>");
        $(description_div + " label").text("対象ソースコード");
        $(description_div + " label").attr("for", "bkm_description_" + nx);
        $(description_div).append("<div>");
        $(description_div + " div").attr("class", "form-check form-check-inline");
        var description_opt_div = description_div + " div";
        $(description_opt_div).append("<input>");
        $(description_opt_div).append("<label>");
        $(description_opt_div).append("<input>");
        $(description_opt_div).append("<label>");
        $(description_opt_div + " input").each(function(idx){
            $(this).attr({type: "radio", name: "bkm_description_yes_no_" + nx});
        });
            $(description_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }
        });
        $(description_div).append("<textarea>");
        $(description_div + " textarea").attr({id: "bkm_description_" + nx, class: "form-control"});
        
        //修正ソースコードグループ
        var srccode_div = line_inner + " div:nth-child(5)";
        $(srccode_div).append("<label>");
        $(srccode_div + " label").text("修正ソースコード");
        $(srccode_div + " label").attr("for", "bkm_srccode_" + nx);
        $(srccode_div).append("<div>");
        $(srccode_div + " div").attr("class", "form-check form-check-inline");
        var srccode_opt_div = srccode_div + " div";
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div + " input").each(function(idx){
            $(this).attr({type: "radio", name: "bmk_srccode_yes_no_regx_" + nx});
        });
            $(srccode_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }else {
                $(this).text("正規表現置換");
            }
        });
        $(srccode_div).append("<div>");
        $(srccode_div + " div + div").attr({class: "form-inline"});
        var regx_div = srccode_div + " div + div";
        $(regx_div).append("<label>").append("<input>").append("<label>").append("<input>");
        $(regx_div + " input").each(function(idx){
            if(idx == 0) {
                $(this).attr({id: "bkm_regx_search_" + nx, class: "form-control"});
            }else if(idx == 1) {
                $(this).attr({id: "bkm_regx_replace_" + nx, class: "form-control"});
            }
        });
        $(regx_div + " label").each(function(idx){
                if(idx == 0) {
                $(this).text("検索文字列");
            }else if(idx == 1) {
                $(this).text("置換文字列");
            }
        });
        $(srccode_div).append("<textarea>");
        $(srccode_div + " textarea").attr({id: "bkm_srccode_" + nx, class: "form-control"});
    });
    


});