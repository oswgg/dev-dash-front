import { SocketDatasource } from "@/domain/datasources/socket.datasource";
import { io, Socket } from "socket.io-client";





export class SocketIOClient implements SocketDatasource {
    private readonly socket: Socket;

    constructor(url: string) {
        this.socket = io(url);
    }

    connect(): void {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }
    
    disconnect(): void {
        this.socket.disconnect(); 
    }
    
    isConnected(): boolean {
        return this.socket.connected;
    }
    
    emit(event: string, data?: any): void {
        this.socket.emit(event, data);
    }
    
    on(event: string, callback: (data: any) => void): void {
        this.socket.on(event, callback);
    }
    
    off(event: string): void {
        this.socket.off(event); 
    }
}