const query = new URLSearchParams(location.search);

if (query.has('scale')){
	const scale = query.get('scale')
	console.log("Scale: " + scale);
	document.documentElement.style.setProperty('zoom', scale);
}
else console.log("Scale: " + 1);

if (query.has('top')){
	let link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("href", `./modifiers/top.css`);
	document.head.appendChild(link);
}

if (query.has('corner')){
	const corner = query.get('corner');
	document.getElementById("cover")!.style.borderRadius = `${corner}px`;
}

if (query.has('black')){
	document.body.style.backgroundColor = 'black';
}

if (query.has('font')){
	const fontName = query.get('font');
	if (fontName) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = `https://fonts.googleapis.com/css?family=${fontName}:400,600,700,800&display=swap`;
		document.head.appendChild(link);
		document.body.style.fontFamily = fontName;
	}
}

if (query.has('italics')){
	document.body.style.fontStyle = 'italic';
}

if (query.has('margin')) {
	const margin = query.get('margin');
	if (margin) {
		document.documentElement.style.setProperty('--margin', margin + 'px');
	}
}