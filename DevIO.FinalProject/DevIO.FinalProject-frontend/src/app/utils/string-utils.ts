export class StringUtils {
    public static isNullOrEmpty(value: string): boolean {
        return value === null || value === undefined || value.trim() === '';
    }

    public static somenteNumeros(numero: string) : string {
        return numero.replace(/[^0-9]/g,'');
    }
}