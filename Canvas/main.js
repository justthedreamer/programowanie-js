import { ApplicationSettings,MOUSE_MODE_BACK } from "./ApplicationSettings.js";
import { ApplicationBuilder } from "./ApplicationBuilder.js";
import { Board } from "./Board.js";

const ballsCount = 100;
const ballsPipelineDistance = 200;
const ballPowerX = 1;
const ballPowerY = 3;
const ballColor = "#d8dee9";
const mousePower = 5;
const mouseTriggerDistance = 150;
const mouseMode = null;
const energyStealingPower = 5;
const corruptionState = false;

const applicationSettings = new ApplicationSettings(ballsCount,ballsPipelineDistance,ballPowerX,ballPowerY,ballColor,mousePower,mouseTriggerDistance,mouseMode,energyStealingPower,corruptionState)
const board = new Board(applicationSettings);
const app = ApplicationBuilder.Build(applicationSettings,board);

app.run();



