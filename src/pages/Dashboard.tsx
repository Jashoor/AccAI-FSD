import React, { useState } from 'react';
import { Brain, GitCompare as Compare, BarChart3, Settings, Send, Copy, LogOut } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

interface ModelOutput {
  model: string;
  content: string;
  metrics: {
    timeToGenerate: string;
    tokenCount: number;
    confidence: number;
  };
}

function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const [outputs, setOutputs] = useState<ModelOutput[]>([
    {
      model: 'Cohere',
      content: '',
      metrics: { timeToGenerate: '0.0s', tokenCount: 0, confidence: 0 }
    },
    {
      model: 'Gemini Pro',
      content: '',
      metrics: { timeToGenerate: '0.0s', tokenCount: 0, confidence: 0 }
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate responses for all models
      const updatedOutputs = outputs.map(output => ({
        ...output,
        content: `This is a simulated response from ${output.model} for the prompt: "${prompt}"`,
        metrics: {
          timeToGenerate: (Math.random() * 2).toFixed(1) + 's',
          tokenCount: Math.floor(Math.random() * 500),
          confidence: Math.random() * 100
        }
      }));

      setOutputs(updatedOutputs);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }
    // Simulate password change
    setError(null);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    alert('Password changed successfully');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      // Simulate account deletion
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compare className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold">AccAI</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                <BarChart3 className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition ${showSettings ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-700 rounded-lg transition text-red-400"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showSettings ? (
          <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4 mb-8">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:bg-gray-900 focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:bg-gray-900 focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full rounded-md bg-gray-700 border-transparent focus:border-blue-500 focus:bg-gray-900 focus:ring-0"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </form>

            <div className="border-t border-gray-700 pt-6">
              
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 bg-gray-800 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span>{isLoading ? 'Generating...' : 'Generate'}</span>
                </button>
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                  {error}
                </div>
              )}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {outputs.map((output, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">{output.model}</h3>
                    </div>
                    <button
                      onClick={() => copyToClipboard(output.content)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="h-64 overflow-y-auto bg-gray-900 rounded-lg p-4 mb-4">
                    <ReactMarkdown className="prose prose-invert">
                      {output.content || 'Output will appear here...'}
                    </ReactMarkdown>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-900 p-2 rounded-lg">
                      <div className="text-gray-400">Time</div>
                      <div>{output.metrics.timeToGenerate}</div>
                    </div>
                    
                    <div className="bg-gray-900 p-2 rounded-lg">
                      <div className="text-gray-400">Confidence</div>
                      <div>{output.metrics.confidence.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;