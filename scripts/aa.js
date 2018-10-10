/*

sadsdf(asdfas)(asdfads)sdf
dsafdaff(adfa(asdfs

*/


var position;
var bool;

var test = function(param){
    for (let index = 0; index < param.length; index++) {

        if(param[index] == '(') position++
        if(param[index] == ')') position--

        if(position < 0 ) {
            return
        }
    }
    if(position == 0) bool = true;

    return bool;
}

test('vladimir(jhbjh)ijhjk')
