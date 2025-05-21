export class LocalStorageUtils {

    public obterUsuario(): any {
        return JSON.parse(localStorage.getItem('devio.user') || '{}');
    }

    public salvarDadosLocaisUsuario(response: any): void {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario(): void {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    public obterTokenUsuario(): string | null {
        return localStorage.getItem('devio.token');
    }

    public salvarTokenUsuario(token: string): void {
        localStorage.setItem('devio.token', token);
    }

    public salvarUsuario(user: any): void {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }
}