"use strict"

const deleteButton = document.querySelector(".fa-trash")


deleteButton.addEventListener("click", (e) => {

	const id = e.target.dataset.id
	fetch(`http://localhost:3000/posts/delete/${id}`, {
		method: "delete",
	})
		.then(response => {
			if (response.status === 200) {
				location.assign('/posts')
			}
		})
		
})