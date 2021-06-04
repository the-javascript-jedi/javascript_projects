// this interface ensures that whatever uses this interface must have a format method
export interface HasFormatter{
    format():string;
}