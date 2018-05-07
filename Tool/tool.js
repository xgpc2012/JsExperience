(function() {
    Date.prototype.format = function(fmt) {
        var o = {
            "M+" : this.getMonth() + 1, // 月份
            "d+" : this.getDate(), // 日
            "h+" : this.getHours(), // 小时
            "m+" : this.getMinutes(), // 分
            "s+" : this.getSeconds(), // 秒
            "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
            "S" : this.getMilliseconds() // 毫秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }

        return fmt;
    };

    Number.prototype.add = function(arg) {
		var s1 = this.toString(), s2 = arg.toString();
        var r1 = 0, r2 = 0;

        try {
            if (s1.indexOf(".") >= 0) {
                r1 = s1.split(".")[1].length;
            }

            if (s2.indexOf(".") >= 0) {
                r2 = s2.split(".")[1].length;
            }
		} catch (e) {

		}

		var m = Math.pow(10, Math.max(r1, r2));

        return (this * m + arg * m) / m;
	};

    Number.prototype.div = function(arg) {
        var s1 = this.toString(), s2 = arg.toString();
        var t1 = 0, t2 = 0;

        try {
            if (s1.indexOf(".") >= 0) {
                t1 = s1.split(".")[1].length;
            }

            if (s2.indexOf(".") >= 0) {
                t2 = s2.split(".")[1].length;
            }
        } catch (e) {

        }

        var r1 = Number(this.toString().replace(".", ""));
        var r2 = Number(arg.toString().replace(".", ""));

        return (r1 / r2) * Math.pow(10, t2 - t1);
    };

    Number.prototype.formatMoney = function() {
        var s_x = "";

        try {
            if (isNaN(this)) {
                return s_x;
            }

            var f_x = Number(parseInt(this.mul(100))).div(100);
            s_x = f_x.toString();

            var pos_decimal = s_x.indexOf('.');

            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }

            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }

            return s_x;
        } catch (e) {

        }

        return s_x;
    };

    Number.prototype.mul = function(arg) {
        var s1 = this.toString(), s2 = arg.toString();
        var m = 0;

        try {
            if (s1.indexOf(".") >= 0) {
                m += s1.split(".")[1].length;
            }

            if (s2.indexOf(".") >= 0) {
                m += s2.split(".")[1].length;
            }
        } catch (e) {

        }

        var r1 = Number(s1.replace(".", ""));
        var r2 = Number(s2.replace(".", ""));

        return r1 * r2 / Math.pow(10, m);
    };

    Number.prototype.sub = function(arg) {
        return this.add(-arg);
    };

	Number.prototype.toPercent = function() {
		var aa = this.mul(100);
		return "" + aa + "%";
	};

    /**
     * 判断字符串是否以str结尾
     * @param str
     * @returns {boolean}
     */
    String.prototype.endWith = function(str) {
        if (Tools.data.check.isEmpty(str)) return false;
        if (this.substring(this.length - str.length) == str) return true;
        return false;
    };

	String.prototype.hideAddress = function () {
	    var wArray = ["街", "路"];
	    var retStr;

        var pos = 0;

        if (Tools.data.check.isEmpty(this)) {
	        return "";
	    }

	    for (var i = 0; i < wArray.length; i++) {
	        pos = this.indexOf(wArray[i]);

            if (pos > -1) {
	            retStr = "*" + wArray[i] + this.substr(pos + 1);
	            return retStr;
	        }
	    }

	    if (this.length > 10) {
	        retStr = "*" + this.substr(-10);
	    } else {
	        retStr = this.toString();
	    }

	    return retStr;
	};
	
	String.prototype.hideCenter = function() {
	    if (Tools.data.check.isEmpty(this)) {
            return "";
        }

	    var len = this.length - 1;
	    var str = "";

        while (len > 0) {
	        str = str + "X";
	        len--;
	    }

	    return str + this.substr(-1);
	};

    /**
     * 判断字符串是否以str开头
     * @param str
     * @returns {boolean}
     */
    String.prototype.startWith = function(str) {
        if (Tools.data.check.isEmpty(str)) return false;
        if (this.substring(0, str.length) == str) return true;
        return false;
    };
})();

var Base64 = function() {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    this.encode = function(input) {
        var output = "";

        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        var i = 0;

        input = _utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + _keyStr.charAt(enc1)
                + _keyStr.charAt(enc2)
                + _keyStr.charAt(enc3)
                + _keyStr.charAt(enc4);
        }

        return output;
    };

    this.decode = function(input) {
        var output = "";

        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;

        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = _utf8_decode(output);

        return output;
    };

    var _utf8_encode = function(input) {
        var output = "";

        input = input.replace(/\r\n/g, "\n");

        for (var i = 0; i < input.length; i++) {
            var chr = input.charCodeAt(i);

            if (chr < 128) {
                output += String.fromCharCode(chr);
            } else if ((chr > 127) && (chr < 2048)) {
                output += String.fromCharCode((chr >> 6) | 192);
                output += String.fromCharCode((chr & 63) | 128);
            } else {
                output += String.fromCharCode((chr >> 12) | 224);
                output += String.fromCharCode(((chr >> 6) & 63) | 128);
                output += String.fromCharCode((chr & 63) | 128);
            }
        }

        return output;
    };

    var _utf8_decode = function(input) {
        var output = "";

        var i = 0;
        var chr1 = 0, chr2 = 0, chr3 = 0;

        while (i < input.length) {
            chr1 = input.charCodeAt(i);

            if (chr1 < 128) {
                output += String.fromCharCode(chr1);
                i++;
            } else if ((chr1 > 191) && (chr1 < 224)) {
                chr2 = input.charCodeAt(i + 1);
                output += String.fromCharCode(((chr1 & 31) << 6) | (chr2 & 63));
                i += 2;
            } else {
                chr2 = input.charCodeAt(i + 1);
                chr3 = input.charCodeAt(i + 2);
                output += String.fromCharCode(((chr1 & 15) << 12) | ((chr2 & 63) << 6) | (chr3 & 63));
                i += 3;
            }
        }

        return output;
    };
};

