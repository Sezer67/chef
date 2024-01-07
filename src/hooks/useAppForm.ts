import React, { FC, useState } from 'react'
import regex from '../constans/regex';
import { language } from '../languages';
import { formTypes } from '../types';

const useAppForm = ({ type = 'normal', defaultValue }: formTypes.FormHookProps): formTypes.FormHookType => {
    const [value, setValue] = useState<string>(defaultValue || '');
	const [error, setError] = useState<string | null>(null);

    const onChange = (newValue: string) => {
		let isCheck = false;
		let tempType = type;
		if(tempType === 'email-username') {
			if(newValue.includes('@')){
				tempType = 'email';
			} else {
				tempType = 'username';
			}
		}
		switch (tempType) {
			case 'email':
				isCheck =
					newValue.length < 4 ||
					regex.mailFormat.test(newValue).valueOf();
				setValue(newValue.toLowerCase());
				if (isCheck) {
					setError(null);
				} else {
					setError(language('emailError'));
				}
				break;
			case 'username':
				isCheck = newValue.length > 3 && newValue.length < 16;
				setValue(newValue.toLowerCase());
				if (isCheck) {
					setError(null);
				} else {
					setError(language('usernameLengthError'))
				}
				break;
			case 'password':
				isCheck = newValue.length >= 6;
				setValue(newValue);
				if (isCheck) {
					setError(null);
				} else {
					setError(language('passwordLengthError'));
				}
				break;
			case 'phone':
				let text = newValue;
				if (
					value.charAt(newValue.length) !== ' ' &&
					(newValue.length === 3 ||
						newValue.length === 7 ||
						newValue.length === 10)
				) {
					text += ' ';
				}
				setValue(text);
				setError(null);
				break;
			default:
				setValue(newValue);
				break;
		}
	};

    const isEmpty = (): boolean => {
        if (!value.trim()) {
			setError(language('requiredInput'));
            return true;
        }
        return false;
	};

	const reset = () => {
		setError(null);
		setValue('');
	};

  return { value, error, onChange, reset, isEmpty };
}

export default useAppForm;