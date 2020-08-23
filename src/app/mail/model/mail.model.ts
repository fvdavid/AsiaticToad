export interface MailModel {
    subject: string;
    content: string;
    when?: Date;
    read?: boolean;
    starred?: boolean;
    group?: string;
    attachments?: string;
    // from?: {
    //     name: string;
    //     mail: string;
    // };
    // label?: [
    //     {
    //         name: string;
    //         color: string;
    //     }
    // ];
}
