import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatProvider} from "../../providers/chat/chat";
import {map} from "rxjs/operators";
import {UtilsProvider} from "../../providers/utils/utils";
import {PaginationProvider} from "../../providers/pagination/pagination";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  queryDoc: string;
  friend: any;
  meDoc: any;
  messages: any[] = [];
  typingMessage: string = '';
  showGiphy: boolean = false;
  typeUser;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _chatProv: ChatProvider,
              public _paginationProv: PaginationProvider) {
    this._chatProv.loadStorage().then();
    this.typeUser = this._chatProv.typeUser;
    this.meDoc = this._chatProv.idDocument;
    this.friend = this.navParams.get('friend');
    this.typeUser === 'terapeutas' ? this.queryDoc = `${this.friend.id}_${this.meDoc}/mensajes` :
      this.queryDoc = `relaciones/${this.meDoc}_${this.friend.id}/mensajes`;
    console.log('ionViewDidLoad ChatPage');
    // this._paginationProv.init(this.queryDoc, 'timestamp',{prepend: false });

    this._chatProv.loadMessages(this.friend.id)
      .subscribe(
        res => {
          console.log(res);
          this.messages = [];
          this.messages = res;
          setTimeout(
            () => {
              this.scrollBottom();
            }, 50);
          console.log('Mensajes: ', this.messages);
        }
      );
  }

  ionViewDidLoad() {
    // this.scrollBottom();
  }

  init() {
    // TODO: can be an API response
    // if (!this.isNewMatch) {
    //   this.messages = [
    //     {
    //       isMe: true,
    //       type: 'image',// text || image
    //       body: 'https://media.giphy.com/media/3oz8xSjBmD1ZyELqW4/giphy.gif',
    //       timestamp: 'Oct 10, 2017 9:47am'
    //     },
    //     {
    //       isMe: false,
    //       avatar: 'assets/img/hieu.png',
    //       type: 'text',// text || image
    //       body: 'Hey yo what\'s up?',
    //       timestamp: 'Oct 10, 2017 9:48am'
    //     },
    //     {
    //       isMe: true,
    //       type: 'image',// text || image
    //       body: 'https://media.giphy.com/media/lXiRyZVS9B79r2YOQ/giphy.gif',
    //       timestamp: 'Oct 10, 2017 9:50am'
    //     },
    //     {
    //       isMe: false,
    //       avatar: 'assets/img/hieu.png',
    //       type: 'image',// text || image
    //       body: 'https://media.giphy.com/media/JUMLTR3dHEGpW/giphy.gif',
    //       timestamp: 'Oct 10, 2017 9:52am'
    //     },
    //     {
    //       isMe: true,
    //       type: 'text',// text || image
    //       body: 'Where are you, buddy?',
    //       timestamp: 'Oct 10, 2017 9:53am'
    //     },
    //     {
    //       isMe: false,
    //       avatar: 'assets/img/hieu.png',
    //       type: 'text',// text || image
    //       body: 'I\'m almost there',
    //       timestamp: 'Oct 10, 2017 9:53am'
    //     }
    //   ];
    // }
  }

  sendGif(imageUrl) {
    this.messages.push({
      isMe: true,
      type: 'image',
      body: imageUrl,
      timestamp: 'Oct 13, 2017 9:53am'
    });
    this.scrollBottom();

    this.fakeReply();
  }

  sendText() {
    this._chatProv.saveMessage(this.typingMessage, this.friend.id, this.meDoc).then(
      () => {
        console.log('Se envio con exito');
        this.typingMessage = '';
      }
    )
      .catch(
        (error) => console.log('Error al enviar' + JSON.stringify(error))
      );
    // console.log(this.typingMessage);
    // this.messages.push({
    //   isMe: true,
    //   type: 'text',
    //   body: this.typingMessage,
    //   timestamp: 'Oct 13, 2017 9:55am'
    // });
    // this.typingMessage = '';
    // this.scrollBottom();
    //
    // this.fakeReply();
  }

  fakeReply() {
    setTimeout(() => {
      this.messages.push({
        isMe: false,
        avatar: 'assets/img/hieu.png',
        type: 'text',
        body: 'Nice. Keep typing dude',
        timestamp: 'Oct 10, 2017 9:55am'
      });

      this.scrollBottom();
    }, 500);
  }

  scrollBottom() {
    this.content.resize();
    this.content.scrollTo(0, this.content.scrollHeight, 25);
  }

  toggleGiphy() {
    this.showGiphy = !this.showGiphy;
    this.content.resize();
  }

  doInfinite() {
    return new Promise((resolve) => {
      this._paginationProv.more();
      this.scrollBottom();
      resolve();
    });

  }

  trackByFn(index, item) {
    return item.id;
  }
}
