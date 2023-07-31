import { useState, useRef, useEffect, useCallback } from 'react';

// Define the type for the callback function
type CallbackFunction = (arg: any) => void;

export const useStateWithCallback = (intialState: any) => {
    const [state, setState] = useState(intialState);
    const cbRef = useRef<CallbackFunction | null>(null);

    const updateState = useCallback((newState: any, cb: any) => {
        cbRef.current = cb;

        setState((prev: any) =>
            typeof newState === 'function' ? newState(prev) : newState
        );
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state, updateState];
};