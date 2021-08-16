export async function postData(url, obj) {
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
