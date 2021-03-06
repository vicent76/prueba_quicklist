import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';




export class ChecklistModel{
    checklist: any;
    checklistObserver: any;
    fecha: string = 'Fecha creación '+moment(new Date).format('DD-MM-YYYY');
    

    constructor(public title: string, public items: any[]){

        this.items = items;

        this.checklist = Observable.create(observer => {
            this.checklistObserver = observer;
        });
    }

    addItem(item): void{
        this.items.push({
            title: item,
            checked: false,
        });
        this.checklistObserver.next(true);
    }

    removeItem(item): void{
        let index = this.items.indexOf(item);

        if (index > -1){
            this.items.splice(index, 1);
        }
        this.checklistObserver.next(true);
    }

    renameItem(item, title, nota): void{
        let index = this.items.indexOf(item);

        if(index > -1){
            this.items[index].title = title;
            this.items[index].nota = nota;
        }
        this.checklistObserver.next(true);
    }

    setTitle(title): void{
        this.title = title;
        this.checklistObserver.next(true);
    }

   

    toggleItem(item): void{
        item.checked = !item.checked;
        this.checklistObserver.next(true);
    }

    checklistUpdates(): Observable<any>{
        return this.checklist;
    }

}