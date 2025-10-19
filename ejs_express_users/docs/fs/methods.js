////////////////////////////////////////////////////////////////////////////////////////
// 🟩 ֆայլ
// 1️⃣ writeFile-ը գրում է ֆայլի մեջ, եթե ֆայլը չկա ստեղծում է։
// 2️⃣ unlink-ը ջնջում է ֆայլը։
// 3️⃣ rename-ը անվանափոխում է ֆայլը։
// 4️⃣ readFile-ը կարդում է ֆայլը։
// 5️⃣ appendFile-ը սարքում է ֆայլ կամ եթե կա՝ վերջից ավելացնում
// 6️⃣ open(path, flag, mode)
// 7️⃣ access(path, mode)
// 🟩 թղթապանակ
// 1️⃣ mkdir-ը ստեղծում է թղթապանակ, եթե կա => error
// 2️⃣ rmdir-ը ջնջում է թղթապանակ, եթե դատարկ չէ || չկա => error
// 3️⃣ readdir-ը կարդում է թղթապանակը
////////////////////////////////////////////////////////////////////////////////////////

// FILE ////////////////////////////////////////////////////////////////////////////////
// 1️⃣
// fs.promises
// 	.writeFile(join(__dirname, "/src/file.txt"), "Hello")
// 	.then(() => console.log("🟢 File created!"))
// 	.catch((err) => console.error("🔴 Failed to create FILE!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 2️⃣
// fs.promises.unlink(join(__dirname, "/src/newFile.txt"))
//   .then(() => console.log("🟢 FILE deleted!"))
//   .catch((err) => console.error("🔴 Failed to delete FILE!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 3️⃣
// fs.promises
// 	.rename(join(__dirname, "/src/oldFile.txt"), join(__dirname, "/src/newFile.txt"))
// 	.then(() => console.log("🟢 FILE renamed!"))
// 	.catch((err) => console.error("🔴 Failed to rename FILE!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 4️⃣
// fs.promises.readFile(join(__dirname, "/src/file.txt"), "utf-8")
//   .then((data) => console.log(`🟢 ${data}`))
//   .catch((err) => console.error("🔴 Failed to read FILE!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 5️⃣
// fs.promises.appendFile(join(__dirname, "/src/file.txt"), "Hello", "utf-8")
//   .then((data) => console.log(`🟢 ${data}`))
//   .catch((err) => console.error("🔴 Failed to append file!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 6️⃣
// fs.promises.open("input.txt", "w", 0o666)
//   .then((data) => console.log(`🟢 File is opened`))
//   .catch((err) => console.error("🔴 Failed to open file!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 7️⃣
// fs.promises.access("input.txt", fs.constants.(F_OK|R_OK|W_OK|X_OK))
////////////////////////////////////////////////////////////////////////////////////////

// Directory ///////////////////////////////////////////////////////////////////////////
// 1️⃣
// fs.promises
// 	.mkdir(join(__dirname, "/test"))
// 	.then(() => console.log("🟢 DIRECTORY created!"))
// 	.catch((err) => console.error("🔴 Failed to create DIRECTORY!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 2️⃣
// fs.promises.rmdir(join(__dirname, "/test"))
//   .then(() => console.log("🟢 DIRECTORY removed!"))
//   .catch((err) => console.error("🔴 Failed to remove DIRECTORY!", err));
////////////////////////////////////////////////////////////////////////////////////////
// 3️⃣
// fs.promises
// 	.readdir(join(__dirname, "/src"), "utf-8")
// 	.then((data) => console.log(data))
// 	.catch((err) => console.error("🔴 Failed to read DIRECTORY!", err));
////////////////////////////////////////////////////////////////////////////////////////
