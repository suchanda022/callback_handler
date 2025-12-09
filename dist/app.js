"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const app = (0, express_1.default)();
const port = 3000;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("postgress DB connected");
})
    .catch((err) => console.error("DB connection Error:", err));
app.get('/', (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`connected successfully on port ${port}`);
});
//# sourceMappingURL=app.js.map