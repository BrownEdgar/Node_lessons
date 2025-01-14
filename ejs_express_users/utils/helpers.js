import { writeFile } from "fs/promises";
import { resolve } from "path";

export async function writeFileTo(filePath, data) {
	try {
		await writeFile(resolve(filePath), JSON.stringify(data), "utf-8");
		console.log("🟢 File created!");
	} catch (er) {
		console.error("🔴 Failed to create file!", er);
		return res.status(500).json({ message: "Internal server error" });
	}
}
