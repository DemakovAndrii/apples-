import React, { useState } from "react";

export default function App() {
	const [input, setInput] = useState("");
	const [res, setRes] = useState("");
	const text = `I had :apple: :apple: :apple: :apple: :apple:  . <@Viktor> & <@Kate> took :apple: :apple: and later <@Viktor> took again :apple: but not <@Kate>`;
	
	const changeText = (e) => {
		setInput(e.target.value);
	};
	const test = (e) => {
		e.preventDefault();

		const regExp = /([^<@\>]+(?=>))|(:\w+:)/g;
		const inputValue = input.match(regExp);

		let lastUser = "";
		let apples = 0;

		const res = inputValue.reduceRight((newObj, word, index) => {
			if (word.startsWith(":")) {
				if (word.includes("apple")) {
					apples++;
				}
			} else {
				lastUser = word;
				newObj[lastUser] = newObj[lastUser] + apples || apples;
				if (inputValue[index - 1]?.startsWith(":")) {
					apples = 0;
				}
			}
			return newObj;
		}, {});
		setRes(res);
		return res;
	};

	return (
		<>
			<div style={{ paddingBottom: 15 }}>{text}</div>
			<form style={{ paddingBottom: 15 }} onSubmit={test}>
				<input type="text" onChange={changeText} style={{ width: 300 }} />
				<button style={{ marginLeft: 10 }}>calculate</button>
			</form>
			{Object.keys(res).map((key) => (
				<div key={key}>
					{key} : {res[key]}
				</div>
			))}
		</>
	);
}
