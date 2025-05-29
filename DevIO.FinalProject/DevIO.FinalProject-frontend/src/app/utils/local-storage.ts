export class LocalStorageUtils {

    public static obterUsuario(): any {
        return JSON.parse(localStorage.getItem('devio.user') || '{}');
    }

    public static salvarDadosLocaisUsuario(response: any): void {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public static limparDadosLocaisUsuario(): void {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    public static obterTokenUsuario(): string | null {
        return localStorage.getItem('devio.token');
    }

    public static salvarTokenUsuario(token: string): void {
        localStorage.setItem('devio.token', token);
    }

    public static salvarUsuario(user: any): void {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }
}