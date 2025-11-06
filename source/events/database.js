

import {
    extractMessageContent,
    jidNormalizedUser,
    delay,
    getContentType,
    areJidsSameUser,
    generateWAMessage
} from "@whiskeysockets/baileys";
import chalk from "chalk";
import fs from "fs";
import fetch from 'node-fetch';

global.db = JSON.parse(fs.readFileSync('./source/database/database.json', 'utf-8'));

export async function saveDb() {
    fs.writeFileSync('./source/database/database.json', JSON.stringify(global.db, null, 2));
}

export async function loadDataBase(conn, m) {
    await saveDb();
    try {
        global.db = global.db || {};
        global.db.settings = global.db.settings || {};
        global.db.users = global.db.users || {};
        global.db.groups = global.db.groups || {};

        const botNumber = await conn.decodeJid(conn.user.id);
        const isNumber = x => typeof x === 'number' && !isNaN(x);
        const isBoolean = x => typeof x === 'boolean';
        const setBot = global.db.settings;
        if (!('ownonly' in setBot)) setBot.ownonly = false;
        if (typeof global.db.users[m.sender] !== 'object') global.db.users[m.sender] = {};
        const user = global.db.users[m.sender];
        if (global.owner.includes(m.sender.split('@')[0])) {
            user.limit = Infinity;
        } else {
            if (!isNumber(user.limit)) {
                user.limit = 25;
            }
        }
        if (!('pushname' in user)) user.pushname = m.pushName || '';
        if (!isNumber(user.command)) user.command = 0;
        if (!('role' in user)) user.role = 'Bronze I';

        if (m.isGroup) {
            if (typeof global.db.groups[m.chat] !== 'object') global.db.groups[m.chat] = {};
            const group = global.db.groups[m.chat];
        }
    } catch (e) {
        throw e;
    }
}

global.loadDataBase = loadDataBase;
global.saveDb = saveDb;