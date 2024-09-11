"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const authRouter_1 = __importDefault(require("./router/authRouter"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api", (req, res) => {
    return res.send("Hello from Kishan Vyas");
});
// signin api
app.use("/api/v1/auth", authRouter_1.default);
app.post("/api/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    try {
        const { sheetJsonData, companyName } = req.body;
        // Parse the sheetJsonData from the request
        const parsedData = JSON.parse(sheetJsonData);
        // Ensure companyName is a string
        if (typeof companyName !== "string" || !companyName) {
            return res.status(400).send("Invalid company name");
        }
        let emptyRowEncountered = false;
        const dataToInsertArray = [];
        // Process each row in the parsed data
        for (const item of parsedData) {
            // Filter out rows that are completely empty
            const nonEmptyValues = Object.values(item).filter((value) => value !== undefined && value !== null && value !== "");
            // Skip empty rows
            if (nonEmptyValues.length === 0 || nonEmptyValues.length === 1) {
                emptyRowEncountered = true;
                break; // Exit loop on encountering an empty row
            }
            if (emptyRowEncountered) {
                break; // Stop processing further rows after an empty row
            }
            // Prepare the data object for Prisma
            const dataToInsert = {
                companyName: companyName,
                srNo: String((_a = item.A) !== null && _a !== void 0 ? _a : "0"),
                shippingBillNo: String((_b = item.B) !== null && _b !== void 0 ? _b : "0"),
                shippingBillDate: String((_c = item.C) !== null && _c !== void 0 ? _c : ""),
                thirdPartyExporter: String((_d = item.D) !== null && _d !== void 0 ? _d : ""),
                hsCodeAndDescription: String((_e = item.E) !== null && _e !== void 0 ? _e : ""),
                epcgLicNo: String((_f = item.F) !== null && _f !== void 0 ? _f : ""),
                cifValue: String((_g = item.G) !== null && _g !== void 0 ? _g : "0"),
                freight: String((_h = item.H) !== null && _h !== void 0 ? _h : "0"),
                insurance: String((_j = item.I) !== null && _j !== void 0 ? _j : "0"),
                brc: String((_k = item.J) !== null && _k !== void 0 ? _k : "0"),
                exchangeRate: String((_l = item.K) !== null && _l !== void 0 ? _l : "0"),
                cifValue2: String((_m = item.L) !== null && _m !== void 0 ? _m : "0"),
                freight2: String((_o = item.M) !== null && _o !== void 0 ? _o : "0"),
                insurance2: String((_p = item.N) !== null && _p !== void 0 ? _p : "0"),
                brc2: String((_q = item.O) !== null && _q !== void 0 ? _q : "0"),
                exchangeRate2: String((_r = item.P) !== null && _r !== void 0 ? _r : "0"),
                product: String((_s = item.Q) !== null && _s !== void 0 ? _s : ""),
                remarks: String((_t = item.R) !== null && _t !== void 0 ? _t : ""),
            };
            // Insert the row into the database
            dataToInsertArray.push(dataToInsert);
        }
        yield exports.prisma.excelDataFinal.createMany({
            data: dataToInsertArray,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
app.post("/api/newData/part1", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const upload = yield exports.prisma.part1.create({
            data: data,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
app.post("/api/newData/part2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const upload = yield exports.prisma.part2.create({
            data: data,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
app.post("/api/newData/part3", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const upload = yield exports.prisma.part3.create({
            data: data,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
app.post("/api/newData/part4", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const upload = yield exports.prisma.part4.create({
            data: data,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
app.post("/api/newData/part5", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const upload = yield exports.prisma.part5.create({
            data: data,
        });
        return res.json({ message: "Data imported successfully" });
    }
    catch (error) {
        console.error("Error importing data:", error);
        return res.json({ message: "Error importing data" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
