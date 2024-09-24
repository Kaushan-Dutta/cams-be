"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getAgencyCases:[Case],
    alerts(id:String): Alert,
    getAllCases:[Case],
`;
