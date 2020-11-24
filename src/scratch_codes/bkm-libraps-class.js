class bkmLibraPlusUtil {
    constructor() {
        this.url = window.location.href;
        this.diag_tbl = document.querySelector('#cmtTable');
        this.result = document.querySelectorAll('select[id^="result_"]');
        this.comment = document.querySelector('textarea[id^="comment"]');
        this.description = document.querySelector('textarea[id^="src_"]');
        this.srccode = document.querySelector('textarea[id^="updsrc_"]');
        this.save_survey_btn = document.querySelector('button[name="update"]');
        this.hash = {
            "0": "未判定",
            "1": "はい",
            "9": "はい(注記)",
            "2": "いいえ",
            "3": "なし"
        };
        this.tab_sp = "<bkmk:tab>";
        this.br_sp = "<bkmk:br>";
        this.data_tab_sp = "<bkmk:data:tab>";
        this.data_br_sp = "<bkmk:data:br>";
        this.status_page_url = "/libraplus/status/list/";
        this.url_select = document.querySelector('#select_urlno');
        this.owner_window = window.opener;
    }
    cursoled_obj() {
        return document.activeElement;
    }
    parent_tr(obj) {
        var parent = null;
        try { parent = obj.parentElement; } catch(e) { return obj; }
        if(obj.tagName.toString() == "TR") return obj;
        else return this.parent_tr(parent);
    }
    is_body(obj) {
        if(obj.tagName.toString() == "BODY") return true;
        else return false;
    }
    diag_ta_group_count() {
        return this.diag_tbl.querySelectorAll('textarea[id^="comment"]').length;
    }
    text_clean(str) {
        str=str.replace(/^ +/m,"");
        str=str.replace(/\t+/m,"");
        str=str.replace(/(\r\n|\r|\n)/g,""); 
        return str;
    }
    br_encode(str) {
        return str.replace(/(\r|\n|\r\n)/mg, this.br_sp);
    }
    br_decode(str) {
        return str.replace(new RegExp(this.br_sp, "mg"), "\r\n");
    }
    get_safe_value(val) {
        if(typeof val === "undefined") return "";
        else return val;
    }
    event_ignite(obj, type) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(type, true, false);
        obj.dispatchEvent(event);
    }
    _single_result() {
        var parent = null;
        if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) {
            if(this.diag_ta_group_count() == 1) parent = document;
            else parent = this.diag_tbl.getElementsByTagName("tr")[1];
        } else {
            parent = this.parent_tr(this.cursoled_obj());
        }
        return parent.querySelectorAll('select[id^="result_"]');
    }
    _single_comment() {
        var parent = null;
        if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;
        else parent = this.parent_tr(this.cursoled_obj());
        return parent.querySelector('textarea[id^="comment"]');
    }
    _single_description() {
        var parent = null;
        if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;
        else parent = this.parent_tr(this.cursoled_obj());
        return parent.querySelector('textarea[id^="src_"]');
    }
    _single_srccode() {
        var parent = null;
        if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;
        else parent = this.parent_tr(this.cursoled_obj());
        return parent.querySelector('textarea[id^="updsrc_"]');
    }
    get_survey_single() {
        var survey_str = "";
        var results = this._single_result();
        for(var i=0; i<results.length; i++) {
            var key = "";
            var opts = results[i].getElementsByTagName("option");
            var idx = results[i].selectedIndex;
            for(var j=0; j<opts.length; j++) {
                var opt = opts[j];
                if(j == idx) {
                    key = opt.value;
                    break;
                }
            }
            if(key != "") survey_str += this.hash[key];
            else survey_str += "";
            if(i != (results.length - 1)) survey_str += "/";
        }
        return survey_str;
    }
    get_survey_key_single(key_val) {
        var ret_key = "";
        for(var key in this.hash) {
            var val = this.hash[key];
            if(key_val == val) {
                ret_key = key;
                break;
            }
        }
        return ret_key;
    }
    get_comment_single() {
        return this._single_comment().value;
    }
    get_description_single() {
        return this._single_description().value;
    }
    get_srccode_single() {
        return this._single_srccode().value;
    }
    set_survey_single(flag) {
        var flag_arr = flag.split(/\//mg);
        var results = this._single_result();        
        for(var i=0; i<results.length; i++) {
            var key = this.get_survey_key_single(flag_arr[i]);
            var opts = results[i].getElementsByTagName("option");
            for(var j=0; j<opts.length; j++) {
                var opt = opts[j];
                if(opt.value == key) {
                    results[i].selectedIndex = j;
                    break;
                }
            }
        }
    }
    set_comment_single(str) {
        this._single_comment().value = str;
    }
    set_description_single(str) {
        this._single_description().value = str;
    }
    set_srccode_single(str) {
        this._single_srccode().value = str;
    }
    set_survey_fill(flag) {
        var all_results = document.querySelectorAll('select[id^="result_"]');
        for(var i=0; i<all_results.length; i++) {
            var key = this.get_survey_key(flag);
            var opts = all_results[i].getElementsByTagName("option");
            for(var j=0; j<opts.length; j++) {
                var opt = opts[j];
                if(opt.value == key) {
                    all_results[i].selectedIndex = j;
                    break;
                }
            }
        }
    }
    set_comment_fill(str) {
        var all_comments = document.querySelectorAll('textarea[id^="comment"]');
        for(var i=0; i<all_comments.length; i++) {
            all_comments[i].value = str;
        }
    }
    set_description_fill(str) {
        var all_descriptions = document.querySelectorAll('textarea[id^="src_"]');
        for(var i=0; i<all_descriptions.length; i++) {
            all_descriptions[i].value = str;
        }
    }
    set_srccode_fill(str) {
        var all_srccodes = document.querySelectorAll('textarea[id^="updsrc_"]');
        for(var i=0; i<all_srccodes.length; i++) {
            all_srccodes[i].value = str;
        }
    }
    diag_clean_single(flag) {
        switch(flag) {
            case "はい":
                this.set_comment_fill("");
                this.set_srccode_fill("");
                break;
            case "なし":
                this.set_comment_fill("");
                this.set_description_fill("");
                this.set_srccode_all_fill("");
                break;
        }
    }
    _all_result(cell) {
        return cell.querySelector('select[id^="result_"]');
    }
    _all_comment(cell) {
        return cell.querySelector('textarea[id^="comment"]');
    }
    _all_description(cell) {
        return cell.querySelector('textarea[id^="src_"]');
    }
    _all_srccode(cell) {
        return cell.querySelector('textarea[id^="updsrc_"]');
    }
    _all_exists_ta(tr) {
        if(tr.querySelectorAll('textarea').length > 0) return true;
        else return false;
    }
    _all_get_text(cell) {
        var txt = cell.innerHTML;
        var pt = new RegExp(/^([^<].+?)(<)/);
        if(pt.test(txt)) {
            return txt.match(pt)[1];
        } else {
            return txt;
        }
    }
    _all_get_survey(cell) {
        var key = "";
        var obj = this._all_result(cell);
        var opts = obj.getElementsByTagName("option");
        var idx = obj.selectedIndex;
        for(var j=0; j<opts.length; j++) {
            var opt = opts[j];
            if(j == idx) {
                key = opt.value;
                break;
            }
        }
        return this.hash[key];
    }
    _all_get_comment(cell) {
        return this._all_comment(cell).value;
    }
    _all_get_description(cell) {
        return this._all_description(cell).value;
    }
    _all_get_srccode(cell) {
        return this._all_srccode(cell).value;
    }
    _all_set_survey(cell, flag) {
        var obj = this._all_result(cell);
        var key = this.get_survey_key_single(flag);
        var opts = obj.getElementsByTagName("option");
        for(var j=0; j<opts.length; j++) {
            var opt = opts[j];
            if(opt.value == key) {
                obj.selectedIndex = j;
                break;
            }
        }
    }
    _all_set_comment(cell, str) {
        this._all_comment(cell).value = str;
    }
    _all_set_description(cell, str) {
        this._all_description(cell).value = str;
    }
    _all_set_srccode(cell, str) {
        this._all_srccode(cell).value = str;
    }
}
let bkm_util = new bkmLibraPlusUtil();