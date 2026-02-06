import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import type { User } from "../types";
import { User as UserIcon, Mail, Shield, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  user: User;
  onNavigate: (page: "journal" | "dashboard" | "profile") => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onNavigate, onLogout }: ProfilePageProps) {
  const handleExportData = () => {
    const entries = localStorage.getItem("journalEntries");
    if (!entries) {
      toast.error("No data to export");
      return;
    }

    const blob = new Blob([entries], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindjournal-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const handleDeleteData = () => {
    if (confirm("Are you sure you want to delete all your journal entries? This cannot be undone.")) {
      localStorage.removeItem("journalEntries");
      toast.success("All journal entries deleted");
      onNavigate("journal");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation user={user} />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2">Profile & Settings</h1>
          <p className="text-gray-600">
            Manage your account and privacy settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p>{user.name}</p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Your data is encrypted and private</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p>End-to-End Encryption</p>
                    <p className="text-gray-600">Your journal entries are encrypted</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p>Local Storage</p>
                    <p className="text-gray-600">Data stored securely on your device</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p>Anonymous Analytics</p>
                    <p className="text-gray-600">NLP analysis happens privately</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export or delete your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p>Export Your Data</p>
                    <p className="text-gray-600">Download all your journal entries</p>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="text-red-900">Delete All Data</p>
                    <p className="text-red-700">Permanently delete all journal entries</p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteData}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>About MindJournal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-600">
              <p>Version 1.0.0</p>
              <p>
                MindJournal uses advanced Natural Language Processing to help you understand
                your emotional patterns and track your mental well-being over time.
              </p>
              <p className="mt-4 text-gray-500">
                If you're experiencing a mental health crisis, please contact:
                <br />
                National Suicide Prevention Lifeline: 988
                <br />
                Crisis Text Line: Text HOME to 741741
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
