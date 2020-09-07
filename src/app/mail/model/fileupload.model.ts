export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}

export class FileUplodSaved {
    description: string;
    subject: string;
    divisi: string;
    status: string;
    when: Date;
    starred: boolean;
    read: boolean;
}
