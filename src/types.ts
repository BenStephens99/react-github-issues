export interface User {
    login: string;
}

export interface Label {
    id: number;
    name: string;
    color: string;
}

export interface Comment {
    id: number;
    body: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface Issue {
    id: number;
    number: number;
    title: string;
    body: string;
    user: User;
    labels: Label[];
    comments: number;
    created_at: string;
    updated_at: string;
    state: string;
}
