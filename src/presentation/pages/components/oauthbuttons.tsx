import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface OAuthButtonsProps {
  isLoading: boolean;
  onOAuthLogin: (provider: "google" | "github") => void;
}

export const OAuthButtons = ({ isLoading, onOAuthLogin }: OAuthButtonsProps) => (
  <div className="grid grid-cols-2 gap-4">
    <Button
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
      onClick={() => onOAuthLogin("google")}
      disabled={isLoading}
    >
      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        {/* ...svg paths... */}
      </svg>
      Google
    </Button>
    <Button
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
      onClick={() => onOAuthLogin("github")}
      disabled={isLoading}
    >
      <Github className="mr-2 h-4 w-4" />
      GitHub
    </Button>
  </div>
);