export interface Book {
    id: string,
    title: string;
    authors: Array<string>;
    pageCount:number;
    description:string;
    publisher:string;
    publishedDate:string | number;
    imageLink:ImageBitmap;
    isEbook:boolean;
    publicDomain: boolean;
    isAvailableEpub: boolean;
    downloadLink: string;
    categories: Array<string>;
    // identifiers:{
    //  isbn_13:string,
    //  isbn_10:string
    // };
   
//    constructor(id:string,title:string,authors:Array<string>,pageCount:number,publisher:string,publishedDate:Date,
//     imageLink:ImageBitmap,isEbook:boolean,publcDomain:boolean){
//         this._id = id;
//         this._titleBook = title;
//         this._authors = authors;
//         this._pageCount = pageCount;
//         this._publisher = publisher;
//         this._publishedDate = publishedDate;
//         this._imageLink = imageLink;
//         this._isEbook = isEbook;
//         this._publicDomain = publcDomain;
//    }

//    get titleBook(): string {
//        return this._titleBook;
//    }

//    get authors(): Array<string>{
//        return this._authors;
//    }

//    get pageCount():number {
//        return this._pageCount;
//    }

//    get imageLink(): ImageBitmap{
//        return this._imageLink;
//    }

//    get isEbook():boolean{
//        return this._isEbook;
//    }

//    get publicDomain(): boolean{
//        return this._publicDomain;
//    }

//    static parse(json: string){
//        var data = JSON.parse(json);
//        console.log(" hai fratelemeleu")
//        return new Book(data._id,data._titleBook,data._authors,data._pageCount,data._publisher,data._publishedDate,
//         data._imageLink,data._isEbook,data._publicDomain)
//    }


}
