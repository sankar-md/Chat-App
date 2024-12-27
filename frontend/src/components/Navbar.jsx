import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, MessageSquare, Settings, User } from "lucide-react";

function Navbar() {
  const { authUser, logOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    navigate("/login");
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-300/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-5 text-primary" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link
                  to="/update-profile"
                  className="btn btn-sm gap-2 transition-colors"
                >
                  <User className="size-5 text-primary" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="btn btn-sm gap-2 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="size-5 text-primary" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
