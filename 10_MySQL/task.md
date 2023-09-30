Վերցնել `https://jsonplaceholder.typicode.com/comments` սայտից տվյալները պահել զանգվածով app.js ֆայլում(դասի օրինակով)։
Պետք է ստեղծել հետևյալ URl-ը
get `/comments` => վերադարձնում է բոլոր ՝comments՝-ը
get `/comments/1` => վերադարձնում է բոլոր կոնկրետ id-ով ՝comments՝-ը։Այս օրինակում 1
delete `/comments/13` => ջնջում է բոլոր կոնկրետ id-ով ՝comments՝-ը։Այս օրինակում 13
get `/comments/search?email=<random email>` => գտնում է կոնկրետ փոխանցած `email`-ին պատկանող ՝comments՝-ը, 
delete `/comments/email?email=<random email>` => ջնջում է կոնկրետ փոխանցած `email`-ին պատկանող ՝comments՝-ը, 
get `/comments/search?postId=<random postId>` => վերադարձնում է բոլոր այն ՝comments՝-ը, որոնց id-ն փոխանցենք