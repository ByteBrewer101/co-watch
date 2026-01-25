// NavBar.tsx - Enhanced navbar
import { ModeToggle } from "./ModeToggle";
import { Popcorn, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <Popcorn className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                co-watch
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Watch together, anywhere
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Features
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              How it works
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Community
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              FAQ
            </a>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30">
                Sign In
              </Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Features
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                How it works
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Community
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                FAQ
              </a>
              <div className="px-4 pt-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  Sign In
                </Button> 
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}