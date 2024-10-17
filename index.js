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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var SeatBookingSystem = /** @class */ (function () {
    function SeatBookingSystem(totalSeats) {
        this.seats = [];
        this.premiumCost = 40;
        // Initialize seats with a mix of premium and regular
        for (var i = 1; i <= totalSeats; i++) {
            this.seats.push({
                number: "Seat-".concat(i),
                isBooked: false,
                isPremium: i <= totalSeats / 2, // Let's say first half are premium
            });
        }
    }
    SeatBookingSystem.prototype.displaySeats = function () {
        console.log("\nAvailable seats:");
        this.seats.forEach(function (seat) {
            console.log("".concat(seat.number, " - ").concat(seat.isBooked ? 'Booked' : 'Available', " ").concat(seat.isPremium ? '(Premium)' : ''));
        });
    };
    SeatBookingSystem.prototype.bookSeat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var availableSeats, selection, seatChoices, chosenSeat, systemSeat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        availableSeats = this.seats.filter(function (seat) { return !seat.isBooked; });
                        if (availableSeats.length === 0) {
                            console.log("No seats available.");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    type: 'list',
                                    name: 'selection',
                                    message: 'Do you want to select a seat yourself or let the system pick?',
                                    choices: ['Select Myself', 'Let System Pick'],
                                },
                            ])];
                    case 1:
                        selection = (_a.sent()).selection;
                        if (!(selection === 'Select Myself')) return [3 /*break*/, 3];
                        seatChoices = availableSeats.map(function (seat) { return ({
                            name: "".concat(seat.number, " ").concat(seat.isPremium ? '(Premium)' : ''),
                            value: seat.number,
                        }); });
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    type: 'list',
                                    name: 'chosenSeat',
                                    message: 'Choose a seat:',
                                    choices: seatChoices,
                                },
                            ])];
                    case 2:
                        chosenSeat = (_a.sent()).chosenSeat;
                        this.confirmBooking(chosenSeat);
                        return [3 /*break*/, 4];
                    case 3:
                        systemSeat = availableSeats[0].number;
                        console.log("System selected ".concat(systemSeat));
                        this.confirmBooking(systemSeat);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SeatBookingSystem.prototype.confirmBooking = function (seatNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var seat, totalCost, confirm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seat = this.seats.find(function (s) { return s.number === seatNumber; });
                        if (!seat) {
                            console.log("Invalid seat selection.");
                            return [2 /*return*/];
                        }
                        totalCost = 20;
                        if (seat.isPremium) {
                            totalCost += this.premiumCost;
                        }
                        console.log("You have selected ".concat(seat.number, " ").concat(seat.isPremium ? '(Premium)' : '', ". Total cost: $").concat(totalCost));
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    type: 'confirm',
                                    name: 'confirm',
                                    message: 'Do you want to confirm the booking?',
                                },
                            ])];
                    case 1:
                        confirm = (_a.sent()).confirm;
                        if (confirm) {
                            seat.isBooked = true;
                            console.log("Seat ".concat(seat.number, " has been booked successfully."));
                        }
                        else {
                            console.log("Booking cancelled.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SeatBookingSystem.prototype.cancelSeat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bookedSeats, seatChoices, seatToCancel, seat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookedSeats = this.seats.filter(function (seat) { return seat.isBooked; });
                        if (bookedSeats.length === 0) {
                            console.log("No seats are booked.");
                            return [2 /*return*/];
                        }
                        seatChoices = bookedSeats.map(function (seat) { return ({
                            name: seat.number,
                            value: seat.number,
                        }); });
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    type: 'list',
                                    name: 'seatToCancel',
                                    message: 'Select a seat to cancel:',
                                    choices: seatChoices,
                                },
                            ])];
                    case 1:
                        seatToCancel = (_a.sent()).seatToCancel;
                        seat = this.seats.find(function (s) { return s.number === seatToCancel; });
                        if (seat) {
                            seat.isBooked = false;
                            console.log("Seat ".concat(seat.number, " has been cancelled."));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SeatBookingSystem;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var system, exit, action, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    system = new SeatBookingSystem(10);
                    exit = false;
                    _b.label = 1;
                case 1:
                    if (!!exit) return [3 /*break*/, 9];
                    system.displaySeats();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'action',
                                message: 'What do you want to do?',
                                choices: ['Book a Seat', 'Cancel a Seat', 'Exit'],
                            },
                        ])];
                case 2:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 'Book a Seat': return [3 /*break*/, 3];
                        case 'Cancel a Seat': return [3 /*break*/, 5];
                        case 'Exit': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 3: return [4 /*yield*/, system.bookSeat()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, system.cancelSeat()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    exit = true;
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
main();
