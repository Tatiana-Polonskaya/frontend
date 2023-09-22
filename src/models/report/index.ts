import { UUID } from "crypto";
import { TYPE_REPORT } from "./_types";

export interface IReportById {
    types: TYPE_REPORT;
    id: UUID;
}
