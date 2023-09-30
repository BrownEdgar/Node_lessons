const socket = io();
$(function () {
	let $messageform = $('#messageform');
	let $userForm = $('#userForm');
	let $username = $('#username');
	let $users = $('#users');
	let $main = $('#main');
	$('form').on('submit', function (e) {
		e.preventDefault();
		socket.emit('chat message', $('#m').val()); // ստանում ենք 'chat message'-ի հաղորդագրությունը
		$('#m').val(''); // մաքրում ենք "input"- ը ուղարկելուց հետո
		return false;
	});
	socket.on('chat message', function (msg) {
		console.log('msg', msg)
		if (msg !== '') {
			$('#messages').append($('<li>').text(msg));
		}
	});

	$userForm.on('submit', function (e) {
		e.preventDefault();
		socket.emit('new user', $username.val(), function (data) {
			console.log('data', data)
			if (data) {
				$userForm.fadeOut(100);
				$main.fadeIn(100)
			}
		});
		$username.val('');
		return false;
	});
	socket.on('get users', function (data) {
		console.log("data", data);
		let html = '';
		for (let i = 0; i < data.length; i++) {
			html += `<li>${data[i]}</li>`
		}
		$users.html(html)
	})
	socket.on('news', function (data) {
		console.log('news', data);
	})
});

