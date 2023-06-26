/// <reference types="vite/client" />

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & { title?: string }
    >;
    export default ReactComponent;
}

// declare namespace NodeJS {
//     interface ProcessEnv {
//        //types of envs
//         NODE_ENV: 'development' | 'production' | 'test';
//         API_KEY: string;

//     }
// }