var base64 = new Base64();

Tools = {
    arrayToString : function(array) {
        var str = array[0] + "";
        for (var i = 1; i < array.length; i++) {
            str += "," + array[i];
        }
        return str;
    },
	data : {
        check : {
            checkCardNumber : function(cardNumber) {
                if (Tools.data.check.isEmpty(cardNumber)) {
                    UmsApi.notification.toast("请输入或选择银行卡");
                    return false;
                } else if ((("" + cardNumber).length < 13 || ("" + cardNumber).length > 20)) {
                    UmsApi.notification.toast("银行卡卡号位数不正确，请核对后重新输入");
                    return false;
                } else if (!Tools.data.check.isNumber(cardNumber)) {
                    UmsApi.notification.toast("请输入正确的银行卡卡号");
                    return false;
                }
                
                return true;
            },
            checkLength : function(obj, eqLength) {
                try {
                    if( (""+obj).length === eqLength ){
                        return true;
                    }
                } catch (e) {

                }
                return false;
            },
            checkLengthRange : function(obj, minLength, maxLength) {
                try {
                    if( (""+obj).length > minLength && (""+obj).length < maxLength ){
                        return true;
                    }
                } catch (e) {

                }
                return false;
            },
            isArray : function(obj) {
                return Object.prototype.toString.call(obj) == '[object Array]';
            },
            isCardNumberAndUserNameConsistent : function(cardNumber, cardUserName,
                bizSuccessCallbackFunc, bizErrorCallbackFunc) {
                // 检查银行卡号和持卡人姓名是否一致
                if (Tools.data.check.isEmpty(cardNumber)) {
                    UmsApi.notification.toast("银行卡号为空");
                    return;
                }

                if (Tools.data.check.isEmpty(cardUserName)) {
                    UmsApi.notification.toast("持卡人姓名为空");
                    return;
                }

                var param = {};

                param.msgType = "11000031";
                param.cardNo = cardNumber;
                param.cardName = cardUserName;
                param.versionType = "20";

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast(data.errInfo);
                };

                UmsApi.base.call("/v1/mobile/generic/query", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc);
            },
            isCellphone : function(str) {
                return Tools.data.check.isMobile(str) || Tools.data.check.isTelecom(str)
                    || Tools.data.check.isUnicom(str);
            },
            isChinese : function(str) {
                var temp = Tools.data.convert.trim(str);
                if(Tools.data.check.isEmpty(temp)) return false;
                for(var i=0;i<temp.length;i++){
                    var tempChar = temp[i];
                    if (escape(tempChar).indexOf("%u") < 0) return false;
                }
                return true;
            },
            isChineseName : function(str) {
                var temp =  Tools.data.convert.trim(str);
                //如果是中文，且名称是2~4位，则为正式的名称
                if((""+temp).length>1&&(""+temp).length<5&&Tools.data.check.isChinese(temp)){
                    return true;
                }
                return false;
            },
            isEmpty : function(obj) {
                if (obj == null || obj == undefined || ("" + obj) == "") {
                    return true;
                }
                return false;
            },
            isInteger : function(str) {
                var reg = /^[0-9]*[1-9][0-9]*$/;
                return reg.test(str);
            },
            isMobile : function(str) {
                var reg = /^((13[5-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147|178)\d{8})|(134[0-8]\d{7})$/;
                return reg.test(str);
            },
            isMobilePrefix : function(str) {
                var reg = /^(13[5-9]|15[0-2]|15[7-9]|18(7|8|2|3|4)|147|178)|(134[0-8])/;
                return reg.test(str);
            },
            isMoney : function(str) {
                var reg = /^[0-9]*(\.[0-9]{1,2})?$/;
                return reg.test(str);
            },
            isNumber : function(str) {
                var reg = /^[0-9][0-9]*$/;
                return reg.test(str);
            },
            isObject : function(str) {
                if(Tools.data.check.isEmpty(str)) return false;
                return (typeof(str) == "object");
            },
            isPhone : function(str) {
                var reg = /^(((\(\d{2,3}\))|(\d{3}\-))?1[0-9]\d{9})?$/;
                return reg.test(str);
            },
            isPSTN : function(obj) {
                var filter=/^(\d{3,5})-(\d{7,8})(-\d+)?$/;
                return filter.test(obj);
            },
            isRemoteDataRepeat: function (dataList, checkDetail, checkKeys) {
                for (var i = 0; i < dataList.length; i++) {
                    var dataDetail = dataList[i];

                    var checkBoolean = true;

                    for (var j = 0; j < checkKeys.length; j++) {
                        if (checkBoolean) {
                            var key = checkKeys[j];

                            if (dataDetail[key] != checkDetail[key]) {
                                checkBoolean = false;
                            } else {
                                checkBoolean = true;
                            }
                        } else {
                            break;
                        }
                    }

                    if (checkBoolean) return true;
                }

                return false;
            },
            isSuccessApiResult : function(obj) {
                if(!Tools.data.check.isObject(obj)) return false;
                if(obj.callResultStatus=="success"&&obj.errCode=="0000") return true;
                return false;
            },
            isTelecom : function(str) {
                var reg = /^(133|153|180|181|189|177|173|149)\d{8}$/;
                return reg.test(str);
            },
            isTelecomPrefix : function(str) {
                var reg = /^(133|153|180|181|189|177|173|149)/;
                return reg.test(str);
            },
            isUnicom : function(str) {
                var reg = /^(13[0-2]|15(5|6)|185|186|145|176|175)\d{8}$/;
                return reg.test(str);
            },
            isUnicomPrefix : function(str) {
                var reg = /^(13[0-2]|15(5|6)|185|186|145|176|175)/;
                return reg.test(str);
            }
        },
        convert : {
            /**
             * 将input转换为decimal
             * @param input 输入值
             * @param intLength整数部分的最大长度
             * @param decLength 小数部分的最大长度
             * @returns {*}
             */
            input2Decimal : function(input, intLength, decLength) {
                if (Tools.data.check.isEmpty(input)) return input;
                if (input.indexOf(".") == -1) {
                    return Tools.data.convert.input2IntegerWithLength(input, intLength);
                } else {
                    var arr = input.split(".");
                    // 整数部分
                    var intPart = Tools.data.convert.input2IntegerWithLength(arr[0], intLength);
                    // 小数部分
                    var decPart = Tools.data.convert.input2IntegerWithLength(arr[1], decLength);
                    return intPart + "." + decPart;
                }
            },
            /**
             * 将input转换为Integer
             * @param input 输入值
             * @returns {*}
             */
            input2Integer : function(input) {
                if (Tools.data.check.isEmpty(input)) return input;
                return input.replace(/\D/, "");
            },
            /**
             * 将input转换为Integer
             * @param input 输入值
             * @param intLength 整数的最大长度
             * @returns {*}
             */
            input2IntegerWithLength : function(input, intLength) {
                if (Tools.data.check.isEmpty(input)) return input;
                var retVal = Tools.data.convert.input2Integer(input);
                if (Tools.data.check.isInteger(intLength) && retVal.length > intLength) {
                    retVal = retVal.substring(0, intLength);
                }
                return retVal;
            },
            /**
             * 将input转换为money
             * @param input 输入值
             * @returns {*}
             */
            input2Money : function(input) {
                return Tools.data.convert.input2Decimal(input, 8, 2);
            },
            /**
             * 将input转换为String
             * @param input input 输入值
             * @param maxLength 字符串的最大长度
             * @returns {*}
             */
            input2StringWithLength : function(input, maxLength) {
                if (Tools.data.check.isEmpty(input)) return input;
                if (Tools.data.check.isInteger(maxLength) && input.length > maxLength) {
                    return input.substring(0, maxLength);
                }
                return input;
            },
            json2StringWithBase64:function(obj) {
                return this.json2StringWithBase64AndDefault(obj,"");
            },
            json2StringWithBase64AndDefault:function(obj, defaultJsonStr) {
                var jsonStr = defaultJsonStr;
                if(obj!=null&&obj!=undefined){
                    try {
                        jsonStr = base64.encode(JSON.stringify(obj));
                    } catch (e) {

                    }
                }
                return jsonStr;
            },
            obj2Number : function(obj) {
				//去掉空格
				var temp = Tools.data.convert.trim(obj);
				//为空或不是数字则返回空
				if(Tools.data.check.isEmpty(temp)||isNaN(temp)){
				    return "";	
				}
				return Number(temp);
			},
            obj2NumberDefaultZero : function(obj) {
                var temp = this.obj2Number(obj);
                if(Tools.data.check.isEmpty(temp)){
                    temp = Number(0);
                }
                return temp;
            },
            obj2Phone : function(obj) {
                try {
                    if(Tools.data.check.isEmpty(obj)) return "";
                    obj = Tools.data.convert.trim(obj);
                    if (obj.indexOf("+86") != -1) {
                        obj = obj.replace(/\+86/g, "");
                    }
                    if (obj.indexOf("-") != -1) {
                        obj = obj.replace(/\-/g, "");
                    }
                } catch (e) {

                }
                return obj;
            },
            obj2Str : function(obj) {
                if (obj == undefined) {
                    return "";
                } else if (typeof obj == "string") {
                    return obj;
                } else if (typeof obj == "object") {
                    return "Object " + JSON.stringify(obj);
                } else {
                    return obj.toString().replace(/\"\:/g, '":""');
                }
            },
			trim : function(str) {
				if (Tools.data.check.isEmpty(str)) {
					return str;
				} else {
					return ("" + str).replace(/ /g, "");
				}
			}
		},
		date: {
            /**
             * 获取当前日期 yyyy-MM-dd
             * @returns {string}
             */
			getCurrentDate : function() {
				var now = new Date();
				
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				
				month = (month < 10) ? ("0" + month) : month;
				date = (date < 10) ?  ("0" + date) : date;
				
				return year + "-" + month + "-" + date;
			},
            /**
             * 获取当前日期和时间 yyyy-MM-dd HH:mm:ss
             * @returns {string}
             */
			getCurrentDateTime : function() {
				var now = new Date();
				
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				
				month = (month < 10) ? ("0" + month) : month;
				date = (date < 10) ?  ("0" + date) : date;
				
				var hours = now.getHours();
				var minutes = now.getMinutes();
				var seconds = now.getSeconds();
				
				hours = (hours < 10) ?  ("0" + hours) : hours;
				minutes = (minutes < 10) ?  ("0" + minutes) : minutes;
				seconds = (seconds < 10) ?  ("0" + seconds) : seconds;
				
				return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
			},
            /**
             * 获取当前时间 HH:mm:ss
             * @returns {string}
             */
            getCurrentTime : function() {
                var now = new Date();

                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();

                hours = (hours < 10) ?  ("0" + hours) : hours;
                minutes = (minutes < 10) ?  ("0" + minutes) : minutes;
                seconds = (seconds < 10) ?  ("0" + seconds) : seconds;

                return hours + ":" + minutes + ":" + seconds;
            },
            /**
             * 获取两个日期之间的时间差, 以天为单位
             * @param sDate1
             * @param sDate2
             * @returns {Number}
             */
			getDateDiff : function(sDate1, sDate2) {
                var aDate1 = sDate1.split("-");

                var oDate1 = new Date();
                oDate1.setFullYear(parseInt(aDate1[0]));
                oDate1.setMonth(parseInt(aDate1[1]) - 1);
                oDate1.setDate(parseInt(aDate1[2]));

                var aDate2 = sDate2.split("-");

                var oDate2 = new Date();
                oDate2.setFullYear(parseInt(aDate2[0]));
                oDate2.setMonth(parseInt(aDate2[1]) - 1);
                oDate2.setDate(parseInt(aDate2[2]));

                //把相差的毫秒数转换为天数
                var diff = parseInt(Math.abs(oDate1.getTime() - oDate2.getTime()) / 1000 / 60 / 60 /24);

                return diff;
            },
            /**
             * 获取当前时间, 以毫秒为单位
             * @returns {number}
             */
            getSystemCurrentTimeMillis : function() {
				var now = new Date();
				return now.getTime();
			}
		},
		format : {
            /**
             * 将value格式化为decimal
             * @param value 输入值
             * @param zerosToAppend 小数部分不存在时, 小数点后补0的个数, 默认=1
             * @returns {*}
             */
            decimal : function(value, zerosToAppend) {
                zerosToAppend = Tools.data.check.isEmpty(zerosToAppend) ? 1 : zerosToAppend;

                var retVal = Tools.data.convert.trim(value);
                if (retVal.startWith(".")) {
                    retVal = "0" + retVal; // 以"."开头, 则在前面补0
                }
                var posOfDecimal = retVal.indexOf("."); // 取得小数点的位置
                if (posOfDecimal == -1) {
                    retVal = retVal + "."; // 不存在".", 则在后面补上
                }
                posOfDecimal = retVal.indexOf("."); // 再次取得小数点的位置
                while (retVal.length <= posOfDecimal + zerosToAppend) {
                    retVal = retVal + "0";
                }
                while (retVal.startWith("0") && retVal.indexOf(".") != 1) { // 去掉数字开头多余的0
                    retVal = retVal.substring(1, retVal.length);
                }
                return retVal;
            },
            hideCardNumberDetail : function(cardNumber){
                var ret = Tools.data.convert.trim(cardNumber);
                try {
                    if(Tools.data.check.isEmpty(ret)) return ret;
                    ret = String(ret);

                    if (ret.length <= 10) return ret;
                    var prefix = ret.substring(0,6);
                    var suffix = ret.substring(ret.length-4);
                    var len = 6;//ret.length - 6 - 4;

                    ret = prefix;
                    while((len--)>0){
                        ret = ret + "*";
                    }
                    ret = ret + suffix;
                } catch (e) {
                    UmsApi.notification.toast(e.message);
                }
                ret = Tools.data.format.stringWithSpace(ret,4);
                return ret;
            },
            /**
             * 将value格式化为money
             * @param value 输入值
             * @returns {*}
             */
            money : function(value) {
                return Tools.data.format.decimal(value, 2);
            },
            phone : function(value) {
                try {
                    return Tools.data.format.stringWithSpace(value,4,3);
                } catch (e) {

                }
                return value;
            },
			standard : function(value) {
				try {
					return Tools.data.format.stringWithSpace(value,4);
				} catch (e) {
					
				}
				return value;
			},
            stringWithSpace : function(value, splitLen, firstLen) {
                if (Tools.data.check.isEmpty(value)) return value;

                value = Tools.data.convert.trim(value);

                splitLen     = Tools.data.check.isEmpty(splitLen) ? 0 : parseInt(splitLen);
                splitLen     = splitLen < 0 ? 0 : splitLen;
                firstLen     = Tools.data.check.isEmpty(firstLen) ? 0 : parseInt(firstLen);
                firstLen     = firstLen < 0 ? 0 : firstLen;

                var retValue = "";

                for (var i = 0; i < value.length; i++) {
                    retValue += value.split('')[i];
                    if(firstLen>0&&i+1<firstLen){
                        continue;
                    }else if(firstLen>0&&i+1==firstLen){
                        retValue += ' ';
                    }else if ((i-firstLen+1) % splitLen == 0) {
                        retValue += ' ';
                    }
                }
                
                return retValue.trim();
            }
		},
        phone : {
            getCurUserPhone : function() {
                var phone = "";
                try {
                    phone = UmsApi.context.user.mobile;
                } catch (e) {

                }
                return phone;
            },
            getMobileType : function(phone) {
                if (Tools.data.check.isMobile(phone))
                    return "01";
                else if (Tools.data.check.isUnicom(phone))
                    return "02";
                else if (Tools.data.check.isTelecom(phone))
                    return "03";
                else
                    return "";
            },
            getMobileTypeByPrefix : function(phone) {
                if (Tools.data.check.isMobilePrefix(phone))
                    return "01";
                else if (Tools.data.check.isUnicomPrefix(phone))
                    return "02";
                else if (Tools.data.check.isTelecomPrefix(phone))
                    return "03";
                else
                    return "";
            },
            getMobileTypeName : function(phone) {
                var mobileTypeName = "未知运营商";
                var mobileType     = Tools.data.phone.getMobileTypeByPrefix(phone);
                switch(mobileType){
                    case "01":
                        mobileTypeName = "移动运营商";
                        break;
                    case "02":
                        mobileTypeName = "联通运营商";
                        break;
                    case "03":
                        mobileTypeName = "电信运营商";
                        break;
                }
                return mobileTypeName;
            }
        },
        remote : {
            getAccountBalance : function(userCode, acctCode,
                bizSuccessCallbackFunc, bizErrorCallbackFunc,
                customErrorCallbackFunc, customTimeoutCallbackFunc) {
                // 获取账户余额
                if (Tools.data.check.isEmpty(userCode)) {
                    UmsApi.notification.toast("用户号为空");
                    return;
                }

                if (Tools.data.check.isEmpty(acctCode)) {
                    UmsApi.notification.toast("账户号为空");
                    return;
                }

                var param = {};
                param.msgType = "11000381";
                param.userCode = userCode;
                param.acctCode = acctCode;
                param.acctType = "101";
                param.accountPIN = "";
                param.PINFlag = "";

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast(data.errInfo);
                };

                customErrorCallbackFunc = customErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("查询出错");
                };

                customTimeoutCallbackFunc = customTimeoutCallbackFunc || function(data) {
                    UmsApi.notification.toast("网络连接超时");
                };

                UmsApi.base.call("/v1/mobile/storage/query", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc, null,
                    customErrorCallbackFunc, customTimeoutCallbackFunc);
            },
            getPosTongCardList : function(userCode, bizSuccessCallbackFunc,
                bizErrorCallbackFunc, customErrorCallbackFunc, customTimeoutCallbackFunc) {
                // 获取POS通快捷绑卡列表
                if (Tools.data.check.isEmpty(userCode)) {
                    UmsApi.notification.toast("用户号为空");
                    return;
                }

                var param = {};
                param.msgType = "71000353";
                param.userCode = userCode;
                param.businessType = "04";
                param.cardType = "2";

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast(data.errInfo);
                };

                customErrorCallbackFunc = customErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("查询出错");
                };

                customTimeoutCallbackFunc = customTimeoutCallbackFunc || function(data) {
                    UmsApi.notification.toast("网络连接超时");
                };

                UmsApi.base.call("/v1/mobile/storage/query", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc, null,
                    customErrorCallbackFunc, customTimeoutCallbackFunc);
            },
            query : function(dataType, bizSuccessCallbackFunc, bizErrorCallbackFunc,
                customErrorCallbackFunc, customTimeoutCallbackFunc) {
                // 查询个性化数据
                if (Tools.data.check.isEmpty(dataType)) {
                    UmsApi.notification.toast("dataType为空");
                    return;
                }

                var param = {};
                param.dataType = dataType;

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast(data.errInfo);
                };

                customErrorCallbackFunc = customErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("查询出错");
                };

                customTimeoutCallbackFunc = customTimeoutCallbackFunc || function(data) {
                    UmsApi.notification.toast("网络连接超时");
                };

                UmsApi.base.call("/v1/mobile/storage/query", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc, null,
                    customErrorCallbackFunc, customTimeoutCallbackFunc);
            },
            save : function(dataType, dataNo, dataDetail, bizSuccessCallbackFunc,
                bizErrorCallbackFunc, customErrorCallbackFunc, customTimeoutCallbackFunc) {
                // 保存或更新个性化数据
                if (Tools.data.check.isEmpty(dataType)) {
                    UmsApi.notification.toast("dataType为空");
                    return;
                }

                if((typeof dataDetail) != "string")dataDetail=JSON.stringify(dataDetail);

                var param = {};

                param.dataType = dataType;
                param.dataNo = dataNo;
                param.dataDetail = dataDetail;
                param.insertModel = "1";

                bizSuccessCallbackFunc = bizSuccessCallbackFunc || function(data) {
                    UmsApi.notification.toast("保存成功");
                };

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("保存失败");
                };

                customErrorCallbackFunc = customErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("保存出错");
                };

                customTimeoutCallbackFunc = customTimeoutCallbackFunc || function(data) {
                    UmsApi.notification.toast("网络连接超时");
                };

                UmsApi.base.call("/v1/mobile/storage/save", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc, null,
                    customErrorCallbackFunc, customTimeoutCallbackFunc);
            },
            remove : function(dataType, dataNo, bizSuccessCallbackFunc,
                bizErrorCallbackFunc, customErrorCallbackFunc, customTimeoutCallbackFunc) {
                // 删除个性化数据
                if (Tools.data.check.isEmpty(dataType)) {
                    UmsApi.notification.toast("dataType为空");
                    return;
                }

                var param = {};

                param.dataType = dataType;
                param.dataNo = dataNo;

                bizSuccessCallbackFunc = bizSuccessCallbackFunc || function(data) {
                    UmsApi.notification.toast("删除成功");
                };

                bizErrorCallbackFunc = bizErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("删除失败");
                };

                customErrorCallbackFunc = customErrorCallbackFunc || function(data) {
                    UmsApi.notification.toast("删除出错");
                };

                customTimeoutCallbackFunc = customTimeoutCallbackFunc || function(data) {
                    UmsApi.notification.toast("网络连接超时");
                };

                UmsApi.base.call("/v1/mobile/storage/delete", param,
                    bizSuccessCallbackFunc, bizErrorCallbackFunc, null,
                    customErrorCallbackFunc, customTimeoutCallbackFunc);
            }
        }
	},
	dispatchEvent: function(eventName, eventParamStr) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
        event.eventType = "message";
        event.eventParam = JSON.stringify(eventParamStr);
        document.dispatchEvent(event);
	},
    fillAndRequestFromNet: function(uri, sendJson, bizSuccessCallback, bizErrorCallbackFunc,
        customSuccessCallbackFunc, customErrorCallbackFunc, customTimeoutCallbackFunc,
        customCancelCallbackFunc, customProcessFunc) {
        if (Tools.data.check.isEmpty(uri)) {
            UmsApi.notification.toast("uri为空");
            return;
        }

        if (Tools.data.check.isEmpty(sendJson)) {
            UmsApi.notification.toast("sendJson为空");
            return;
        }

        if (Tools.data.check.isEmpty(sendJson.msgType)) {
            UmsApi.notification.toast("sendJson.msgType为空");
            return;
        }

        if (Tools.data.check.isEmpty(bizSuccessCallback)) {
            UmsApi.notification.toast("回调函数为空");
            return;
        }

        UmsApi.base.call(uri, sendJson, bizSuccessCallback, bizErrorCallbackFunc,
            customSuccessCallbackFunc, customErrorCallbackFunc, customTimeoutCallbackFunc,
            customCancelCallbackFunc, customProcessFunc);
    },
    fillAndNavToPaymentView: function(uri, sendJson, customSuccessCallback,
        customErrorCallback, customTimeoutCallback, customCancelCallback) {
        if (Tools.data.check.isEmpty(uri)) {
            UmsApi.notification.toast("uri为空");
            return;
        }

        if (Tools.data.check.isEmpty(sendJson)) {
            UmsApi.notification.toast("sendJson为空");
            return;
        }

        if (Tools.data.check.isEmpty(sendJson.msgType)) {
            UmsApi.notification.toast("sendJson.msgType为空");
            return;
        }

        sendJson.uri = uri;
        sendJson.currencyCode = sendJson.currencyCode || "156"; // 货币编码, 默认为156 = 人民币
        sendJson.supportICCard = Tools.data.check
            .isEmpty(sendJson.supportICCard) ? true : sendJson.supportICCard; // 是否支持IC卡, 默认为true
        sendJson.supportContactless = Tools.data.check
            .isEmpty(sendJson.supportContactless) ? false : sendJson.supportContactless; // 是否支持非接, 默认为false
        sendJson.supportDowngrade = Tools.data.check
            .isEmpty(sendJson.supportDowngrade) ? false : sendJson.supportDowngrade; // 是否允许IC卡降级, 默认为false
        sendJson.supportRevert = Tools.data.check
            .isEmpty(sendJson.supportRevert) ? false : sendJson.supportRevert; // 是否支持冲正, 默认为false
        sendJson.supportSaleSlip = Tools.data.check
            .isEmpty(sendJson.supportSaleSlip) ? true : sendJson.supportSaleSlip; // 是否支持签购单, 默认为true
        sendJson.transactionType = sendJson.transactionType || "1"; // 交易类型, 默认为1 = 支付
        sendJson.rePay = sendJson.rePay || "1";

        UmsApi.page.pay(sendJson, customSuccessCallback, customErrorCallback,
            customTimeoutCallback, customCancelCallback);
    }
};

