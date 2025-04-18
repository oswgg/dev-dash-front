


export interface SocketDatasource {
    connect(): void;
    disconnect(): void;
    isConnected(): boolean;
    emit(event: string, data?: any): void;
    on(event: string, callback: (data: any) => void): void;
    off(event: string): void;
}