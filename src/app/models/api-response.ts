

export class APIResponse<T>{

    private _timestamp:string;
    private _message:string;
    private _status:number;
    private _data:T;
    private _currentPage:number;
    private _totalItems:number;
    private _noOfPages:number;

    get timestamp():string{ return this._timestamp}

    set timestamp(value:string){this._timestamp = value}

    get message():string{ return this._message}

    set message(value:string){this._message = value}

    get statusCode():number{return this._status}

    set statusCode(value:number) {this._status = value}

    get data():T {return this._data}

    set data(value:T) {this._data = value}

    get currentPage():number {return this._currentPage}

    set currentPage(value:number){this._currentPage = value}

    get totalItems():number{return this._totalItems}

    set totalItems(value:number){this._totalItems = value}

    get noOfItems():number{return this._noOfPages}

    set noOfItems(value:number){this._noOfPages = value}



}