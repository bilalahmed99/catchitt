// import { create, useStore } from 'zustand';
// import persist from 'zustand';

// interface LoginState {
//     setState: any;
//     state: any;
//     isLoggedIn: boolean;
//     name: string;
//     token: string;
//     username: string;
//     mode: string;
//     setMode: (mode: string) => void;
//     setLoggedIn: (isLoggedIn: boolean) => void;
//     setName: (name: string) => void;
//     setUsername: (username: string) => void;
//     setToken: (token: string) => void;
// }

// const useLoginStore = useStore(
//     persist(
//         (set) => ({
//             isLoggedIn: false,
//             name: '',
//             token: '',
//             username: '',
//             mode: 'light',
//             setMode: (mode: string) => set({ mode }),
//             setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
//             setName: (name: string) => set({ name }),
//             setUsername: (username: string) => set({ username }),
//             setToken: (token: string) => set({ token }),
//         })
//         {
//           name: 'loginStore',
//           getStorage: () => sessionStorage,
//           jsonify: true,
//         }
//     )
// );

// export default useLoginStore;
