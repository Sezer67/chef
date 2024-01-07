export type FormHookProps = {
	type?: 'email' | 'username' | 'password' | 'normal' | 'phone' | 'email-username';
    defaultValue?: string;
};

export type FormHookType = {
    value: string;
    error: string | null;
    onChange: (value: string) => void;
    reset: () => void; 
    isEmpty: () => boolean;
}