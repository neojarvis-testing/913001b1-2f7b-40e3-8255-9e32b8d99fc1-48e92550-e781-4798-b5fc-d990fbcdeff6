import { Account } from "./account.model";

export interface Transaction {
    TransactionId: number;
    AccountId: number;
    TransactionDate: Date;
    TransactionType: string;
    Amount: number;
    Status?: string;
    Description?: string;
    Account?: Account;
}
