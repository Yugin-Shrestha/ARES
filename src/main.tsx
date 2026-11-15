import {Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  error: Error | null;
}

class AppErrorBoundary extends Component<{children: ReactNode}, ErrorBoundaryState> {
  state: ErrorBoundaryState = {error: null};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {error};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Mars Explorer runtime error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#05070B] p-6 text-slate-100">
          <div className="max-w-lg rounded-xl border border-amber-500/40 bg-[#0B0F17] p-6 shadow-2xl">
            <h1 className="font-display text-lg font-semibold text-amber-400">
              Mars Explorer Initialization Error
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              The 3D planetary workspace encountered an unexpected runtime error.
            </p>
            <pre className="mt-3 max-h-40 overflow-auto rounded bg-black/50 p-3 font-mono text-xs text-rose-300">
              {this.state.error.message}
            </pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
