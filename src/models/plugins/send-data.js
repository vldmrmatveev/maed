export async function postData(email, url) {
	const obj = {
		email,
		time: createDate(),
	};
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(obj),
		});
		if (!response.ok) {
			throw new Error("Нет ответа от сервера");
		}
		return await response.json();
	} catch (err) {
		console.error("Ошибка: " + err);
		return false;
	}
}

function createDate() {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const day = date.getDate();
	const month =
		date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	const year = date.getFullYear();
	return `${hours}:${minutes} ${day}.${month}.${year}`;
}
