const table = document.getElementsByTagName('table')[0];
const tbody = document.getElementsByTagName('tbody')[0];

// MYSQL TYPES AND EXAMPLES
// DATETIME  || ex. transaction_date DATETIME DEFAULT NOW() || 2023-10-22 14:36:46
// DESIMAL  || ex. transaction_date DESIMAL(4, 2) || 3.99


//LINKS
// https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html

fetch('./comands.json')
  .then(res => res.json())
  .then(renderData)

function renderData(data) {
  console.log('data', data)
  const fragment = data.map((elem, index) => {
    return `
      <tr>
        <td data-cell="id">${index + 1}</td>
        <td data-cell="commads" class="commads">
        <span class="keyword">${elem?.keyword || "N/A"}</span>
        <span class="code">
          ${elem.mysql_command}
        </span>
        </td>
        <td data-cell="desc" colspan="2" class="desc">${elem.description}</td>
        <td data-cell="example" class="example">
        ${elem.example ? `<code>${elem.example}</code>` : ''}
        </td>
      </tr>`
  }).join('')
  tbody.insertAdjacentHTML('beforeend', fragment)
}

// // v14.6.2 Mathematical Functions
// // Name	Description
// ABS()	    Return the absolute value
// ACOS()	  Return the arc cosine
// ASIN()	  Return the arc sine
// ATAN()	  Return the arc tangent
// ATAN2()   Return the arc tangent of the two arguments
// ATAN()	  Return the arc tangent of the two arguments
// CEIL()	  Return the smallest integer value not less than the argument
// CEILING()	Return the smallest integer value not less than the argument
// CONV()	  Convert numbers between different number bases
// COS()	    Return the cosine
// COT()	    Return the cotangent
// CRC32()	  Compute a cyclic redundancy check value
// DEGREES()	Convert radians to degrees
// EXP()	    Raise to the power of
// FLOOR() 	Return the largest integer value not greater than the argument
// LN()	    Return the natural logarithm of the argument
// LOG()	    Return the natural logarithm of the first argument
// LOG10() 	Return the base - 10 logarithm of the argument
// LOG2()	  Return the base - 2 logarithm of the argument
// MOD()	    Return the remainder
// PI()	    Return the value of pi
// POW()	    Return the argument raised to the specified power
// POWER()	  Return the argument raised to the specified power
// RADIANS()	Return argument converted to radians
// RAND()	  Return a random floating - point value
// ROUND()	  Round the argument
// SIGN()	  Return the sign of the argument
// SIN()	    Return the sine of the argument
// SQRT()	  Return the square root of the argument
// TAN()	    Return the tangent of the argument
// TRUNCATE()Truncate to specified number of decimal places


//COUNT()