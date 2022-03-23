/**
 * 
 * @param {string} a  字符串整数
 * @param {string} b 
 * @returns 返回大整数相加结果
 */
export default function add(a, b) {
  if (!isNumberString(a) || !isNumberString(b)) {
    return new Error('请传入正整数参数');
  }

  // 底位相加，逢十进一
  let carry = 0, result = '';

  let i = a.length - 1;  // 最后一个数字的下标
  let j = b.length - 1;

  // 以小的数字做循环次数 截取高位字符串  
  let highPositionNumber = "", times = 0;

  if (i > j) {
    times = j;
    highPositionNumber = a.substring(0, i - j);
  } else {
    times = i;
    highPositionNumber = b.substring(0, j - i);
  }


  for (let x = 0; x <= times; x++) {
    // 切成数字
    let sum = +a[i - x] + +b[j - x] + carry;

    // 进1  9 + 9  最大也就18
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    // '' + 1  字符串拼接
    result = sum + result;
  }

  // 如果还有进位，高位数也要相加
  if (carry) {
    // 先转换数字相加 再转回字符串
    highPositionNumber = +highPositionNumber + 1 + '';
  }


  return highPositionNumber + result;
}

// 判断正整数
function isNumberString(str) {
  if (typeof str !== 'string') {
    return false;
  }

  if (!(/^[+]?(\d+)$/.test(str))) {
    return false;
  }

  return true;
}

add("100","21")