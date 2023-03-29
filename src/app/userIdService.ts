import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserIdService {
    private _userId: number;

    constructor() { }

    public setUserId(id: number) {
        this._userId = id;
    }

    public getUserId(): number {
        return this._userId;
    }
}