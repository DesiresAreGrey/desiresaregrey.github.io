"use strict";
const events = {
    hello(status, time) {
        console.log("Connected to Beat Saber");
        if (status.beatmap && status.performance) {
            ui.setData(status);
            ui.beatmap(status.beatmap, time);
            ui.performance(status.performance);
            ui.show();
        }
    },
    songStart(status, time) {
        ui.setData(status);
        ui.beatmap(status.beatmap, time);
        ui.performance(status.performance);
        ui.show();
    },
    noteCut(status) { ui.performance(status.performance); },
    noteFullyCut(status) { ui.performance(status.performance); },
    obstacleEnter(status) { ui.performance(status.performance); },
    noteMissed(status) { ui.performance(status.performance); },
    bombCut(status) { ui.performance(status.performance); },
    pause(status, time) {
        ui.timer.pause(status.beatmap.paused + (Date.now() - time));
    },
    resume(status, time) {
        ui.timer.start(status.beatmap.start + (Date.now() - time), status.beatmap.length);
    },
    menu() {
        ui.timer.stop();
        ui.hide();
    }
};
//# sourceMappingURL=events.js.map