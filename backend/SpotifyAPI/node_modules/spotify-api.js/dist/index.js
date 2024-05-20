"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Cache = void 0;
// Export all the basics of the module.
__exportStar(require("./Client"), exports);
__exportStar(require("./Interface"), exports);
__exportStar(require("./Error"), exports);
var Cache_1 = require("./Cache");
Object.defineProperty(exports, "Cache", { enumerable: true, get: function () { return Cache_1.Cache; } });
exports.Util = __importStar(require("./Util"));
// Export all the managers of the module.
__exportStar(require("./managers/Auth"), exports);
__exportStar(require("./managers/User"), exports);
__exportStar(require("./managers/Artist"), exports);
__exportStar(require("./managers/Browse"), exports);
__exportStar(require("./managers/Album"), exports);
__exportStar(require("./managers/Episode"), exports);
__exportStar(require("./managers/Playlist"), exports);
__exportStar(require("./managers/Show"), exports);
__exportStar(require("./managers/Track"), exports);
__exportStar(require("./managers/UserClient"), exports);
__exportStar(require("./managers/Player"), exports);
// Export all the structures of the module.
__exportStar(require("./structures/Track"), exports);
__exportStar(require("./structures/User"), exports);
__exportStar(require("./structures/Artist"), exports);
__exportStar(require("./structures/Album"), exports);
__exportStar(require("./structures/Playlist"), exports);
__exportStar(require("./structures/Episode"), exports);
__exportStar(require("./structures/Show"), exports);
__exportStar(require("./structures/Player"), exports);
