var yengin = yengin||require('../source/yengin-2.1.6.js');

/* Components */
var tmp, test = { pass: [], errors: [] };

var is = function (obj) {
    return typeof(obj) !== 'undefined';
};

var isExec = function (fct) {
    try { return (fct(), 1); } catch (e) { return 0; }
};

/* Only Web / Nextjs */
if(['web','nextjs'].indexOf(yengin.mode) >= 0) {

    /*
    *	Web / Nextjs
    */

    /* yengin.support */
    yengin.support();
    test[window.yg?'pass':'errors'].push('support:1');

    yengin.support();
    test[window.yg?'pass':'errors'].push('support:2');

    (tmp={},yengin.support(tmp));
    test[tmp.yg?'pass':'errors'].push('support:3');

    (tmp={yg:false},yengin.support(tmp));
    test[!tmp.yg?'pass':'errors'].push('support:4');

    (tmp={yg:false},yengin.support(tmp, true));
    test[tmp.yg?'pass':'errors'].push('support:5');

    (tmp={yg:false},yengin.support(tmp, false, 'yEngine'));
    test[tmp.yEngine?'pass':'errors'].push('support:6');

    /* yengin.isTouchDevice */
    test[is(yengin.isTouchDevice)?'pass':'errors'].push('isTouchDevice:1');

    /* yengin.getObj */
    test[document.querySelector('body')==yengin.getObj('body')._yengin()?'pass':'errors'].push('getObj:1');

    (tmp = yengin.getObj(document.createElement('div')), document.querySelector('body').appendChild(tmp[0]));
    test[document.querySelector('body')==tmp[0].parentNode?'pass':'errors'].push('getObj:2');

    tmp.css('color','red');
    test[tmp[0].style.color=='red'?'pass':'errors'].push('getObj:3');

    tmp.css({ display: 'inline' });
    test[tmp[0].style.display=='inline'?'pass':'errors'].push('getObj:4');

    tmp.css({ display: 'inline-block' });
    test[tmp.css('display')=='inline-block'?'pass':'errors'].push('getObj:5');

    (document.querySelector('body').style.width='50px', tmp.css({ display: 'block' }));
    test[tmp.getReal('width')=='50px'?'pass':'errors'].push('getObj:6');

    test[!tmp.getClass().length?'pass':'errors'].push('getObj:7');

    tmp.addClass('first');
    test[tmp.getClass().length==1?'pass':'errors'].push('getObj:8');

    tmp.setClass(['first_again','second']);
    test[tmp.getClass().length==2&&tmp.getClass()[0]=='first_again'?'pass':'errors'].push('getObj:9');

    tmp.addClass('third');
    test[tmp.getClass().length==3&&tmp.getClass()[2]=='third'?'pass':'errors'].push('getObj:10');

    test[tmp.hasClass('second')?'pass':'errors'].push('getObj:11');

    test[!tmp.hasClass('four')?'pass':'errors'].push('getObj:12');

    tmp.removeClass('first_again');
    test[tmp.getClass().length==2&&tmp.getClass()[0]=='second'?'pass':'errors'].push('getObj:13');

    (tmp={first: tmp}, tmp.second = yengin.getObj(document.createElement('input')), tmp.first[0].appendChild(tmp.second[0]));
    test[tmp.second.val('pass')&&tmp.second[0].value=='pass'?'pass':'errors'].push('getObj:14');

    test[tmp.second.val()=='pass'?'pass':'errors'].push('getObj:15');

    (tmp.third=yengin.getObj(document.createElement('div')), tmp.first[0].appendChild(tmp.third[0]));
    test[tmp.third.html('testing')&&tmp.third[0].innerHTML=='testing'?'pass':'errors'].push('getObj:16');

    test[tmp.third.html()=='testing'?'pass':'errors'].push('getObj:17');

    test[tmp.third.append('_next')&&tmp.third[0].innerHTML=='testing_next'?'pass':'errors'].push('getObj:18');

    (tmp.four=yengin.getObj(document.createElement('input')), tmp.first.append(tmp.four));
    test[tmp.four[0].parentNode==tmp.first[0]?'pass':'errors'].push('getObj:19');

    test[tmp.third.addChild(tmp.four)&&tmp.four[0].parentNode==tmp.third[0]?'pass':'errors'].push('getObj:20');

    test[tmp.first.addChild(tmp.four[0])&&tmp.four[0].parentNode==tmp.first[0]?'pass':'errors'].push('getObj:21');

}

/*
*	Web / Nextjs / Node.js
*/

/* yengin.warning */
test[isExec(function(){
    yengin.warning('test');
})?'pass':'errors'].push('warning:1');

/* yengin.first */
test[yengin.first([1,2,3])==1?'pass':'errors'].push('first:1');

/* yengin.end */
test[yengin.end([1,2,3])==3?'pass':'errors'].push('end:1');

/* yengin.ord */
test[yengin.ord('y')==121?'pass':'errors'].push('ord:1');

/* yengin.chr */
test[yengin.chr(121)=='y'?'pass':'errors'].push('chr:1');

/* yengin.ucfirst */
test[yengin.ucfirst('yengin')=='Yengin'?'pass':'errors'].push('ucfirst:1');

/* yengin.strRepeat */
test[yengin.strRepeat('y',3)=='yyy'?'pass':'errors'].push('strRepeat:1');

/* yengin.leftPad */
test[yengin.leftPad(' y',' ')=='y'?'pass':'errors'].push('leftPad:1');

/* yengin.rightPad */
test[yengin.rightPad('y ',' ')=='y'?'pass':'errors'].push('rightPad:1');

/* yengin.getAllIndex */
test[yengin.getAllIndex({'test':true})[0]=='test'?'pass':'errors'].push('getAllIndex:1');

/* yengin.isset */
tmp={yengin:true};
test[yengin.isset(tmp.yengin)?'pass':'errors'].push('isset:1');
test[!yengin.isset(tmp.turtle)?'pass':'errors'].push('isset:2');

/* yengin.type */
tmp=[];
test[yengin.type(tmp)=='Array'?'pass':'errors'].push('type:1');
test[yengin.type(tmp,true)=='object'?'pass':'errors'].push('type:2');

/* yengin.istype */
tmp=[];
test[yengin.istype(tmp,'Array')?'pass':'errors'].push('istype:1');
test[yengin.istype(tmp,'object',true)?'pass':'errors'].push('istype:2');

/* yengin.getFctName */
function myFct () { return 1; }
test[yengin.getFctName(myFct)=='myFct'?'pass':'errors'].push('getFctName:1');

/* yengin.quickSortItem */
tmp={obj:{a:5,b:1,c:3},fct:function(a,b){return(a<b?-1:1);}};
Object.keys(yengin.quickSortItem(tmp.obj,tmp.fct)).map(function(key){tmp.test=key;return;});
test[tmp.test=='a'?'pass':'errors'].push('quickSortItem:1');

/* yengin.quickSortArray */
tmp={obj:[1,2,3],fct:function(a,b){return(a>b?-1:1);}};
test[yengin.quickSortArray(tmp.obj,tmp.fct)[0]==3?'pass':'errors'].push('quickSortArray:1');

/* yengin.deepCopy */

/* yengin.shallowCopy */

/*
*	Results
*/

console.log([
    'Unit testing',
    '\nSuccess',
    (test.pass.length)+'/'+(test.pass.length+test.errors.length),
    '(Errors: '+(test.errors.length)+'), report:',
    (test.errors.length?'\nItems:\n-> '+test.errors.join('\n-> '):'no one')
].join(' '));