/**
 * 区域信息
 */
var PublicPayArea = function(cityName, bizType, publicPayConf, areaConf){
    var me = this; //自身实例

    var all = new Array(); //全部数据

    var provinceIndex = -1; //省份索引
    var cityIndex = -1; //城市索引
    var compIndex = -1; //收费单位索引

    this.provinces = new Array(); //省份数组
    this.cities = new Array(); //级联后的城市信息
    this.comps = new Array(); //级联后的收费单位信息

    /**
     * 初始化数组及元素
     */
    this.doInit = function() {
        try {
            var publicPayConfJson = publicPayConf; //公缴对象
            var areaConfJson      = areaConf; //区域对象

            if (Tools.data.check.isEmpty(publicPayConfJson) ||
                Tools.data.check.isEmpty(areaConfJson)) {
                throw "publicPayConfJson or areaConfJson is empty";
            }

            all = getProvince(publicPayConfJson, areaConfJson, cityName); //获取对应省份内部信息,存储到数组中;

            if (all != null && all.length > 0) {
                initByCityName(cityName);
            }

            return me;
        } catch (e) {
            console.log("the publicPayArea doInit is error:" + e);
        }
    };

    this.print = function() {
        var ss = "";

        for (var i = 0; i < all.length; i++) {
            ss += "[" + all[i][0] + "," + all[i][1] + ":";
            var cities = all[i][2];
            for (var j = 0; j < cities.length; j++) {
                ss += "{" + cities[j][0] + "," + cities[j][1] + "," + cities[j][2]
                    + "," + "->";
                var comps = cities[j][3];
                for (var z = 0; z < comps.length; z++) {
                    ss += "<" + comps[z][0] + "," + comps[z][1] + ","
                        + comps[z][2] + "," + comps[z][3] + "," + ">";
                }
                ss += "}";
            }
            ss += "]";
        }
    };

    /**
     * 初始化并得到要展示的省份列表
     */
    this.getSelectProvinces = function() {
        try {
            this.provinces.length = 0;
            for (var i = 0; i < all.length; i++) {
                this.provinces[i] = new Array();
                this.provinces[i][0] = all[i][0];
                this.provinces[i][1] = all[i][1];
            }
            return this.provinces;
        } catch (e) {
            console.log("the publicPayArea getSelectProvinces is error:" + e);
        }
    };

    /**
     * 初始化并得到要展示的城市列表
     */
    this.getSelectCities = function() {
        try {
            this.cities.length = 0;
            var tempCities = all[provinceIndex][2];
            for (var i = 0; i < tempCities.length; i++) {
                this.cities[i] = new Array();
                this.cities[i][0] = tempCities[i][0];
                this.cities[i][1] = tempCities[i][1];
                this.cities[i][2] = tempCities[i][2];
            }
            return this.cities;
        } catch (e) {
            console.log("the publicPayArea getSelectCities is error:" + e);
        }
    };

    /**
     * 初始化并得到要展示的收费单位列表
     */
    this.getSelectComps = function() {
        try {
            this.comps.length = 0;
            var tempCities = all[provinceIndex][2];
            var tempComps = tempCities[cityIndex][3];
            for (var i = 0; i < tempComps.length; i++) {
                this.comps[i] = new Array();
                this.comps[i][0] = tempComps[i][0];
                this.comps[i][1] = tempComps[i][1];
                this.comps[i][2] = tempComps[i][2];
                this.comps[i][3] = tempComps[i][3];
                this.comps[i][4] = tempComps[i][4];
                this.comps[i][5] = tempComps[i][5];
                this.comps[i][6] = tempComps[i][6];
                this.comps[i][7] = tempComps[i][7];
                this.comps[i][8] = tempComps[i][8];
                this.comps[i][9] = tempComps[i][9];
                this.comps[i][10] = tempComps[i][10];
            }
            return this.comps;
        } catch (e) {
            console.log("the publicPayArea getSelectComps is error:" + e);
        }
    };

    /**
     * 得到省份下标
     */
    this.getProvinceIndex = function() {
        return provinceIndex;
    };

    /**
     * 得到城市下标
     */
    this.getCityIndex = function() {
        return cityIndex;
    };

    /**
     * 得到收费单位下标
     */
    this.getCompIndex = function() {
        return compIndex;
    };

    /**
     * 设置省份下标
     */
    this.setProvinceIndex = function(index) {
        try {
            if (this.provinces.length == 0) {
                this.getSelectProvinces();
            }

            index = (Tools.data.check.isEmpty(index) || index > this.provinces.length) ? 0 : index;

            if (provinceIndex != index) {
                provinceIndex = index;
                this.setCityIndex(-1);
            }
        } catch (e) {
            console.log("the publicPayArea setProvinceIndex is error:" + e);
        }
    };

    /**
     * 设置城市下标
     */
    this.setCityIndex = function(index) {
        try {
            this.getSelectCities();

            index = (Tools.data.check.isEmpty(index) || index > this.cities.length) ? 0 : index;

            if (index == -1) {
                cityIndex = 0;
                this.setCompIndex(-1);
            } else if (cityIndex != index) {
                cityIndex = index;
                this.setCompIndex(-1);
            }
        } catch (e) {
            console.log("the publicPayArea setCityIndex is error:" + e);
        }
    };

    /**
     * 得到收费单位下标
     */
    this.setCompIndex = function(index) {
        try {
            this.getSelectComps();

            index = (Tools.data.check.isEmpty(index) || index > this.comps.length) ? 0 : index;

            if (index == -1) {
                compIndex = 0;
            } else if (compIndex != index) {
                compIndex = index;
            }
        } catch (e) {
            console.log("the publicPayArea setCompIndex is error:" + e);
        }
    };

    /**
     * 根据城市名称进行初始化
     */
    var initByCityName = function(cityName) {
        try {
            if (Tools.data.check.isEmpty(cityName)) {
                me.setProvinceIndex(0);
                return;
            }
            for (var i = 0; i < all.length; i++) {
                var cities = all[i][2];
                for (var j = 0; j < cities.length; j++) {
                    if (cities[j][1] == cityName) {
                        me.setProvinceIndex(i);
                        me.setCityIndex(j);
                        return;
                    }
                }
            }
        } catch (e) {
            console.log("the publicPayArea initByCityName is error:" + e);
        }

        me.setProvinceIndex(0);
    };

    /**
     * 得到省份信息
     */
    var getProvince = function(provinceElements,areaElements,cityName) {
        try {
            var provinces = new Array();

            var provinceKeyArray = Object.keys(provinceElements);

            if (provinceKeyArray == null || provinceKeyArray.length <= 0) {
                throw "get province is empty";
            }

            var provinceName = getProvinceName(areaElements,cityName);

            if (Tools.data.check.isEmpty(provinceName)) {
                throw "当前城市不支持该业务";
            }

            for (var i = 0; i < provinceKeyArray.length; i++) {
                // 遍历各省将信息存储到数组中
                if (provinceKeyArray[i] != provinceName) continue;
                var province = createProvinceArray(provinceKeyArray[i]);
                var cityAreaElements = getCityAreaElements(provinceKeyArray[i], areaElements);
                var cities = getCity(provinceElements[provinceKeyArray[i]], cityAreaElements);
                province.push(cities);
                provinces.push(province);
            }
            return provinces;
        } catch (e) {
            console.log("the publicPayArea getProvince is error:" + e);
        }
    };

    /**
     * 得到城市信息
     */
    var getCity = function(cityElements, cityAreaElements) {
        try {
            var cities = new Array();

            for (var i = 0; i < cityAreaElements.length; i++) {
                // 遍历各城市将信息存储到数组中
                var cityArea = cityAreaElements[i];
                if (!checkHasCityPublicPay(cityElements, cityArea)) continue;
                var city = createCityArray(cityElements, cityArea);
                var comps = getComp(cityElements, cityArea);
                city.push(comps);
                cities.push(city);
            }

            return cities;
        } catch (e) {
            console.log("the publicPayArea getCity is error:" + e);
        }
    };

    /**
     * 得到收费单位信息
     */
    var getComp = function(cityElements, cityArea) {
        try {
            var comps = new Array();
            var commonCheck = checkHasCityPublicPayCommon(cityElements, cityArea);
            var defCheck    = checkHasCityPublicPayDefault(cityElements, cityArea);

            if (commonCheck) {
                for (var i = 0; i < cityElements[cityArea.areaName][bizType].length; i++) {
                    var comp = cityElements[cityArea.areaName][bizType][i];
                    comps.push(createCompArray(comp));
                }
            }

            if (defCheck) {
                for (var i = 0; i<cityElements.defaultArea[bizType].length; i++) {
                    var comp = cityElements.defaultArea[bizType][i];
                    comps.push(createCompArray(comp));
                }
            }

            return comps;
        } catch (e) {
            console.log("the publicPayArea getComp is error:" + e);
        }
    };

    /**
     * 创建省份数组
     */
    var createProvinceArray = function(provinceName) {
        var province = new Array();
        province.push("");
        province.push(provinceName);
        return province;
    };

    /**
     * 创建城市数组
     */
    var createCityArray = function(cityElements,cityArea) {
        var city = new Array();
        city.push(""); //areaId
        city.push(cityArea.areaName);
        city.push("0021"); //areaCode
        return city;
    };

    /**
     * 创建收费单位数组
     */
    var createCompArray = function(compElement) {
        var comp = new Array();
        // 生产compId
        comp.push(Tools.data.check.isEmpty(compElement.prodPayCompId) ? "" : compElement.prodPayCompId);
        // 单位名称
        comp.push(Tools.data.check.isEmpty(compElement.compName) ? "" : compElement.compName);
        // 测试compId
        comp.push(Tools.data.check.isEmpty(compElement.testPayCompId) ? "" : compElement.testPayCompId);
        // 支付区域
        comp.push(Tools.data.check.isEmpty(compElement.payAreaCode) ? "" : compElement.payAreaCode);
        // 是否可以溢缴费
        comp.push(compElement.overpaid ? "1" : "");
        // 账单类型
        comp.push(Tools.data.check.isEmpty(compElement.billType) ? "" : compElement.billType);
        // 最小溢缴金额
        comp.push(Tools.data.check.isEmpty(compElement.minOverpaid) ? "" : compElement.minOverpaid);
        // 溢缴金额是否大于等于欠费金额
        comp.push(compElement.overpaidGeUnpaid ? "1" : "");
        // 销账类型
        comp.push(Tools.data.check.isEmpty(compElement.writeOffType) ? "" : compElement.writeOffType);
        // 户号（账单号）的最小长度
        comp.push(Tools.data.check.isEmpty(compElement.minCheckLength) ? "" : compElement.minCheckLength);
        // 户号（账单号）的最大长度
        comp.push(Tools.data.check.isEmpty(compElement.maxCheckLength) ? "" : compElement.maxCheckLength);
        return comp;
    };

    /**
     * 得到城市区域对象
     */
    var getCityAreaElements = function(provinceName, areaElements){
        var retObjAreaNameArray = JSONSelect.match(':has(:root > .areaName:val("'+provinceName+'") )', areaElements);
        var retObjAreaTypeArray = JSONSelect.match(':has(:root > .areaType:val("02") )', retObjAreaNameArray);
        return retObjAreaTypeArray[0].areaChildren;
    };

    /**
     * 校验是否包含对应的公缴
     */
    var checkHasCityPublicPay = function(cityElements,cityArea){
        var commonCheck = checkHasCityPublicPayCommon(cityElements,cityArea);
        var defCheck    = checkHasCityPublicPayDefault(cityElements,cityArea);
        if (commonCheck || defCheck) return true;
        return false;
    };

    /**
     * 校验城市配置中是否包含对应的公缴
     */
    var checkHasCityPublicPayCommon = function(cityElements,cityArea){
        var commonCheck = Tools.data.check.isEmpty(cityElements[cityArea.areaName]);
        if (!commonCheck) return !Tools.data.check.isEmpty(cityElements[cityArea.areaName][bizType]);
        return false;
    };

    /**
     * 校验默认配置中是否包含对应的公缴
     */
    var checkHasCityPublicPayDefault = function(cityElements,cityArea){
        var defCheck = Tools.data.check.isEmpty(cityElements.defaultArea);
        if (!defCheck) return !Tools.data.check.isEmpty(cityElements.defaultArea[bizType]);
        return false;
    };

    /**
     * 得到省份名字
     */
    var getProvinceName = function(areaConfJson,cityName){
        for (var i = 0; i < areaConfJson.length; i++) {
            var areaProvince = areaConfJson[i];

            for (var j = 0; j < areaProvince.areaChildren.length; j++) {
                var areaCity = areaProvince.areaChildren[j];
                if (areaCity.areaName != cityName) continue;
                return areaProvince.areaName;
            }
        }
    };
};