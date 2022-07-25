import { Schema } from "./schema";

export class Parameter {
    in:          string;
    name:        string;
    description: string;
    required:    boolean;
    schema:      Schema;
}
