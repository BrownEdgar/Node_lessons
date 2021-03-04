require("crypto").randomBytes(64).toString("hex")

# RFC = Request for Comments:
JWT- ն սահմանում է ցանցի միջոցով ուղարկվող տեղեկատվության հատուկ կառուցվածք: Այն գալիս է երկու ձևով ՝ սերիականացված և ապասեռալիզացված


Если JWT подписан и/или зашифрован, в заголовке указывается имя алгоритма шифрования. Для этого предназначена заявка alg:
{
   "alg": "HS256"
}

iss – издатель токена;
sub – описываемый объект;
aud – получатели;
exp – дата истечения срока действия;
iat – время создания.

JSON web token в сериализованной форме – это строка следующего формата:

# [ Header ].[ Payload ].[ Signature ]

1. Процесс сериализации JWT состоит из кодирования с помощью алгоритма base64url. 
2. Сначала header и payload приводятся к формату JSON, а затем переводятся в base64:
3. Затем, две эти строки соединяются через точку и хэшируются указанным в header алгоритмом. Допустим, пользователь использует пароль password:
function encode(h, p) {
   const header = base64UrlEncode(JSON.stringify(h));
   const payload = base64UrlEncode(JSON.stringify(p));
   return `${header}.${payload}`;
}

# Чтобы декодировать токен, 
function decode(jwt) {
   const [headerB64, payloadB64] = jwt.split('.');
   const headerStr = base64UrlDecode(headerB64);
   const payloadStr = base64UrlDecode(payloadB64);
   return {
       header: JSON.parse(headerStr),
       payload: JSON.parse(payloadStr)
   };
}

Разумеется, JSON токены не кодируются вручную. Существует множество библиотек, предназначенных для этого. Например, jsonwebtoken:

const jwt = require('jsonwebtoken');
const secret = 'shhhhh';
# шифрование
const token = jwt.sign({ foo: 'bar' }, secret);
#  проверка и расшифровка
const decoded = jwt.verify(token, secret);
console.log(decoded.foo) // bar


# {"alg":"HS256","typ":"JWT"} = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Это можно проверить прям в браузере, выполнив в консоле или js коде:
const header = atob('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
console.log(header);

 # " atob() " ֆունկցաիան իր մեջ ընգունում է JWT "մասնիկներ եվ վեր է աշում նախնական տեսքի․․․․

 Как вы уже могли заметить - первые данные передаются практически в открытом виде и раскодировать их может любой. Но шифровать их нет необходимости. Цель токена - подтвердить, что эти данные не были изменены. Вот для этих целей и выступает сигнатура И чтобы её сгенерировать нужен приватный ключ

 В действительности, Refresh токен обязательно должен быть одноразовым. Его задача - получить новую пару токенов. Как только это было сделано, предыдущий токен будет считаться недействительным. Срок жизни Refresh токена уже может быть большим - до года, а может даже и больше.

# Refresh token
 У него, обычно, нет какой-то структуры и это может быть некая случайная строка.