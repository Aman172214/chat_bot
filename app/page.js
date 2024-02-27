"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Chat from "./components/Chat";

const Home = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-slate-800 p-3 w-[800px] rounded-md text-white">
          <h1 className="text-2xl font-bold mb-4 text-center underline">
            Chat-Bot
          </h1>
          <Chat />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
