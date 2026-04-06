const events = {
	hello(status: StatusObject, time: number) {
		console.log("Connected to Beat Saber");

		if (status.beatmap && status.performance) {
			ui.setData(status);
			ui.beatmap(status.beatmap, time);
			ui.performance(status.performance);
			ui.show();
		}
	},

	songStart(status: StatusObject, time: number) {
		ui.setData(status);
		ui.beatmap(status.beatmap, time);
		ui.performance(status.performance);
		ui.show();
	},

	noteCut(status: StatusObject) { ui.performance(status.performance); },
	noteFullyCut(status: StatusObject) { ui.performance(status.performance); },
	obstacleEnter(status: StatusObject) { ui.performance(status.performance); },
	noteMissed(status: StatusObject) { ui.performance(status.performance); },
	bombCut(status: StatusObject) { ui.performance(status.performance); },

	pause(status: StatusObject, time: number) {
		ui.timer.pause(status.beatmap!.paused! + (Date.now() - time));
	},

	resume(status: StatusObject, time: number) {
		ui.timer.start(status.beatmap!.start! + (Date.now() - time), status!.beatmap!.length);
	},

	menu() {
		ui.timer.stop();
		ui.hide();
	}
}