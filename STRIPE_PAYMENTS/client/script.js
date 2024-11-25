const button = document.querySelector("button")
button.addEventListener("click", () => {
  fetch("http://localhost:3333/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 2, quantity: 1 },
        { id: 1, quantity: 1 }
      ],
    }),
  })
    .then(res => {
      console.log('res', res)
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e)
    })
})
