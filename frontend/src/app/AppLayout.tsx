// export function AppLayout() {
//   return (
//     <>
//       <h1>Bullly - Trading Platform</h1>
//       <p>Application Layout di tschesse</p>
//     </>
//   );
// }

import { Header } from "./Header/Header";
import { Workspace } from "./Workspace/Workspace";
import { StatusBar } from "./StatusBar/StatusBar";

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col">

      <Header />

      <Workspace />

      <StatusBar />

    </div>
  );
}