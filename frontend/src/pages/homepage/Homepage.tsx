import { UserRegisterForm } from "@/components/UserRegisterForm";
import { useNavigate } from "react-router-dom";


export function Homepage() {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-5">
        <div className="text-center mb-1 animate-fade-in">
          <h1
            onClick={() => navigate("/")} 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          >
            co-watch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch videos together in real-time with friends, family, and
            communities. Sync playback, chat live, and create shared memories.
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 mt-8">
          <div className="flex-1 max-w-lg">
            <UserRegisterForm />
          </div>

          <div className="flex-1 max-w-2xl animate-fade-in-up">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Features ✨
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Sync Playback
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Perfectly synchronized video playback for everyone in the
                      room
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Real-time Chat
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Chat, react, and share moments as they happen
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Create Rooms
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Private or public rooms for any occasion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in-up animation-delay-500">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Join thousands enjoying together
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                No registration needed
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                Free forever
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                Works on all devices
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
