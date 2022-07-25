import { Parameter } from "./Parameter";

export class Method {
        name:       string;
        tag:        string;
        url:        string;
        summary:     string;
        description: string;
        operationId: string;
        consumes:    string[];
        produces:    string[];
        parameters:  Parameter[];
        responses:   { [key: string]: Response };    
}
