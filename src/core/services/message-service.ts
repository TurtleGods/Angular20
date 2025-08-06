import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../types/pagination';
import { Message } from '../../types/message';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = environment.apiUrl;
  private hubUrl = environment.hubUrl;
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private HubConnection?:HubConnection;
  messageThread = signal<Message[]>([]);

  createHubConnection(otherUserId:string){
    const currentUser = this.accountService.currentUser();
    if(!currentUser)return;
    this.HubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl+'messages?userId=' +otherUserId,{//這邊為query String 用法
      accessTokenFactory:()=>currentUser.token
    })
    .withAutomaticReconnect()
    .build();

    this.HubConnection.start().catch(error=>console.log(error));

    this.HubConnection.on('ReceiveMessageThread',(messages:Message[])=>{
      this.messageThread.set(messages.map(message => ({
          ...message,
          currentUserSender: message.senderId !== otherUserId
        })))
    })
  }

  stopHubConnection(){
    if(this.HubConnection?.state ===HubConnectionState.Connected){
      this.HubConnection.stop().catch(error=>console.log(error));
    }
  }

  getMessages(container: string, pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('container', container);

    return this.http.get<PaginatedResult<Message>>(this.baseUrl + 'messages', { params });
  }

  getMessageThread(memberId: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + memberId);
  }

  sendMessage(recipientId: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', { recipientId, content })
  }

  deleteMessage(id: string) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
